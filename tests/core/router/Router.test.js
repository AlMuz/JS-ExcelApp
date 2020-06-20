import { Router } from '@core/router'
import { Page } from '@core/Page'

class DashboardPage extends Page {
	getRoot() {
		const root = document.createElement('div')
		root.innerHTML = 'dashboard'
		return root
	}
}
class ExcelPage extends Page {}

describe('Router test', () => {
	let router
	let $root

	beforeEach(() => {
		$root = document.createElement('div')
		router = new Router($root, {
			dashboard: DashboardPage,
			excel: ExcelPage
		})
	})

	test('should be defined', () => {
		expect(router).toBeDefined()
	})

	test('should render Dashboard Page', () => {
		router.handlePageChange()
		expect($root.innerHTML).toBe('<div>dashboard</div>')
	})
})
