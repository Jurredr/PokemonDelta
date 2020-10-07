import screen from '../graphics/Screen';
async function loadJson(url, callback){
    const request = await fetch(url);
    const json = await request.json();
    callback?.(json)
    return json;
}

function getGenNext(gen){
    const it = gen();
    return ()=>it.next();
}
