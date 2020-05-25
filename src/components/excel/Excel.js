import { $ } from '@core/DOM'

export class Excel {
	constructor(selector, options) {
		this.$el = document.querySelector(selector)
		this.components = options.components || []
	}

	getRoot() {
		// creating root element and
		const $root = $.create('div', 'excel')

		this.components.forEach((Component) => {
			// creating component element and adding to it class name from the CLASS
			const $el = $.create('div', Component.className)

			// init this Class
			const component = new Component($el)

			// getting components template
			$el.innerHTML = component.toHTML()

			// adding it to the root
			$root.append($el)
		})
		return $root
	}

	render() {
		this.$el.append(this.getRoot())
	}
}
