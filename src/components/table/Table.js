import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { $ } from '@core/DOM'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root) {
		super($root, {
			listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
		})
	}

	toHTML() {
		return createTable()
	}  

	onClick(event) {
		console.log('onClick', event.target);
	}

	onMousedown(event) {
		if (event.target.dataset.resize) {
			const $resizer = $(event.target)
			const $parent = $resizer.closest('[data-type="resizable"]')
			const coords = $parent.getCoords()

			document.onmousemove= (e) => {
				const delta = e.pageX - coords.right
				const value = coords.width + delta
				$parent.$el.style.width = value + 'px'
				// need to change it
				document.querySelectorAll(`[data-col="${$parent.data.col}"]`)
					.forEach(el => el.style.width = value + 'px')
			}
			
			document.onmouseup = () => {
				document.onmousemove = null
			}
		}
		
	}

	onMousemove() {
		console.log('onMousemove');
	}

	onMouseup() {
		console.log('onMouseup');
	}
}
