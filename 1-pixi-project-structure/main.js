const WIDTH = 700, HEIGHT = 800;

const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);

document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

const circle = new PIXI.Graphics();
circle.beginFill(0xff0000).drawCircle(0, 0, 100).endFill();
circle.position.set(WIDTH / 2, HEIGHT / 2);
stage.addChild(circle);

const rect = new PIXI.Graphics();
rect.beginFill(0x0000ff).drawRect(0, 0, 50, 50).endFill();
circle.addChild(rect);

function updateStage(timeStamp) {
  circle.position.set(WIDTH / 2 + Math.sin(timeStamp / 1000) * 50, HEIGHT / 2 + Math.cos(timeStamp / 1000) * 50);
  circle.rotation = timeStamp / 1000;
  circle.scale.set(2, 2);
}

function animationLoop(timeStamp = 0) {
  updateStage(timeStamp);
  renderer.render(stage);
  window.requestAnimationFrame(animationLoop);
}

animationLoop();