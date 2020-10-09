async function loadJson(url, callback){
    const request = await fetch(url);
    const json = await request.json();
    callback?.(json)
    return json;
}
