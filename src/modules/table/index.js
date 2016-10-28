import * as Bump from 'bump.js';
import * as PIXI from 'pixi.js';

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x046131}),
		stage = new PIXI.Container();

let bump = new Bump.default(PIXI);

document.body.appendChild(renderer.view);

PIXI.loader
	.add('resources/bas_textures.json')
	.add('resources/balls.json')
	.load((e) => {
		let basic = PIXI.loader.resources['resources/bas_textures.json'].textures,
				balls = PIXI.loader.resources['resources/balls.json'].textures;

		// game scene containers:
		let gameScene = new PIXI.Container(),
				gameOverScene = new PIXI.Container(),
				gameIntroScene = new PIXI.Container(),
				poolScene = new PIXI.Container();

		let table = new PIXI.Sprite(basic['8ballpoolset-transparent.png']),
				ball1 = new PIXI.Sprite(balls['ball1.png']),
				ball2 = new PIXI.Sprite(balls['ball2.png']);

		ball1.vx = 0;
		ball1.vy = 0;

		poolScene.addChild(table);
		poolScene.addChild(ball1);
		poolScene.addChild(ball2);

		poolScene.position.set(renderer.width / 2 - poolScene.width / 2, renderer.height / 2 - poolScene.height / 2);
		ball1.position.set(200, poolScene.height / 2 - ball1.height / 2);
		ball2.position.set(1000, (poolScene.height / 2 - ball2.height / 2));

		poolScene.hitArea = new PIXI.Rectangle(51, 51, 1022, 523);

		stage.addChild(gameScene);
		stage.addChild(gameOverScene);
		stage.addChild(gameIntroScene);
		stage.addChild(poolScene);


		console.log('bump', bump);
		console.log('Pool', poolScene);

		window.poolScene = poolScene;

		function animation() {
			ball1.vx = 4;

			ball1.x += ball1.vx;

			if(bump.hitTestRectangle(ball1, ball2)) {
				console.log('colllaaaapse');
			}

			requestAnimationFrame(animation);

			renderer.render(stage);
		}

		animation();




		renderer.render(stage);
	});

