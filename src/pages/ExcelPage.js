import { Page } from '@core/Page'
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { Store } from '@/redux/Store'
import { storage, debounce } from '@core/utils'
import { rootReducer } from '@/redux/rootReducer'
import { normalizeInitalState } from '@/redux/initialState'

export class ExcelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now().toString()
		const state = storage(storageName(params))
		const storeClass = new Store(rootReducer, normalizeInitalState(state))
		const stateListener = debounce((state) => {
			storage(storageName(params), state)
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

function storageName(param) {
	return `excel:${param}`
}
