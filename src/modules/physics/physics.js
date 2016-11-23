import p2 from 'p2/build/p2.min.js';

import tableLimits from './../../libs/table_limits.json';
import tablePockets from './../../libs/table_pocket.json';

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

		this.bollsMaterial = new p2.Material();
		this.boardMaterial = new p2.Material();
		this.pocketMaterial = new p2.Material();

		this.initEvents();

		this.updateGravity();
		this.event.register('onSuccessRequest', this.addBolls.bind(this));

		this.addBoards();
		this.addPockets();
		this.addBolls(this.renderer.ballsLength);
	}

	initEvents() {
		this.world.on('beginContact',function(event){
				// console.log('event', event);
		});
	}

	addGravityBoies(body) {
		if(body instanceof Array) {
			body.forEach((elBody) => this.gravityBodies.push(body))
		} else {
			this.gravityBodies.push(body);
		}

		return this;
	}

	updateGravity(x = 0, y = 0) {
		this.world.applyGravity = false;

		let gravity = p2.vec2.fromValues(x, y),
				gravityForce = p2.vec2.create();

		this.gravityBodies.forEach((body) => {
			p2.vec.scale(gravityForce, gravity, body.mass);
			p2.vec.add(body.force, body.force, gravityForce);
		});
	}

	addBolls(length) {
		let ballBody, ballShape, argumentValue;

		for(let i = 0; i < length; i++) {
			ballShape = new p2.Circle({
				radius: 0.23,
				material: this.bollsMaterial
			});
			ballBody = new p2.Body({
				mass: 1,
				position: [ballShape.radius * i, 0],
				velocity: [1, 1]
			});

			ballBody.addShape(ballShape);
			this.world.addBody(ballBody);

			if(i === length - 1) {
				argumentValue = 'white ball';
				this.whiteBall = {
					body: ballBody,
					shape: ballShape
				};
			} else {
				argumentValue = i;
			}

			this.renderer.drawBall(ballBody, ballShape, argumentValue);
		}

		this.addPhysicsForce();
	}

	hitWhiteBall(coef, power) {

		let speed = power < 1.06 ? power * 4 : power * 10;

		this.whiteBall.body.velocity = this.velocityFromRotation(coef, speed);

	}

	velocityFromRotation(angle, speed = 1, point) {
		return [(Math.cos(angle) * speed), (Math.sin(angle) * speed)];
	}

	addPhysicsForce() {
		let forces = new p2.ContactMaterial(this.boardMaterial, this.bollsMaterial, {
			friction: 0.6,
			restitution: 0.8
		});

		this.world.addContactMaterial(forces);
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
				material: this.boardMaterial
			});

			body.addShape(shape);
			this.world.addBody(body);

			this.renderer.drawStatic(shape, body)

		});
	}

	addPockets() {
		let body, shape;
		this.pockets.forEach((pocket) => {
			body = new p2.Body({
				mass: 0,
				position: [pocket.x, pocket.y]
			});
			shape = new p2.Circle({
				radius: pocket.radius,
				material: this.pocketMaterial
			});

			body.addShape(shape);
			this.world.addBody(body);

			this.renderer.drawPockets(shape, body);
		});
	}

	get boards() {
		return tableLimits.boards;
	}

	get pockets() {
		return tablePockets.pockets;
	}
}