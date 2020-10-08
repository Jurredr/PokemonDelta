export default {
    set volume(value) {
        data.volume = value;
        for (const player of players) {
            if (player.baseVolume != undefined) {
                player.volume = value * player.baseVolume;
            } else {
                player.value = value;
            }
        }
    },
    get volume() {
        return data.volume;
    },
    canPlay,
    load,
    addOnCanplay
};

function load(src, baseVolume=1, doLoop=false, autoPlay=false){
    const player = new Audio(src);
    player.baseVolume = baseVolume
    player.loop = doLoop;
    player.autoplay = autoPlay;
    if (autoPlay)addOnCanplay(()=>player.play());
    return player;
}


const data = {
    volume: 0,
};

const onCanPlayListeners = [];

function addOnCanplay(callback){
    if (canPlay === true){
        callback();
    }
    else {
        onCanPlayListeners.push(callback);
    }
}
window.addEventListener('click', oncanplay);
window.addEventListener('keydown', oncanplay);
function onCanPlay(){
    canPlay = true;
    for (const listener of onCanPlayListeners){
        listener();
    }
}

const musicPlayer = new Audio();
musicPlayer.loop = true;

const players = [musicPlayer];

let canPlay = false;


