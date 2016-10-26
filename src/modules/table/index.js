import * as PIXI from 'pixi.js';

const renderer = PIXI.autoDetectRenderer(900, 550, {backgroundColor: 0x1099bb}),
		stage = new PIXI.Container();

document.body.appendChild(renderer.view);

PIXI.loader
	.add('resources/treasureHunter.json')
	.load((e) => {
		let table = new PIXI.Sprite(PIXI.loader.resources['resources/treasureHunter.json'].textures['blob.png']);
		stage.addChild(table);

		console.log('e', table);

		renderer.render(stage);
	});

