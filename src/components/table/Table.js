import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'

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
			console.log(`Start Resizing ${event.target.dataset.resize}`);
		}
	}

	onMousemove() {
		console.log('onMousemove');
	}

	onMouseup() {
		console.log('onMouseup');
	}
}
