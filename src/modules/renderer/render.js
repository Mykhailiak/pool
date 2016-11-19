export default class Render {

	constructor(resources, zoom = 100, width = window.innerWidth, height = window.innerHeight) {
		this.rendererWidth = width;
		this.rendererHeight = height;
		this._resource = resources;
		this.zoom = zoom;
	}

	init() {
		this.renderer = PIXI.autoDetectRenderer(this.rendererWidth, this.rendererHeight, {backgroundColor: 0x046131});
		this.stage = new PIXI.Container();

		this.initScenes();

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
		this.physics.$emit('onSuccessRequest', this.ballsLength);

		// Set pool table
		this.scenes.poolScene.addChild(new PIXI.Sprite(this.textures.basic['8ballpoolset-transparent.png']));


		// Set position of poolScenes
		this.scenes.poolScene.position.set(this.renderer.width / 2 - this.scenes.poolScene.width / 2, this.renderer.height / 2 - this.scenes.poolScene.height / 2);

		// Addition container. #fixme!
		this.scenes.container.position.set(this.renderer.width / 2, this.renderer.height / 2);
		this.scenes.container.scale.set(this.zoom);

		// Add all scenes to stage
		this.addToStage(this.scenes);

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

	animate(time) {
		requestAnimationFrame(this.animate.bind(this));

		this.world.step(1 / 60);

		this.renderer.render(this.stage);
	}

	get resource() {
		return this._resource.resources
	}

}