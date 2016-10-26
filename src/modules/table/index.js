import * as PIXI from 'pixi.js';

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb}),
		stage = new PIXI.Container();

document.body.appendChild(renderer.view);

PIXI.loader
	.add('resources/table.png')
	.load((e) => {
		let table = new PIXI.Sprite(PIXI.loader.resources['resources/table.png'].texture);

		table.scale.set(0.61, 0.61);

		table.position.set(renderer.view.width / 2 - table.width / 2, renderer.view.height / 2 - table.height / 2);

		stage.addChild(table);

		renderer.render(stage);
	});

