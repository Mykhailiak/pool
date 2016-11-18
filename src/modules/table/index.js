import p2 from 'p2/build/p2.min.js';
import * as PIXI from 'pixi.js';

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x046131}),
		stage = new PIXI.Container();

renderer.autoResize = true;

document.body.appendChild(renderer.view);

PIXI.loader
	.add('resources/bas_textures.json')
	.add('resources/balls.json')
	.load((e) => {
		let basic = PIXI.loader.resources['resources/bas_textures.json'].textures,
				ballsTexture = PIXI.loader.resources['resources/balls.json'].textures,
				balls = [], physicsBalls = [];

		// game scene containers:
		let gameScene = new PIXI.Container(),
				gameOverScene = new PIXI.Container(),
				gameIntroScene = new PIXI.Container(),
				poolScene = new PIXI.Container();

		let table = new PIXI.Sprite(basic['8ballpoolset-transparent.png']);

		poolScene.addChild(table);
		poolScene.position.set(renderer.width / 2 - poolScene.width / 2, renderer.height / 2 - poolScene.height / 2);


		for(let i = 1; i <= 15; i++) {

			var boxShape = new p2.Box({ width: 2, height: 1 });

			var ball = new PIXI.Sprite(ballsTexture[`ball${i}.png`]);

			// ball.position.set(bollBody.position[0], bollBody.position[1]);
			balls.push(ball);


			ball.vx = Math.floor(Math.random() * 10);
			ball.vy = Math.floor(Math.random() * 10);

			poolScene.addChild(ball);
		}



		stage.addChild(gameScene);
		stage.addChild(gameOverScene);
		stage.addChild(gameIntroScene);
		stage.addChild(poolScene);

		function animation(t) {
			t = t || 0;
			requestAnimationFrame(animation);

			// Render scene
			renderer.render(stage);
		}

		animation();
	});