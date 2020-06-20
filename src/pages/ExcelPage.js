import { Page } from '@core/page/Page'
import { StateProcessor } from '@core/page/StateProcessor'
import { LocalStorageClient } from '@core/page/clients/LocalStorageClient'
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { Store } from '@/redux/Store'
import { rootReducer } from '@/redux/rootReducer'
import { normalizeInitalState } from '@/redux/initialState'

export class ExcelPage extends Page {
	constructor(param) {
		super(param)

		this.storeSub = null
		this.processor = new StateProcessor(new LocalStorageClient(this.params))
	}

	async getRoot() {
		const state = await this.processor.get()

		// init Store class with state
		const storeClass = new Store(rootReducer, normalizeInitalState(state))

		this.storeSub = storeClass.subscribe(this.processor.listen)

		// loading excel components
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
		this.storeSub.unSubscribe()
	}
}
