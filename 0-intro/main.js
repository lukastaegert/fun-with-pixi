// Encapsulate inside an IIFE to allow several scripts inside the presentation
(function() {
  var MAX_CATS = 1000;

  var canvas = document.querySelector('canvas.pixi-demo-canvas-intro');
  var renderer = new PIXI.autoDetectRenderer(canvas.clientWidth, canvas.clientHeight, {
    transparent: true,
    autoResize: false,
    view: canvas
  });

  var stage = new PIXI.Container();

  var catContainer = new PIXI.Container();
  stage.addChild(catContainer);

  var backgroundContainer = new PIXI.Container();
  stage.addChild(backgroundContainer);

  var logoContainer = new PIXI.Container();
  stage.addChild(logoContainer);
  var isLogoRotating = false;

  var loader = new PIXI.loaders.Loader()
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

  var cats = [];
  var currentCatSpriteIndex = 0;

// Reveal does some weird resizing upon initialization
  setTimeout(updateCanvasSize);
  performAnimationLoop();

  function setupBackground() {
    var tngLogo = createTNGLogo();
    createSubtitle(tngLogo);
    createTextAboveLogo(tngLogo);
  }

  function createTNGLogo() {
    var tngLogo = PIXI.Sprite.fromFrame('../0-intro/tng.png');
    tngLogo.scale.set(0.5, 0.5);
    tngLogo.position.set(-tngLogo.width / 2, -tngLogo.height - 10);
    backgroundContainer.addChild(tngLogo);
    return tngLogo;
  }

  function createTextAboveLogo(tngLogo) {
    var text = new PIXI.Text(
      'Lukas Taegert', {font: '24px Arial', fill: 0x101010, align: 'center'}
    );
    text.anchor.set(0.5, 1);
    text.position.set(0, -tngLogo.height - 28);
    // using double resolution provides better rendered text when it is not perfectly aligned
    text.resolution = 2;
    backgroundContainer.addChild(text);
  }

  function createSubtitle(tngLogo) {
    var title = new PIXI.Text('please clone:\nhttps://github.com/lukastaegert/fun-with-pixi.git', {font: '40px Arial', fill: 0x101010, align: 'center'});
    title.anchor.set(0.5, 0);
    title.resolution = 2;
    title.position.set(0, -tngLogo.height - 160);
    backgroundContainer.addChild(title);
  }

  function setupLogo() {
    createLogoSprite();

    logoContainer.on('mouseover', function() {
      logoContainer.filters = [new PIXI.filters.GrayFilter()];
    });

    logoContainer.on('mouseout', function() {
      logoContainer.filters = null;
    });

    logoContainer.on('click', function() {
      if (!isLogoRotating) {
        isLogoRotating = true;
      } else {
        addCats(Math.min(Math.max(cats.length, 1), MAX_CATS - cats.length));
      }
    });
  }

  function createLogoSprite() {
    var logoSprite = PIXI.Sprite.fromFrame('../0-intro/pixi-logo.png');
    logoSprite.position.set(-logoSprite.width / 2, -logoSprite.height / 2);
    logoContainer.addChild(logoSprite);
    // without this flag, mouse events will not be passed to this container
    logoContainer.interactive = true;
  }

  function addCats(numberOfCats) {
    for (var i = 0; i < numberOfCats; i++) {
      var sprite = PIXI.Sprite.fromFrame(`${currentCatSpriteIndex}`);
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
    cats.forEach(function(cat) {
      cat.sprite.position.x += cat.speed;
      if (cat.sprite.position.x >= canvas.clientWidth) {
        resetCatSprite(cat.sprite);
      }
    });
  }
}());

