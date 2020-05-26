import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners)
	}

	// returns components template
	toHTML() {
		return ''
	}

	init() {
		this.initDOMListeners()
	}
}
