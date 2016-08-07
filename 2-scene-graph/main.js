const WIDTH = 600, HEIGHT = 800;
const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

function getCircle(centerX, centerY, size, color) {
  return new PIXI.Graphics()
    .beginFill(color)
    .drawCircle(centerX, centerY, size)
    .endFill();
}

const circle = getCircle(0, 0, 200, 0xff0000);
stage.addChild(circle);

performAnimationLoop();

function performAnimationLoop() {
  updateStage();
  renderer.render(stage);
  window.requestAnimationFrame(performAnimationLoop);
}

function updateStage() {
  circle.rotation += 0.01;
}
