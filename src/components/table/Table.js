/* eslint-disable no-unused-vars */
import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { onMousedown, onClick, onKeydown } from './table.events'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'click', 'keydown'],
			...options
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

		this.emitter.subscribe('formulaInput', (text) => {
			this.selection.current.text(text)
		})
	}

	toHTML() {
		return createTable()
	}

	onMousedown(event) {
		onMousedown(this.$root, event)
	}

	onClick(event) {
		onClick(this.$root, this.selection, event)
	}

	onKeydown(event) {
		console.log(event);
		
		onKeydown(this.$root, this.selection, event)
	}
}
