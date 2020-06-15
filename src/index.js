import './scss/index.scss'
import {Router} from '@core/router/'
new Router('#app', {

})
// import { Excel } from '@/components/excel/Excel'
// import { Header } from '@/components/header/Header'
// import { Toolbar } from '@/components/toolbar/Toolbar'
// import { Formula } from '@/components/formula/Formula'
// import { Table } from '@/components/table/Table'
// import { Store } from '@/redux/Store'
// import { storage, debounce } from '@core/utils'
// import { rootReducer } from '@/redux/rootReducer'
// import { initialState } from '@/redux/initialState'

// const storeClass = new Store(rootReducer, initialState)

// const stateListener = debounce((state) => {
// 	storage('excel-state', state)
// }, 300)

// storeClass.subscribe(stateListener)

// const excel = new Excel('#app', {
// 	components: [Header, Toolbar, Formula, Table],
// 	store: storeClass
// })

// excel.render()
