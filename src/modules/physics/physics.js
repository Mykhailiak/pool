import p2 from 'p2/build/p2.min.js';
import tableLimits from './../../libs/table_limits.json';


export default class Physics {
	constructor(renderer) {
		this.renderer = renderer;
		this.gravityBodies = [];
	}

	init() {
		this.world = new p2.World();
		this.renderer.world = this.world;

		this.updateGravity();


		this.addBoards();
	}

	addGravityBoies(body) {
		if(body instanceof Array) {
			body.forEach((elBody) => this.gravityBodies.push(body))
		} else {
			this.gravityBodies.push(body);
		}

		return this;
	}

	updateGravity(x = 0, y = -9.8) {
		this.world.applyGravity = false;

		let gravity = p2.vec2.fromValues(x, y),
				gravityForce = p2.vec2.create();

		this.gravityBodies.forEach((body) => {
			p2.vec.scale(gravityForce, gravity, body.mass);
			p2.vec.add(body.force, body.force, gravityForce);
		});
	}

	addBolls() {

	}

	addBoards() {
		let body, shape;
		this.boards.forEach((board) => {

			body = new p2.Body({
				mass: 0,
				position: [board.x, board.y]
			});


			shape = new p2.Box({
				width: board.width,
				height: board.height,
				material: new p2.Material()
			});

			body.addShape(shape);
			this.world.addBody(body);

			this.renderer.drawStatic(shape, body)

		});
	}

	get boards() {
		return tableLimits.boards;
	}
}