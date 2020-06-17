import { $ } from '@core/DOM'
import { Emitter } from '@core/Emitter'
import { StoreSubscriber } from '@core/StoreSubscriber'
import { changeTableDate } from '@/redux/actions'
import { preventDefault } from '@core/utils'

export class Excel {
	constructor(options) {
		this.components = options.components || []
		this.store = options.store
		this.emitter = new Emitter()
		this.subscriber = new StoreSubscriber(this.store)
	}

	getRoot() {
		// creating root element and
		const $root = $.create('div', 'excel')

		const componentOptions = {
			emitter: this.emitter,
			store: this.store
		}

		this.components = this.components.map((Component) => {
			// creating component element and adding to it class name from the CLASS
			const $el = $.create('div', Component.className)

			// init this Class
			const component = new Component($el, componentOptions)

			// getting components template
			$el.html(component.toHTML())

			// adding it to the root
			$root.append($el)
			return component
		})
		return $root
	}

	init() {
		// disabling right click on prod
		if (process.env.NODE_ENV === 'production') {
			document.addEventListener('contextmenu', preventDefault)
		}
		
		this.store.dispatch(changeTableDate())
		this.subscriber.subscribeComponents(this.components)
		this.components.forEach((component) => component.init())
	}

	destroy() {
		this.subscriber.unsubscribeFromStore()
		this.components.forEach((component) => component.deInit())

		document.removeEventListener('contextmenu', preventDefault)
	}
}
