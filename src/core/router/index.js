import { $ } from '@core/DOM'
import { ActiveRoute } from './ActiveRoute'

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided')
        }

       this.$placeholder = $(selector)
       this.routes = routes
       this.init()
       this.handlePageChange = this.handlePageChange.bind(this)
    }

    init() {
        window.addEventListener('hashchange', this.handlePageChange)
        this.handlePageChange()
    }
    
    deInit() {
        window.removeEventListener('hashchange', this.handlePageChange)
    }

    handlePageChange() {
        console.log(ActiveRoute.path);
        console.log(ActiveRoute.param);

        this.$placeholder.html(`<h1>${ActiveRoute.path}</h1>`)
    }
}