import * as PIXI from 'pixi.js';

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x046131}),
		stage = new PIXI.Container();

document.body.appendChild(renderer.view);

PIXI.loader
	.add('resources/bas_textures.json')
	.add('resources/balls.json')
	.load((e) => {
		let id = PIXI.loader.resources['resources/bas_textures.json'].textures;

		// game scene containers:
		let gameScene = new PIXI.Container(),
				gameOverScene = new PIXI.Container(),
				gameIntroScene = new PIXI.Container(),
				poolScene = new PIXI.Container();

		let table = new PIXI.Sprite(id['8ballpoolset-transparent.png']);


		poolScene.addChild(table);
		poolScene.position.set(renderer.width / 2 - poolScene.width / 2, renderer.height / 2 - poolScene.height / 2);

		poolScene.addChild(table);

		stage.addChild(gameScene);
		stage.addChild(gameOverScene);
		stage.addChild(gameIntroScene);
		stage.addChild(poolScene);




		renderer.render(stage);
	});

