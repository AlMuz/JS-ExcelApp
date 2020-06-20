import { Store } from '../../src/redux/Store'

const initialState = {
	count: 0
}

const reducer = (state = initialState, action) => {
	if (action.type === 'ADD') {
		return { ...state, count: state.count + 1 }
	}

	return state
}

describe('Store test', () => {
	let storeClass
	let handler

	beforeEach(() => {
		storeClass = new Store(reducer, initialState)
		handler = jest.fn()
	})

	test('should return store object', () => {
		expect(storeClass).toBeDefined()
		expect(storeClass.dispatch).toBeDefined()
		expect(storeClass.subscribe).toBeDefined()
		expect(storeClass.getState).not.toBeUndefined()
	})

	test('should return object as a state', () => {
		expect(storeClass.getState()).toBeInstanceOf(Object)
	})

	test('should return default state', () => {
		expect(storeClass.getState()).toEqual(initialState)
	})

	test('should change state if action exists', () => {
		storeClass.dispatch({ type: 'ADD' })
		expect(storeClass.getState().count).toBe(1)
	})

	test('should not change state', () => {
		storeClass.dispatch({ type: 'NOT_EXISTS' })
		expect(storeClass.getState().count).not.toBe(1)
	})

	test('should call subscriber function', () => {
		storeClass.subscribe(handler)
		storeClass.dispatch({ type: 'ADD' })

		expect(handler).toHaveBeenCalled()
		expect(handler).toHaveBeenCalledWith(storeClass.getState())
	})

	test('should not call subscribe if its unsubscribed', () => {
		const sub = storeClass.subscribe(handler)

		sub.unSubscribe()
		storeClass.dispatch({ type: 'ADD' })

		expect(handler).not.toHaveBeenCalled()
	})

	test('should dispatch in async way', () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				storeClass.dispatch({ type: 'ADD' })
			}, 500)

			setTimeout(() => {
				expect(storeClass.getState().count).toBe(1)
				resolve()
			}, 1000)
		})
	})
})
