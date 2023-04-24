importScripts("./synclink.js");
importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.1/full/pyodide.js")

function do_stuff_sync() {
    console.log("slow_inc(1)");
    let result = slow_inc(1).syncify();
    console.log("slow_inc(1) gave:", result);
    return result + 1;
}

async function main(slow_inc) {
    globalThis.slow_inc = slow_inc;
    const pyodide = await loadPyodide();
    return Synclink.proxy(pyodide)
}



Synclink.expose({
    main,
});
