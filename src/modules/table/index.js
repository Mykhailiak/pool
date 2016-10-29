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

		ball1.circular = true;
		ball2.circular = true;

		poolScene.hitArea = new PIXI.Rectangle(51, 51, 1022, 523);

		stage.addChild(gameScene);
		stage.addChild(gameOverScene);
		stage.addChild(gameIntroScene);
		stage.addChild(poolScene);


		console.log('bump', bump);
		console.log('Pool', poolScene);

		window.poolScene = poolScene;

		ball1.vx = 10;
		ball1.vy = 10;
		ball2.vx = 3;
		function animation() {

			ball1.y += ball1.vy;
			ball1.x += ball1.vx;

			ball2.x += ball2.vx;

			bump.contain(ball1, {x: 51, y: 51, width: 1082, height: 592}, true, (val) => {
				console.log('Collapse', val);
			});


			if(bump.hit(ball1, ball2, true, true)) {
				console.log('collapse', ball1.vx);
			}

			// console.log();

			// if(bump.hitTestRectangle(ball1, poolScene.hitArea)) {
			// 	console.log('boo');
			// }

			requestAnimationFrame(animation);

			renderer.render(stage);
		}

		animation();




		renderer.render(stage);
	});

