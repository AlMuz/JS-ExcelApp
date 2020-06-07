import { $ } from '@core/DOM'
import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
	static className = 'excel__formula'

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			...options
		})
	}

	init() {
		super.init()

		this.$formula = this.$root.find('.input')

		this.$on('table:select', ($cell) => {
			this.$formula.text($cell.text())
		})

		this.$on('table:input', ($cell) => {
			this.$formula.text($cell.text())
		})

		// this.$subscribe(state => {
		// 	console.log('formulaState', state);
		// })
	}

	toHTML() {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false"></div>
		`
	}

	// on input - change in cell text
	onInput(event) {
		this.$emit('formula:input', $(event.target).text())
	}

	// on enter - focus on cell
	onKeydown(event) {
		const keys = ['Enter', 'Tab']
		if (keys.includes(event.key)) {
			event.preventDefault()
			this.$emit('formula:enter')
		}
	}
}
