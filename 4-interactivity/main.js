const WIDTH = 600, HEIGHT = 800;
const renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

const loader = new PIXI.loaders.Loader()
  .add('cats.json')
  .once('complete', setupStage)
  .load();

function setupStage() {
  const stage = new PIXI.Container();
  const sprite = PIXI.Sprite.fromFrame('0');
  stage.addChild(sprite);
  renderer.render(stage);

  sprite.interactive = true;
  sprite.on('mouseover', () => {
    sprite.filters = [new PIXI.filters.InvertFilter()];
    renderer.render(stage);
  });
  sprite.on('mouseout', () => {
    sprite.filters = null;
    renderer.render(stage);
  });
}
