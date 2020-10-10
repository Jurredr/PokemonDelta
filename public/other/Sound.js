const players = [];
const Sound = {
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
    canPlay: false,
    load,
    addOnCanplay,
};
export default Sound;

function load(src, baseVolume = 1, doLoop = false, autoPlay = false) {
    const player = new Audio(src);
    player.baseVolume = baseVolume;
    player.volume = baseVolume * Sound.volume;
    player.loop = doLoop;
    player.autoplay = autoPlay;
    if (autoPlay) playWhenPossible(player);
    players.push(player);
    return player;
}
function playWhenPossible(player) {
    if (Sound.canPlay) {
        player.play();
    } else {
        addOnCanplay(() => player.play());
    }
}

const data = {
    volume: 0,
};

const onCanPlayListeners = [];

function addOnCanplay(callback) {
    if (Sound.canPlay === true) {
        callback();
    } else {
        onCanPlayListeners.push(callback);
    }
}
const canPlayEvents = ["click", "keydown"];
for (const event of canPlayEvents) {
    window.addEventListener(event, onCanPlay);
}
function onCanPlay() {
    Sound.canPlay = true;
    for (const listener of onCanPlayListeners) {
        listener();
    }
    for (const event of canPlayEvents) {
        window.removeEventListener(event, onCanPlay);
    }
}
