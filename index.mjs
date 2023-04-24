import * as Synclink from "./synclink.mjs";

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function slow_inc(n) {
  await sleep(1000);
  return n+1;
}

async function init() {
  const worker = Synclink.wrap(new Worker("worker.js"));
  globalThis.pyodide = await worker.main(Synclink.proxy(slow_inc));
}
init();
