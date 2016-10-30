import * as Bump from 'bump.js';
import * as PIXI from 'pixi.js';

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x046131}),
		stage = new PIXI.Container();

renderer.autoResize = true;

let bump = new Bump.default(PIXI);

document.body.appendChild(renderer.view);

PIXI.loader
	.add('resources/bas_textures.json')
	.add('resources/balls.json')
	.load((e) => {
		let basic = PIXI.loader.resources['resources/bas_textures.json'].textures,
				balls = PIXI.loader.resources['resources/balls.json'].textures,
				ballsArray = [];

		// game scene containers:
		let gameScene = new PIXI.Container(),
				gameOverScene = new PIXI.Container(),
				gameIntroScene = new PIXI.Container(),
				poolScene = new PIXI.Container();

		let table = new PIXI.Sprite(basic['8ballpoolset-transparent.png']);

		let xOffset = 55,
				yOffset = 55;

		poolScene.addChild(table);
		poolScene.position.set(renderer.width / 2 - poolScene.width / 2, renderer.height / 2 - poolScene.height / 2);

		for(let i = 1; i <= 15; i++) {
			var ball = new PIXI.Sprite(balls[`ball${i}.png`]);

			ball.position.set(i * 32 + xOffset, i * 32 + yOffset);
			ballsArray.push(ball);

			ball.vx = 0;
			ball.vy = 0;

			poolScene.addChild(ball);
		}



		stage.addChild(gameScene);
		stage.addChild(gameOverScene);
		stage.addChild(gameIntroScene);
		stage.addChild(poolScene);

		function animation() {

			requestAnimationFrame(animation);

			renderer.render(stage);
		}

		animation();




		renderer.render(stage);
	});

