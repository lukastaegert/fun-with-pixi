const MAX_CATS = 1000;

const canvas = document.querySelector('canvas.pixi-demo-canvas');
const renderer = new PIXI.autoDetectRenderer(canvas.clientWidth, canvas.clientHeight, {
  transparent: true,
  autoResize: false,
  view: canvas
});

const stage = new PIXI.Container();

const backgroundContainer = new PIXI.Container();
stage.addChild(backgroundContainer);

// a slightly faster implementation of the basic container that trades advanced features like masking and interactivity for speed;
// you could also just use a PIXI.Container here
const catContainer = new PIXI.ParticleContainer();
stage.addChild(catContainer);

const logoContainer = new PIXI.Container();
stage.addChild(logoContainer);
let isLogoRotating = false;

const loader = new PIXI.loaders.Loader()
  .add('../0-intro/pixi-logo.png')
  .add('../0-intro/cats.json')
  .add('../0-intro/tng.png')
  .once('complete', setupBackground)
  .once('complete', setupLogo)
  .load();

// to use a variable width canvas, we need to tell the renderer to resize, otherwise it will simply scale the canvas contents;
// for optimal flicker-free resizing, perform the actual resizing not in the event handler but in the animation loop
window.addEventListener('resize', updateCanvasSize);

function updateCanvasSize() {
  logoContainer.position.set(canvas.clientWidth / 2, canvas.clientHeight / 2);
  backgroundContainer.position.set(canvas.clientWidth / 2, canvas.clientHeight);
  renderer.resize(canvas.clientWidth, canvas.clientHeight);
}

let cats = [];
let currentCatSpriteIndex = 0;

// Reveal does some weird resizing upon initialization
setTimeout(updateCanvasSize);
performAnimationLoop();

function setupBackground() {
  const tngLogo = PIXI.Sprite.fromFrame('../0-intro/tng.png');
  tngLogo.scale.set(0.5, 0.5);
  tngLogo.position.set(-tngLogo.width / 2, -tngLogo.height - 10);
  backgroundContainer.addChild(tngLogo);

  const text = new PIXI.Text(
    'Lukas Taegert\n@Open Techday, Unterföhring 2016-08-12', {font: '24px Arial', fill: 0x101010, align: 'center'}
  );
  text.anchor.set(0.5, 1);
  text.position.set(0, -tngLogo.height - 28);
  // using double resolution provides better rendered text when it is not perfectly aligned
  text.resolution = 2;
  backgroundContainer.addChild(text);
}

function setupLogo() {
  const logoSprite = PIXI.Sprite.fromFrame('../0-intro/pixi-logo.png');
  logoSprite.position.set(-logoSprite.width / 2, -logoSprite.height / 2);
  logoContainer.addChild(logoSprite);
  // without this flag, mouse events will not be passed to this container
  logoContainer.interactive = true;
  const title = new PIXI.Text('denn Dein Canvas will mehr…', {font: '48px Arial', fill: 0x101010, align: 'center'});
  title.anchor.set(0.5, 0);
  title.resolution = 2;
  title.position.y = 80;
  logoContainer.addChild(title);

  logoContainer.on('mouseover', () => {
    logoContainer.filters = [new PIXI.filters.GrayFilter()];
  });

  logoContainer.on('mouseout', () => {
    logoContainer.filters = null;
  });

  logoContainer.on('click', () => {
    if (!isLogoRotating) {
      isLogoRotating = true;
      logoContainer.removeChild(title);
    } else {
      addCats(Math.min(Math.max(cats.length, 1), MAX_CATS - cats.length));
    }
  });
}

function addCats(numberOfCats) {
  for (let i = 0; i < numberOfCats; i++) {
    const sprite = PIXI.Sprite.fromFrame(`${currentCatSpriteIndex}`);
    resetCatSprite(sprite);
    cats.push({sprite, speed: 1 + Math.random() * 4});
    currentCatSpriteIndex = (currentCatSpriteIndex + 1) % 9;
    catContainer.addChild(sprite);
  }
}

function resetCatSprite(sprite) {
  sprite.position.x = -sprite.width;
  sprite.position.y = -sprite.height / 2 + Math.random() * canvas.clientHeight;
}

function performAnimationLoop() {
  updateStage();
  renderer.render(stage);
  window.requestAnimationFrame(performAnimationLoop);
}

function updateStage() {
  if (isLogoRotating) {
    logoContainer.rotation += 0.01;
  }
  cats.forEach(cat => {
    cat.sprite.position.x += cat.speed;
    if (cat.sprite.position.x >= canvas.clientWidth) {
      resetCatSprite(cat.sprite);
    }
  });
}

