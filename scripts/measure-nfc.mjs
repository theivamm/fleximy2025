import { spawn } from "node:child_process"

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
const URL = process.argv[3] || "http://localhost:5199/soluciones/nfc"
const WIDTH = parseInt(process.argv[4] || "1366", 10)
const HEIGHT = parseInt(process.argv[5] || "768", 10)
const DARK = process.argv[6] === "dark"

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  `--remote-debugging-port=9333`,
  "--no-first-run",
  "--user-data-dir=C:\\Users\\user\\AppData\\Local\\Temp\\opencode\\chrome-measure",
], { stdio: "ignore" })

async function getTargets() {
  const res = await fetch("http://localhost:9333/json")
  return res.json()
}

let ws
let seq = 0
const pending = new Map()

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++seq
    pending.set(id, { resolve, reject })
    ws.send(JSON.stringify({ id, method, params }))
  })
}

class CDPDebugger {
  constructor(sessionId) {
    this.sessionId = sessionId
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++seq
      pending.set(id, { resolve, reject })
      ws.send(JSON.stringify({ id, method, params, sessionId: this.sessionId }))
    })
  }
}

async function main() {
  await sleep(1500)
  const targets = await getTargets()
  const page = targets.find((t) => t.type === "page")
  if (!page) throw new Error("no page target")

  ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      if (msg.error) reject(new Error(msg.error.message))
      else resolve(msg.result)
    }
  }

  const cdp = new CDPDebugger()
  await cdp.send("Page.enable")
  await cdp.send("Runtime.enable")
  if (DARK) await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "dark" }] })
  else await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "light" }] })
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false })

  await cdp.send("Page.navigate", { url: URL })
  await sleep(4000)

  const evalJS = async (expr) => {
    const r = await cdp.send("Runtime.evaluate", { expression: expr, returnByValue: true })
    return r.result.value
  }

  const metrics = await evalJS(`(() => {
    const d = document.scrollingElement;
    const sections = Array.from(document.querySelectorAll('section')).map(s => ({
      cls: s.className.split(' ').filter(c=>c.startsWith('nfc')).join(' ') || s.className,
      h: Math.round(s.getBoundingClientRect().height)
    }));
    return {
      scrollHeight: d.scrollHeight,
      clientWidth: d.clientWidth,
      scrollWidth: d.scrollWidth,
      overflowX: d.scrollWidth > d.clientWidth,
      overflowDiff: d.scrollWidth - d.clientWidth,
      sections,
      hasH1: document.querySelectorAll('h1').length,
    };
  })()`)

  console.log(JSON.stringify(metrics, null, 2))
  ws.close()
  chrome.kill()
  process.exit(0)
}

main().catch((e) => { console.error(e); chrome.kill(); process.exit(1) })
