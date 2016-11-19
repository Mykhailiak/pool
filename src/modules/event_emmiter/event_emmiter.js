// Need for asynchronous requests

export default class EventEmmiter {
	constructor(events = {}) {
		this.events = events;
	}

	register(name, callback) {
		this.events[name] = callback;
	}

	on(name, data) {
		this.events[name](data);
	}

	emit(name, data) {
		this.on(name, data);
	}
}