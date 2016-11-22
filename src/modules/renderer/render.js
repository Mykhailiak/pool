export default class Render {

	constructor(resources, zoom = 100, width = window.innerWidth, height = window.innerHeight) {
		this.rendererWidth = width;
		this.rendererHeight = height;
		this._resource = resources;
		this.zoom = zoom;
		this.balls = [];
		this.animateTurns = []
		this.cueRotateCoef = 0;
	}

	init() {
		this.renderer = PIXI.autoDetectRenderer(this.rendererWidth, this.rendererHeight, {transparent: true});
		this.stage = new PIXI.Stage();

		this.initScenes();
		this.initDOMEvents();

		document.body.appendChild(this.renderer.view);

		this.loadResources()
				.load(this.setup.bind(this))
	}

	loadResources() {
		return PIXI.loader.add(this.resource)
	}

	initScenes() {
		// Create scenes
		this.scenes = {
			gameScene: new PIXI.Container(),
			gameOverScene: new PIXI.Container(),
			gameIntroScene: new PIXI.Container(),
			poolScene: new PIXI.Container(),
			container: new PIXI.Container()
		}
	}

	initDOMEvents() {

		this.powerOffset = 0;
		document.addEventListener('mousemove', (e) => {

			if(!this.cue.static) {
				this.cueRotateCoef = (Math.atan2(e.pageY, e.pageX) / Math.PI * 180) / 3;
			} else if(this.cue.static) {
				if(e.pageY < this.powerOffset) {
					this.cue.anchor.x < 1.1 ? this.cue.anchor.x += 0.002 : this.cue.anchor.x = 1.1;
				} else {
					this.cue.anchor.x > 1.05 ? this.cue.anchor.x -= 0.002 : this.cue.anchor.x = 1.05;
				}

				this.powerOffset = e.pageY;
			}
		});

		document.addEventListener('click', (e) => {
			if(!this.cue.static) {
				this.cue.static = true;
			} else {
				this.cue.anchor.x = 1.035;

				setTimeout(() => {
					this.cue.static = false;
					this.cue.anchor.x = 1.05;
				}, 200)
			}
		});

	}

	setup(events) {
		this.loadedResources = Object.create(PIXI.loader.resources);

		// Set links for main resources
		this.textures = {
			basic: this.loadedResources['resources/bas_textures.json'].textures,
			balls: this.loadedResources['resources/balls.json'].textures
		}

		// Set balls length for loop which create balls in Physic class
		this.ballsLength = Object.keys(this.textures.balls).length;

		// emit physics class about success get request
		this.physics.event.emit('onSuccessRequest', this.ballsLength);

		// Set pool table
		let tableSprite = new PIXI.Sprite(this.textures.basic['8ballpoolset-transparent.png']);
		this.scenes.poolScene.addChild(tableSprite);


		// Set position of poolScenes
		this.scenes.poolScene.position.set(this.renderer.width / 2 - this.scenes.poolScene.width / 2, this.renderer.height / 2 - this.scenes.poolScene.height / 2);

		// Addition container. #fixme!
		this.scenes.container.position.set(this.renderer.width / 2, this.renderer.height / 2);
		this.scenes.container.scale.set(this.zoom);

		// Add all scenes to stage
		this.addToStage(this.scenes);

		//Add render balls animate turns
		this.addToAniamteTurns(() => {
			this.balls.forEach((ball) => {
				ball.view.position.x = ball.physics.position[0];
				ball.view.position.y = ball.physics.position[1];
			});
		});

		this.animate();

	}

	addToStage(scenes) {
		// Add each scene to stage
		for(let scene in scenes) {
			if(scenes.hasOwnProperty(scene)) {
				this.stage.addChild(scenes[scene]);
			}
		}
	}

	addToAniamteTurns(callback) {
		this.animateTurns.push(callback);

		return this;
	}

	calculateFigureCoords(shape) {
		return [-shape.width / 2, -shape.height / 2];
	}

	drawStatic(shape, body) {
		// If production mode - static figure unvisible
		if(NODE_ENV !== 'production') {
			let graphics = new PIXI.Graphics();

			graphics.beginFill(0xff0000);
			graphics.drawRect(...this.calculateFigureCoords(shape), shape.width, shape.height);
			graphics.endFill();

			graphics.position.set(body.position[0], body.position[1]);

			this.scenes.container.addChild(graphics);
		}
	}

	drawBall(body, shape, value) {
		let name = typeof value === 'string' ? value : `ball${value}`;

		let ball = new PIXI.Sprite(this.textures.balls[`${name}.png`]);

		// Set position of sprite
		ball.position.set(body.position[0], body.position[1]);

		// Scale balls
		ball.scale.set(1 / 100);
		ball.anchor.set(0.5, 0.5);

		if(name === 'white ball') {
			ball.whiteBall = true;
			this.whiteBall = ball;

			// Draw cue
			this.drawCue();
		}

		this.balls.push({
			physics: body,
			view: ball
		});

		this.scenes.container.addChild(ball);
	}

	drawCue() {
		this.cue = new PIXI.Sprite(this.textures.basic['kuy.png']);

		this.scenes.container.addChild(this.cue);
		this.cue.position.set(this.whiteBall.position.x, this.whiteBall.position.y);
		this.cue.anchor.x = 1.05;
		this.cue.anchor.y = 0.5;

		this.cue.powerOld = this.cue.anchor.x;

		this.cue.static = false;

		this.cue.scale.set(1 / 100);

		// Add rotation callback to animate turns
		this.addToAniamteTurns(() => {
			this.cue.position.set(this.whiteBall.position.x, this.whiteBall.position.y);
			this.cue.rotation = this.cueRotateCoef;
		});
	}

	rotateCue() {

	}

	animate(time) {
		requestAnimationFrame(this.animate.bind(this));

		this.world.step(1 / 60);

		this.animateTurns.forEach((turn) => {
			turn();
		}, this);

		this.renderer.render(this.stage);

	}

	get resource() {
		return this._resource.resources
	}

}