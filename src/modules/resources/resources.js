export default class Resource {
	constructor(defaultPath) {
		this.defaultPath = defaultPath;
		this._resources = [];
	}

	add(name) {
		if(name instanceof Array) {
			name.forEach((elName) => this._resources.push(`${this.defaultPath}/${elName}`));
		} else {
			this._resources.push(`${this.defaultPath}/${name}`)
		}

		return this;
	}

	get resources() {
		return this._resources;
	}

}