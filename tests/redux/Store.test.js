import { Store } from '../../src/redux/Store'

describe('Store test', () => {
	test('to be defined', () => {
		const storeClass = new Store(() => {}, {})
		expect(storeClass).toBeDefined()
	})
})
