import './scss/index.scss'
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { Store } from '@/redux/Store'
import { rootReducer } from '@/redux/rootReducer'

const storeClass = new Store(rootReducer, {
	colState: {}
})

const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table],
	store: storeClass
})

excel.render()
