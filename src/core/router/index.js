import { $ } from '@core/DOM'
import { ActiveRoute } from './ActiveRoute'
import { Loader } from '@/components/Loader'

export class Router {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided')
		}

		this.$wrapper = $(selector)
		this.routes = routes
		this.page = null

		this.loader = new Loader()

		// adding 'this' to the function
		this.handlePageChange = this.handlePageChange.bind(this)

		this.init()
	}

	init() {
		// adding event listener to hashchange
		window.addEventListener('hashchange', this.handlePageChange)

		// loading page
		this.handlePageChange()
	}

	deInit() {
		window.removeEventListener('hashchange', this.handlePageChange)
	}

	async handlePageChange() {
		// clearing old page before init new one
		if (this.page) {
			this.page.destroy()
		}

		// clearing wrapper where is all html
		this.$wrapper.clear().append(this.loader)

		// according on active roue - open dashboard or excel
		const Page = ActiveRoute.path.includes('excel')
			? this.routes.excel
			: this.routes.dashboard

		// init page with route params
		this.page = new Page(ActiveRoute.param)

		const root = await this.page.getRoot()
		// adding to wrapper html
		this.$wrapper.clear().append(root)

		this.page.afterRender()
	}
}
