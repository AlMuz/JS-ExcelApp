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

class StateProcessor {

	constructor(client, delay = 300) {
		this.client = client
		this.listen = debounce(this.listen.bind(this), delay)
	}

	listen(state) {
		this.client.save(state)
	}

	get() {
		return this.client.get()
	}
}

class LocalStorageClient {
	constructor(name) {
		this.name = storageName(name)
	}

	save(state) {
		storage(this.name, state)
		return Promise.resolve()
	}

	get() {
		return Promise.resolve(storage(this.name))
	}
}

export class ExcelPage extends Page {
	constructor(param) {
		super(param)

		this.storeSub = null
		this.processor = new StateProcessor(
			new LocalStorageClient(this.params)
		)
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

function storageName(param) {
	return `excel:${param}`
}
