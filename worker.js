importScripts("./synclink.js");

async function do_stuff_async(slow_inc) {
    console.log("slow_inc(1)");
    let result = await slow_inc(1);
    console.log("slow_inc(1) gave:", result);
    return result + 1;
}

function do_stuff_sync(slow_inc) {
    console.log("slow_inc(1)");
    let result = slow_inc(1).syncify();
    console.log("slow_inc(1) gave:", result);
    return result + 1;
}

Synclink.expose({
    do_stuff_async,
    do_stuff_sync
});
