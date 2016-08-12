const WIDTH = 600, HEIGHT = 800;

const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();
const rect = new PIXI.Graphics()
  .beginFill(0xff0000)
  .drawRect(-100, -50, 200, 100)
  .endFill();
stage.addChild(rect);

rect.position.set(WIDTH / 2, HEIGHT / 2);

performAnimationLoop();

function performAnimationLoop() {
  rect.rotation += 0.01;
  renderer.render(stage);
  window.requestAnimationFrame(performAnimationLoop);
}