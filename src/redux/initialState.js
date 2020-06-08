import { storage } from '@core/utils'

const defaultState = {
	rowState: {},
	colState: {}
}

// if there is empty localStorage - will be selected defaultState
export const initialState = storage('excel-state')
	? storage('excel-state')
	: defaultState
