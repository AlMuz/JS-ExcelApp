import {capitalize} from '@core/utils'

export class DOMListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error('No $root provided to DomListener')
		}

		this.$root = $root
		this.listeners = listeners
	}

	initDOMListeners() {
        // going through all listeners
		this.listeners.forEach((listener) => {

            // getting methods name in format 'onMethod'
            const method = getMethodName(capitalize(listener))
            
            // if method not exists in component - error
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name} component`)
            }

            // else assign listener and transfer to it this context
            this.$root.on(listener, this[method].bind(this))
        })
	}

	removeDOMListeners() {}
}


// something like private function
function getMethodName(eventName) {
    return `on${eventName}`
}