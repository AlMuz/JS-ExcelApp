import { defaultStyles } from '../../constants'
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

		this.selectCell(this.$root.find('[data-id="1:0"]'))

		this.$on('formula:input', (text) => {
			this.selection.current.text(text)
			this.updateStoreText(text)
		})

		this.$on('formula:enter', () => {
			this.selection.current.focus()
		})

		this.$on('toolbar:applyStyle', (style) => {
			this.selection.applyStyle(style)
		})
	}

	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('table:select', $cell)
		console.log($cell.getStyles(Object.keys(defaultStyles)));
	}

	toHTML() {
		return createTable(15, this.store.getState())
	}

	async onMousedown(event) {
		try {
			const data = await onMousedown(event, this.$root)
			this.$dispatch(actions.tableResize(data))
		} catch (error) {
			console.warn('resizeError', error.message)
		}
	}

	async onClick(event) {
		try {
			const $cell = await onClick(event, this.$root, this.selection)
			this.$emit('table:select', $cell)
			console.log($cell.getStyles(Object.keys(defaultStyles)));
		} catch (error) {
			console.warn('onClick', error.message)
		}
	}

	async onKeydown(event) {
		try {
			const $next = await onKeydown(event, this.$root, this.selection, this.$emit)
			this.$emit('table:select', $next)
		} catch (error) {
			console.warn('onKeydown', error.message)
		}
	}

	onInput(event) {
		this.updateStoreText($(event.target).text())
	}

	updateStoreText(value) {
		this.$dispatch(
			actions.changeText({
				id: this.selection.current.id(),
				value
			})
		)
	}
}
