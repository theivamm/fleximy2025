import { spawn } from "child_process"

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
const PORT = 9399
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--no-sandbox",
  `--remote-debugging-port=${PORT}`, "--no-first-run",
  `--user-data-dir=C:\\Users\\user\\AppData\\Local\\Temp\\opencode\\chrome-int-${Date.now()}`,
], { stdio: "ignore" })

const getTarget = async () => {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json`)
      const list = await r.json()
      const page = list.find((t) => t.type === "page")
      if (page) return page
    } catch {}
    await sleep(300)
  }
  throw new Error("no target")
}

const main = async () => {
  let ws
  const seq = { n: 0 }
  const pending = new Map()
  const consoleMsgs = []
  await new Promise((res, rej) => {
    getTarget().then((t) => {
      ws = new WebSocket(t.webSocketDebuggerUrl)
      ws.onopen = res
      ws.onerror = rej
    })
  })
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data)
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result) }
    if (m.method === "Runtime.consoleAPICalled") {
      const txt = m.params.args.map((a) => a.value ?? a.description ?? "").join(" ")
      if (m.params.type === "error" || m.params.type === "warning") consoleMsgs.push(`[${m.params.type}] ${txt}`)
    }
    if (m.method === "Runtime.exceptionThrown") consoleMsgs.push(`[exception] ${m.params.exceptionDetails.text}`)
  }
  const send = (method, params = {}) => new Promise((res, rej) => {
    const id = ++seq.n
    pending.set(id, { resolve: res, reject: rej })
    ws.send(JSON.stringify({ id, method, params }))
  })
  const evaljs = async (expr) => {
    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })
    if (r.exceptionDetails) throw new Error("eval error: " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text))
    return r.result?.value
  }

  await send("Page.enable")
  await send("Runtime.enable")
  await send("Emulation.setDeviceMetricsOverride", { width: 1366, height: 768, deviceScaleFactor: 1, mobile: false })
  await send("Page.navigate", { url: "http://localhost:5199/soluciones/nfc" })
  await sleep(2500)

  const HEIGHT = {} 
  for (const th of ["dark", "light"]) {
    await evaljs(`localStorage.setItem('theme', ${JSON.stringify(th)})`)
    await send("Page.reload", { ignoreCache: true })
    await sleep(2000)
    HEIGHT[th] = await evaljs(`({ scrollHeight: document.documentElement.scrollHeight,
      bg: getComputedStyle(document.querySelector('.nfc')).backgroundColor,
      text: getComputedStyle(document.querySelector('.nfc')).color,
      h1: document.querySelectorAll('h1').length })`)
  }

  const before = await evaljs(`({ caseCount: document.querySelectorAll('.nfc-case').length,
    destActive: [...document.querySelectorAll('.nfc-config__opt input')].findIndex(i=>i.checked),
    configTop: Math.round(document.querySelector('#nfc-configurable').getBoundingClientRect().top) })`)

  await evaljs(`document.querySelector('.nfc-case .nfc-case__cta').click()`)
  await sleep(1200)

  const after = await evaljs(`({ destActive: [...document.querySelectorAll('.nfc-config__opt input')].findIndex(i=>i.checked),
    configTop: Math.round(document.querySelector('#nfc-configurable').getBoundingClientRect().top),
    destLabel: document.querySelector('.nfc-config__opt.on label, .nfc-config__opt.on')?.textContent?.trim()?.slice(0,40) })`)

  console.log("THEMES", JSON.stringify(HEIGHT, null, 2))
  console.log("BEFORE", JSON.stringify(before))
  console.log("AFTER ", JSON.stringify(after))
  console.log("CONSOLE", consoleMsgs.length ? JSON.stringify(consoleMsgs, null, 2) : "(clean)")

  chrome.kill()
  process.exit(0)
}

main().catch((e) => { console.error("FATAL", e); chrome.kill(); process.exit(1) })
