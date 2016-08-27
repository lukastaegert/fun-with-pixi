const WIDTH = 800, HEIGHT = 600;

const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

function animate() {
  renderer.render(stage);
  window.requestAnimationFrame(animate);
}

animate();
