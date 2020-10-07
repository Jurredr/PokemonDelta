export default {
    set volume(value) {
        data.volume = value;
        // for 
    },
    get volume() { return data.volume; }
};
const data = {
    volume:0
};

const musicPlayer = new Audio();

const players = [musicPlayer];


let canPlay = false;

window.addEventListener("click", function(){
    canPlay=true;
    window.removeEventListener(this);
});

window.addEventListener("keydown", function(){
    canPlay=true;
    window.removeEventListener("keydown", this);
});
