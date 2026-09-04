import { spawn } from "node:child_process"

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let PORT = 9340

const RES = [
  [1920, 1080],
  [1440, 900],
  [1366, 768],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
  [360, 800],
]
const THEMES = ["dark", "light"]

async function runTest(width, height, dark) {
  PORT++
  const chrome = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--no-sandbox",
    `--remote-debugging-port=${PORT}`, "--no-first-run",
    `--user-data-dir=C:\\Users\\user\\AppData\\Local\\Temp\\opencode\\chrome-qa-${Date.now()}-${Math.random()}`,
  ], { stdio: "ignore" })
  try {
    await sleep(1600)
    const targets = await (await fetch(`http://localhost:${PORT}/json`)).json()
    const page = targets.find((t) => t.type === "page")
    const ws = new WebSocket(page.webSocketDebuggerUrl)
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })
    let seq = 0
    const pending = new Map()
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++seq
        pending.set(id, { resolve, reject, method })
        ws.send(JSON.stringify({ id, method, params }))
      })
    }
    ws.onmessage = (ev) => {
      const m = JSON.parse(ev.data)
      if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(`${p.method}: ${m.error.message}`)) : p.resolve(m.result) }
    }
    await send("Page.enable")
    await send("Runtime.enable")
    try { await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: dark ? "dark" : "light" }] }) } catch {}
    try { await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false }) } catch {}
    await send("Page.navigate", { url: "http://localhost:5199/soluciones/nfc" })
    await sleep(3800)
    const r = await send("Runtime.evaluate", { expression: `(() => {
      const d = document.scrollingElement;
      return {
        total: d.scrollHeight,
        clientW: d.clientWidth,
        scrollW: d.scrollWidth,
        overflow: d.scrollWidth > d.clientWidth,
        h1: document.querySelectorAll('h1').length,
        cases2col: getComputedStyle(document.querySelector('.nfc-cases')).gridTemplateColumns,
        casesCount: document.querySelectorAll('.nfc-case').length,
      };
    })()`, returnByValue: true })
    ws.close()
    return r.result.value
  } finally {
    chrome.kill()
  }
}

const results = {}
for (const [w, h] of RES) {
  for (const t of THEMES) {
    const key = `${w}x${h}-${t}`
    const v = await runTest(w, h, t === "dark")
    results[key] = `${v.total}px | clientW=${v.clientW} scrollW=${v.scrollW} overflow=${v.overflow} h1=${v.h1} cases=${v.casesCount}`
    console.log(`${key}: ${results[key]}`)
  }
}
process.exit(0)
