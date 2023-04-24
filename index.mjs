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
  console.log("do_stuff_async");
  const res1 = await worker.do_stuff_async(Synclink.proxy(slow_inc));
  console.log("got:", res1);

  console.log("do_stuff_sync");
  const res2 = await worker.do_stuff_sync(Synclink.proxy(slow_inc));
  console.log("got:", res2);

  globalThis.worker = worker;
  // do something with text
}
init();
