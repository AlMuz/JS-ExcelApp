import { Page } from '@core/Page'
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { Store } from '@/redux/Store'
import { storage, debounce } from '@core/utils'
import { rootReducer } from '@/redux/rootReducer'
import { initialState } from '@/redux/initialState'

export class ExcelPage extends Page {
	getRoot() {
		console.log(this.params);
		
		const storeClass = new Store(rootReducer, initialState)
		const stateListener = debounce((state) => {
			storage('excel-state', state)
		}, 300)

		storeClass.subscribe(stateListener)
		this.excel = new Excel({
			components: [Header, Toolbar, Formula, Table],
			store: storeClass
		})

		return this.excel.getRoot()
	}

	afterRender() {
		this.excel.init()
	}

	destroy() {
		this.excel.destroy()
	}
}
