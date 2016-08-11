const WIDTH = 600, HEIGHT = 800;
const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

const loader = new PIXI.loaders.Loader()
  .add('tng.png')
  .add('cats.json')
  .once('complete', setupStage)
  .load();

function setupStage() {
  const stage = new PIXI.Container();

  const tngSprite = PIXI.Sprite.fromFrame('tng.png');
  stage.addChild(tngSprite);
  tngSprite.position.y = (HEIGHT - tngSprite.height) / 2;

  const catSprite = PIXI.Sprite.fromFrame('0');
  stage.addChild(catSprite);
  catSprite.position.y = (HEIGHT - catSprite.height) / 2 - 200;

  renderer.render(stage);
}