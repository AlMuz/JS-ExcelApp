import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { onMousedown, onClick } from './table.events'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root) {
		super($root, {
			listeners: ['mousedown', 'click']
		})
	}

	// will be called first
	prepare() {
		this.selection = new TableSelection()
	}

	// will be called second
	init() {
		super.init()

		const $cell = this.$root.find('[data-id="1:0"]')
		this.selection.select($cell)
	}

	toHTML() {
		return createTable()
	}

	onMousedown(event) {
		onMousedown(this.$root, event)
	}

	onClick(event) {
		onClick(this.$root, this.selection, event);
	}
}
