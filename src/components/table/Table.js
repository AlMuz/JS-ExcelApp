/* eslint-disable no-unused-vars */
import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { onMousedown, onClick, onKeydown } from './table.events'
import { TableSelection } from './TableSelection'
import { $ } from '@core/DOM'
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'click', 'keydown', 'input'],
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

		this.selectCell(this.$root.find('[data-id="1:0"]'));

		this.$on('formula:input', (text) => {
			this.selection.current.text(text)
		})

		this.$on('formula:enter', () => {
			this.selection.current.focus()
		})

		// this.$subscribe(state => {
		// 	console.log('TableState', state);
		// })
	}

	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('table:input', $cell)
	}

	toHTML() {
		return createTable()
	}

	async resizeTable(event) {
		try {
			const data = await onMousedown(event, this.$root)
			this.$dispatch(actions.tableResize(data))
			console.log(data);
		} catch (error) {
			console.warn('resizeError' ,error.message);
		}
	}

	onMousedown(event) {
		this.resizeTable(event)
	}

	onClick(event) {
		onClick(event, this.$root, this.selection)
	}

	onKeydown(event) {
		const $next = onKeydown(event, this.$root, this.selection, this.$emit)
		if ($next) {
			this.$emit('table:select', $next)
		}
	}

	onInput(event) {
		this.$emit('table:input', $(event.target))
	}
}
