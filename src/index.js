import './scss/index.scss'
import { Router } from '@core/router/'
import { DashboardPage } from './pages/DashboardPage'
import { ExcelPage } from './pages/ExcelPage'

// init router with selector and routes
// for route assigned class page
new Router('#app', {
	dashboard: DashboardPage,
	excel: ExcelPage
})
