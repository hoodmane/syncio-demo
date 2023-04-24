importScripts("./synclink.js");
importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.1/debug/pyodide.js")

function stdin() {
    try {
        let val = stdin_read_main_thread().syncify();
        console.log("stdin got value", val);
        return val;
    } catch(e) {
        console.error(e);
    }
}

async function main(stdin_read_main_thread, interrupt_buffer) {
    globalThis.stdin_read_main_thread = stdin_read_main_thread;
    const pyodide = await loadPyodide();
    Synclink.setInterruptHandler(() => {
        if(interrupt_buffer[0] !== 0) {
            throw new Error();  
        }
    });
    pyodide.setInterruptBuffer(interrupt_buffer);
    pyodide.setStdin({autoEOF: true, stdin})
    return Synclink.proxy(pyodide)
}



Synclink.expose({
    main,
});
