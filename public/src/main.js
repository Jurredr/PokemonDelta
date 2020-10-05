
client.init("localhost:3000");

function setup() {
  Screen.init();

  new rawImage("boy_run");

  new imageSet("tilesets", "Outside", 8, 501);
  new rawMap("maps", "testMap")

  new player();
}
function step() {
  drawMap("testMap");
  // for(var x = 0; x < width; x+=32) {
  //   for(var y = 0; y < height; y+=32) {
  //     var p = new position(null, x, y);
  //     imageSet.draw("Outside", p, 1, 0);
  //   }
  // }
}
