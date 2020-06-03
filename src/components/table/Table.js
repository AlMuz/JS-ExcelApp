import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { onMousedown } from './table.events'
import { TableSelection } from './TableSelection'
import { $ } from '@core/DOM'

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
		const id = event.target.dataset.id
		if (id) {
			const $cell = $(event.target)
			this.selection.select($cell)
		}
	}
}
