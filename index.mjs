import * as Synclink from "./synclink.mjs";

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

globalThis.sleep = sleep;

let strings = ["1", "2", "3"];

async function *stdin_gen() {
  for(let val of strings) {
    await sleep(1000);
    yield val;
  }
}

let stdin_iter = stdin_gen();
globalThis.interruptBuffer = new Int32Array(new SharedArrayBuffer(4));


async function stdin_read() {
  return (await stdin_iter.next()).value;
}

globalThis.setSignal = function(signal) {
  Atomics.store(interruptBuffer, 0, signal);
}

async function init() {
  const worker = Synclink.wrap(new Worker("worker.js"));
  globalThis.pyodide = await worker.main(Synclink.proxy(stdin_read), interruptBuffer);
  console.log("pyodide loaded");
}
init();
