import { $ } from '@core/DOM'
import { ExcelComponent } from '@core/ExcelComponent'
import { createHeader } from './header.template'
import { changeTableTitle } from '@/redux/actions'
import { ActiveRoute } from '@core/router/ActiveRoute'

export class Header extends ExcelComponent {
	static className = 'excel__header'

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options
		})
	}

	toHTML() {
		return createHeader(this.store.getState())
	}

	onInput(event) {
		const value = $(event.target).text()
		this.$dispatch(
			changeTableTitle({
				value
			})
		)
	}

	onClick(event) {
		const $target = $(event.target)
		if ($target.data.button === 'remove') {
			const confirmation = confirm('Are you sure want to delete this table?')

			if (confirmation) {
				localStorage.removeItem(`excel:${ActiveRoute.param}`)
				ActiveRoute.navigate('')
			}
		}
	}
}
