const WIDTH = 700, HEIGHT = 800;
const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

const rect = getRect(200, 0xff0000);
function getRect(size, color) {
  return new PIXI.Graphics()
  .beginFill(color)
    // in local coordinates
  .drawRect(-size/2, -size/2, size, size)
  .endFill();
}
stage.addChild(rect);
// in stage coordinates
rect.position.set(WIDTH / 2, HEIGHT / 2);

const innerRect = getRect(100, 0x00ff00);
rect.addChild(innerRect);
innerRect.position.x = 200;
innerRect.rotation = 1;

const text = new PIXI.Text('Hallo TNG', {fill: 0x0000ff});
innerRect.addChild(text);
text.scale.set(2, 4);
text.resolution = 4;

function updateStage() {
  rect.rotation += 0.01;
}

function performAnimationLoop() {
  updateStage();
  renderer.render(stage);
  window.requestAnimationFrame(performAnimationLoop);
}

performAnimationLoop();
