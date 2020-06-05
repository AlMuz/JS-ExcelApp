import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''
		this.emitter = options.emitter
		this.prepare()
	}

	prepare() {}

	// returns components template
	toHTML() {
		return ''
	}

	init() {
		this.initDOMListeners()
	}
	
	deInit() {
		this.removeDOMListeners()
	}
}
