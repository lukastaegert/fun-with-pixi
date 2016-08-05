const PIXI = require('pixi.js');

const renderer = new PIXI.autoDetectRenderer();
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();
stage.addChild(new PIXI.Text('PIXI is working nicely', {fill: 0xffffff}));
renderer.render(stage);