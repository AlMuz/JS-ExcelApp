import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''
		this.emitter = options.emitter
		this.unsubscribers = []

		this.prepare()
	}

	// configuring component before init
	prepare() {}

	// returns components template
	toHTML() {
		return ''
	}

	// notify listeners about event notification
	$emit(event, ...args) {
		this.emitter.emit(event, ...args)
	}

	// subscribing on event
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn)
		this.unsubscribers.push(unsub)
	}

	// initialization of component
	// adding dom listeners
	init() {
		this.initDOMListeners()
	}

	deInit() {
		this.removeDOMListeners()

		this.unsubscribers.forEach((unsub) => unsub())
	}
}
