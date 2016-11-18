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



var renderer, stage, container, graphics, zoom, platform, platform2, platform3, platform4, platform5, platform6,
     world, boxShape, boxBody, planeBody, planeShape;
     init();
     animate();
     function init(){
         // Init p2.js
         world = new p2.World();
         // Add a box
         boxShape = new p2.Box({ width: 2, height: 1 });
         boxBody = new p2.Body({
             mass: 1,
             position:[0, 0],
             angularVelocity:1
         });

         // Turn off global gravity
         world.applyGravity=false;

         // Keep track of which bodies you want to apply gravity on:
         var gravityBodies=[boxBody];

         // And just before running world.step(), do this:
         var gravity = p2.vec2.fromValues(0, -50),
             gravityForce = p2.vec2.create();
         for(var i=0; i<gravityBodies.length; i++){
             var b =  gravityBodies[i];
             p2.vec2.scale(gravityForce,gravity,b.mass); // F_gravity = m*g
             p2.vec2.add(b.force,b.force,gravityForce);  // F_body += F_gravity
         }

         debugger;

         boxBody.addShape(boxShape);
         world.addBody(boxBody);
         // Add a plane
         planeShape = new p2.Plane();
         planeBody = new p2.Body({ position:[0, 0] });
         planeBody.addShape(planeShape);
         world.addBody(planeBody);
         // Pixi.js zoom level
         zoom = 100;
         // Initialize the stage
         renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x046131}),
         stage = new PIXI.Stage(0xFFFFFF);



         
         // Create static platform box
         var platformBody1 = new p2.Body({
                 mass: 0, // static
                 position: [0.36, -3]
             }),
             platformShape1 = new p2.Box({
                 width: 4.32,
                 height: 0.45,
                 material: new p2.Material()
             });
         platformBody1.addShape(platformShape1);
         world.addBody(platformBody1);

         // Create static platform box
         var platformBody2 = new p2.Body({
                 mass: 0, // static
                 position: [-4.68, -3]
             }),
             platformShape2 = new p2.Box({
                 width: 4.32,
                 height: 0.45,
                 material: new p2.Material()
             });
         platformBody2.addShape(platformShape2);
         world.addBody(platformBody2);

         // Create static platform box
         var platformBody3 = new p2.Body({
                 mass: 0, // static
                 position: [0.36, 2.76]
             }),
             platformShape3 = new p2.Box({
                 width: 4.31,
                 height: 0.45,
                 material: new p2.Material()
             });
         platformBody3.addShape(platformShape3);
         world.addBody(platformBody3);

         // Create static platform box
         var platformBody4 = new p2.Body({
                 mass: 0, // static
                 position: [-4.64, 2.75]
             }),
             platformShape4 = new p2.Box({
                 width: 4.3,
                 height: 0.46,
                 material: new p2.Material()
             });
         platformBody4.addShape(platformShape4);
         world.addBody(platformBody4);

         // Create static platform box
         var platformBody5 = new p2.Body({
                 mass: 0, // static
                 position: [-5.59, -2.12]
             }),
             platformShape5 = new p2.Box({
                 width: 0.46,
                 height: 4.439,
                 material: new p2.Material()
             });
         platformBody5.addShape(platformShape5);
         world.addBody(platformBody5);

         // Create static platform box
         var platformBody6 = new p2.Body({
                 mass: 0, // static
                 position: [5.14, -2.12]
             }),
             platformShape6 = new p2.Box({
                 width: 0.46,
                 height: 4.439,
                 material: new p2.Material()
             });
         platformBody6.addShape(platformShape6);
         world.addBody(platformBody6);



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
         				container.addChild(graphics);



         				platform = new PIXI.Graphics();
         				platform.beginFill(0xff0000);
         				platform.drawRect(platformBody1.position[0], platformBody1.position[1] - 0.1, platformShape1.width, platformShape1.height);
         				// Add the box to our container
         				container.addChild(platform);

         				platform2 = new PIXI.Graphics();
         				platform2.beginFill(0xff0000);
         				platform2.drawRect(platformBody2.position[0], platformBody2.position[1] - 0.1, platformShape2.width, platformShape2.height);
         				// Add the box to our container
         				container.addChild(platform2);

         				platform3 = new PIXI.Graphics();
         				platform3.beginFill(0xff0000);
         				platform3.drawRect(platformBody3.position[0], platformBody3.position[1] - 0.1, platformShape3.width, platformShape3.height);
         				// Add the box to our container
         				container.addChild(platform3);

         				platform4 = new PIXI.Graphics();
         				platform4.beginFill(0xff0000);
         				platform4.drawRect(platformBody4.position[0], platformBody4.position[1] - 0.1, platformShape4.width, platformShape4.height);
         				// Add the box to our container
         				container.addChild(platform4);

         				platform5 = new PIXI.Graphics();
         				platform5.beginFill(0xff0000);
         				platform5.drawRect(platformBody5.position[0], platformBody5.position[1] - 0.1, platformShape5.width, platformShape5.height);
         				// Add the box to our container
         				container.addChild(platform5);

         				platform6 = new PIXI.Graphics();
         				platform6.beginFill(0xff0000);
         				platform6.drawRect(platformBody6.position[0], platformBody6.position[1] - 0.1, platformShape6.width, platformShape6.height);
         				// Add the box to our container
         				container.addChild(platform6);
         	});



         	// Turn off global gravity
         	// world.applyGravity=false;

         	// // Keep track of which bodies you want to apply gravity on:
         	// var gravityBodies=[boxBody];

         	// // And just before running world.step(), do this:
         	// var gravity = p2.vec2.fromValues(0,-9.82),
         	//     gravityForce = p2.vec2.create();
         	// for(var i=0; i<gravityBodies.length; i++){
         	//     var b =  gravityBodies[i];
         	//     p2.vec2.scale(gravityForce,gravity,b.mass); // F_gravity = m*g
         	//     p2.vec2.add(b.force,b.force,gravityForce);  // F_body += F_gravity
         	// }


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