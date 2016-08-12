const WIDTH = 600, HEIGHT = 800;
const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

const loader = new PIXI.loaders.Loader()
  .add('tng.png')
  .add('cats.json')
  .on('complete', setupStage)
  .load();

function setupStage() {
  const stage = new PIXI.Container();
  const sprite = PIXI.Sprite.fromFrame('1');
  stage.addChild(sprite);
  sprite.position.y = (HEIGHT - sprite.height) / 2;
  renderer.render(stage);
}