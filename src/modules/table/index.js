import p2 from 'p2/build/p2.min.js';
import * as PIXI from 'pixi.js';

// var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x046131}),
// 		stage = new PIXI.Container();

// renderer.autoResize = true;
// document.body.appendChild(renderer.view);


// // Create a World
//            var world = new p2.World({
//                gravity: [0, -10]
//            });

//            var ballBody1 = new p2.Body({
//                           position: [-2,1],
//                           mass: 1,
//                           damping: 0, // Remove damping from the ball, so it does not lose energy
//                           angularDamping: 0
//                       });
//            var circleShape1 = new p2.Circle({
//                           radius: 0.5,
//                           material: new p2.Material()
//                       });
//                       ballBody1.addShape(circleShape1);
//                       // Add ball to world
//                       world.addBody(ballBody1);

// PIXI.loader
// 	.add('resources/bas_textures.json')
// 	.add('resources/balls.json')
// 	.load((e) => {
// 		let basic = PIXI.loader.resources['resources/bas_textures.json'].textures,
// 				ballsTexture = PIXI.loader.resources['resources/balls.json'].textures,
// 				balls = [], physicsBalls = [];

// 		// game scene containers:
// 		let gameScene = new PIXI.Container(),
// 				gameOverScene = new PIXI.Container(),
// 				gameIntroScene = new PIXI.Container(),
// 				poolScene = new PIXI.Container();

// 		let table = new PIXI.Sprite(basic['8ballpoolset-transparent.png']);

// 		poolScene.addChild(table);
// 		poolScene.position.set(renderer.width / 2 - poolScene.width / 2, renderer.height / 2 - poolScene.height / 2);


// 		for(let i = 1; i <= 15; i++) {

// 			var boxShape = new p2.Box({ width: 2, height: 1 });

// 			var ball = new PIXI.Sprite(ballsTexture[`ball${i}.png`]);

// 			// ball.position.set(bollBody.position[0], bollBody.position[1]);
// 			balls.push(ball);


// 			ball.vx = Math.floor(Math.random() * 10);
// 			ball.vy = Math.floor(Math.random() * 10);

// 			poolScene.addChild(ball);
// 		}



// 		stage.addChild(gameScene);
// 		stage.addChild(gameOverScene);
// 		stage.addChild(gameIntroScene);
// 		stage.addChild(poolScene);

// 		function animation(t) {
// 			t = t || 0;
// 			requestAnimationFrame(animation);

// 			ballBody1.position;
// 			circleShape1.position;
// 			debugger;

// 			// Render scene
// 			renderer.render(stage);
// 		}

// 		animation();
// 	});



var renderer, stage, container, graphics, zoom,
     world, boxShape, boxBody, planeBody, planeShape;
     init();
     animate();
     function init(){
         // Init p2.js
         world = new p2.World({
         	gravity:[0,-9.82]
         });
         // Add a box
         boxShape = new p2.Box({ width: 2, height: 1 });
         boxBody = new p2.Body({
             mass:1,
             position:[0,2],
             angularVelocity:1
         });
         boxBody.addShape(boxShape);
         world.addBody(boxBody);
         // Add a plane
         planeShape = new p2.Plane();
         planeBody = new p2.Body({ position:[0,-3] });
         planeBody.addShape(planeShape);
         world.addBody(planeBody);
         // Pixi.js zoom level
         zoom = 100;
         // Initialize the stage
         renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x046131}),
         stage = new PIXI.Stage(0xFFFFFF);


         PIXI.loader
         	.add('resources/bas_textures.json')
         	.add('resources/balls.json')
         	.load(() => {
         		let basic = PIXI.loader.resources['resources/bas_textures.json'].textures,
         				ballsTexture = PIXI.loader.resources['resources/balls.json'].textures;

         		// game scene containers:
         				let gameScene = new PIXI.Container(),
         						gameOverScene = new PIXI.Container(),
         						gameIntroScene = new PIXI.Container(),
         						poolScene = new PIXI.Container();

         				let table = new PIXI.Sprite(basic['8ballpoolset-transparent.png']);

         				poolScene.addChild(table);
         				poolScene.position.set(renderer.width / 2 - poolScene.width / 2, renderer.height / 2 - poolScene.height / 2);

         				stage.addChild(gameScene);
         				stage.addChild(poolScene);

         				// We use a container inside the stage for all our content
         				// This enables us to zoom and translate the content
         				container =     new PIXI.DisplayObjectContainer(),
         				stage.addChild(container);
         				// Add the canvas to the DOM
         				document.body.appendChild(renderer.view);
         				// Add transform to the container
         				container.position.x =  renderer.width/2; // center at origin
         				container.position.y =  renderer.height/2;
         				container.scale.x =  zoom;  // zoom in
         				container.scale.y = -zoom; // Note: we flip the y axis to make "up" the physics "up"
         				// Draw the box.
         				graphics = new PIXI.Graphics();
         				graphics.beginFill(0xff0000);
         				graphics.drawRect(-boxShape.width/2, -boxShape.height/2, boxShape.width, boxShape.height);
         				// Add the box to our container
         				container.addChild(graphics);
         	})


     }
     // Animation loop
     function animate(t){
         t = t || 0;
         requestAnimationFrame(animate);
         // Move physics bodies forward in time
         world.step(1/60);
         // Transfer positions of the physics objects to Pixi.js
         graphics.position.x = boxBody.position[0];
         graphics.position.y = boxBody.position[1];
         graphics.rotation =   boxBody.angle;

         debugger;
         // Render scene
         renderer.render(stage);
     }