import * as PIXI from 'pixi.js';

const renderer = PIXI.autoDetectRenderer(900, 550, {backgroundColor: 0x1099bb}),
		stage = new PIXI.Container();

PIXI.loader
	.add('../../resources/treasureHunter.json')
	.load((e) => {
		console.log('Loaded resource');
	});

document.body.appendChild(renderer.view);