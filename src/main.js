import * as PIXI from 'pixi.js';

import Renderer from './modules/renderer/render.js';
import Resources from './modules/resources/resources.js';
import Physics from './modules/physics/physics.js';

let resources = new Resources('resources');

let renderer = new Renderer(resources.add(['bas_textures.json', 'balls.json']), 100);
renderer.init();

let physics = new Physics(renderer);
physics.init()

window.renderer = renderer;
window.resources = resources;

console.log('render', renderer);
console.log('resources', resources);
console.log('physics', physics);