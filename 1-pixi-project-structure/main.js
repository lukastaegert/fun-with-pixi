const WIDTH = 700, HEIGHT = 800;
const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

const rect = new PIXI.Graphics()
  .beginFill(0x0000ff)
  .drawRect(0, 0, 100, 100)
  .endFill();
stage.addChild(rect);
rect.position.set(WIDTH / 2 - 50, HEIGHT / 2 - 50);

function updateStage() {
  rect.rotation += 0.01;
}

function performAnimationLoop() {
  updateStage();
  renderer.render(stage);
  window.requestAnimationFrame(performAnimationLoop);
}

performAnimationLoop();
