import p2 from 'p2/build/p2.min.js';
import tableLimits from './../../libs/table_limits.json';

import EventEmmiter from './../event_emmiter/event_emmiter.js';


export default class Physics {
	constructor(renderer) {
		this.renderer = renderer;
		this.gravityBodies = [];
	}

	init() {
		this.event = new EventEmmiter();

		this.world = new p2.World();
		this.renderer.world = this.world;
		this.renderer.physics = this;

		this.updateGravity();
		this.event.register('onSuccessRequest', this.addBolls.bind(this));


		this.addBoards();
		this.addBolls(this.renderer.ballsLength)
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

	addBolls(length) {
		let ballBody, ballShape;

		for(let i = 0; i < length; i++) {
			ballShape = new p2.Circle({radius: 0.2});
			ballBody = new p2.Body({
				mass: 5,
				position: [ballShape.radius * i, ballShape.radius * i],
				velocity: [5, -5]
			});

			ballBody.addShape(ballShape);
			this.world.addBody(ballBody);
		}
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