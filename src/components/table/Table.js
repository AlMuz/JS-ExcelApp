import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { onMousedown } from './table.events'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root) {
		super($root, {
			listeners: ['mousedown']
		})
	}

	toHTML() {
		return createTable()
	}  

	onMousedown(event) {
		onMousedown(this.$root, event)
	}
}
