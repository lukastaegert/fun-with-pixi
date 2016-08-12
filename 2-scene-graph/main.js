const WIDTH = 600, HEIGHT = 800;
const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

function getCircle(centerX, centerY, radius, color) {
  return new PIXI.Graphics()
    .beginFill(color)
    .drawCircle(centerX, centerY, radius)
    .endFill();
}

const circle = getCircle(100, 0, 200, 0xff0000);
stage.addChild(circle);
circle.position.set(WIDTH/2, HEIGHT/2);

const innerCircle = getCircle(0,0,80,0x00ff00);
circle.addChild(innerCircle);
innerCircle.position.x = -100;
innerCircle.scale.set(3, 2);

const text = new PIXI.Text('Hallo TNG!', {fill: 0x0000ff});
text.resolution = 3;
innerCircle.addChild(text);

text.position.x = -text.width/2;

performAnimationLoop();

function performAnimationLoop() {
  updateStage();
  renderer.render(stage);
  window.requestAnimationFrame(performAnimationLoop);
}

function updateStage() {
  circle.rotation += 0.01;
}
