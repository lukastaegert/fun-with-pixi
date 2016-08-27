// Encapsulate inside an IIFE to allow several scripts inside the presentation
(function() {
  var CATS_PER_EXPLOSION = 100;
  var EXPLOSION_TIME = 800;

  var canvas = document.querySelector('canvas.pixi-demo-canvas-outro');
  var renderer = new PIXI.autoDetectRenderer(canvas.clientWidth, canvas.clientHeight, {
    transparent: true,
    autoResize: false,
    view: canvas
  });

  var stage = new PIXI.Container();

  var backgroundContainer = new PIXI.Container();
  stage.addChild(backgroundContainer);

  var catContainer = new PIXI.Container();
  stage.addChild(catContainer);

  var thankYouContainer = new PIXI.Container();
  stage.addChild(thankYouContainer);

  var loader = new PIXI.loaders.Loader()
    .add('../0-intro/pixi-logo.png')
    .add('../0-intro/cats.json')
    .add('../0-intro/tng.png')
    .once('complete', setupBackground)
    .once('complete', setupThankYouNote)
    .load();

// to use a variable width canvas, we need to tell the renderer to resize, otherwise it will simply scale the canvas contents;
// for optimal flicker-free resizing, perform the actual resizing not in the event handler but in the animation loop
  window.addEventListener('resize', updateCanvasSize);

  function updateCanvasSize() {
    thankYouContainer.position.set(canvas.clientWidth / 2, canvas.clientHeight / 2);
    backgroundContainer.position.set(canvas.clientWidth / 2, canvas.clientHeight);
    renderer.resize(canvas.clientWidth, canvas.clientHeight);
  }

  var currentCatSpriteIndex = 0;

// Reveal does some weird resizing upon initialization
  setTimeout(updateCanvasSize);
  performAnimationLoop();

  function setupBackground() {
    var tngLogo = createTNGLogo();
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

  function setupThankYouNote() {
    createThankYouNote();

    thankYouContainer.on('mouseover', function() {
      thankYouContainer.filters = [new PIXI.filters.InvertFilter()];
    });

    thankYouContainer.on('mouseout', function() {
      thankYouContainer.filters = null;
    });

    thankYouContainer.on('click', function() {
      createNexCatRocket();
    });
  }

  function createNexCatRocket() {
    createCatRocket("" + currentCatSpriteIndex);
    currentCatSpriteIndex = (currentCatSpriteIndex + 1) % 9;
    setTimeout(createNexCatRocket, Math.random() * 2000);
  }

  function createCatRocket(catType) {
    var cat = PIXI.Sprite.fromFrame(catType);
    cat.position.set((canvas.clientWidth - cat.width) * Math.random(), canvas.clientHeight);
    catContainer.addChild(cat);
    return new TWEEN.Tween(cat.position)
      .to({x: (canvas.clientWidth - cat.width) * Math.random(), y: (canvas.clientHeight / 2) * Math.random()}, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(function() {
        catContainer.removeChild(cat);
        createCatExplosionAt(cat.position, catType);
      });
  }

  function createCatExplosionAt(position, catType) {
    var maxDistance = Math.sqrt(canvas.clientWidth * canvas.clientWidth + canvas.clientHeight * canvas.clientHeight) / 2;
    for (var i = 0; i < CATS_PER_EXPLOSION; i++) {
      var distance = (Math.random() + 1 / 2) * maxDistance;
      var angle = Math.random() * 2 * Math.PI;
      createSingleExplosionCat(position, {x: position.x + distance * Math.cos(angle), y: position.y + distance * Math.sin(angle)}, catType);
    }
  }

  function createSingleExplosionCat(startPosition, tweenTo, catType) {
    var cat = PIXI.Sprite.fromFrame(catType);
    cat.position.set(startPosition.x, startPosition.y);
    catContainer.addChild(cat);
    new TWEEN.Tween(cat)
      .to({alpha: 0}, EXPLOSION_TIME)
      .start();
    new TWEEN.Tween(cat.position)
      .to(tweenTo, EXPLOSION_TIME)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(function() {
        catContainer.removeChild(cat);
      });
  }

  function createThankYouNote() {
    var title = new PIXI.Text('Thank you', {font: '96px Arial', fill: 0x101010, align: 'center'});
    title.anchor.set(0.5, 0.5);
    title.resolution = 2;
    title.position.y = 0;
    thankYouContainer.addChild(title);
    thankYouContainer.interactive = true;
  }

  function performAnimationLoop(time) {
    TWEEN.update(time);
    renderer.render(stage);
    window.requestAnimationFrame(performAnimationLoop);
  }

  function updateStage() {
  }
}());
