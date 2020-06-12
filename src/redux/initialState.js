import { storage } from '@core/utils'
import { defaultStyles  } from '../constants'

const defaultState = {
	rowState: {},
	colState: {},
	dataState: {},
	currentText: '',
	currentStyles: defaultStyles 
}

// if there is empty localStorage - will be selected defaultState
export const initialState = storage('excel-state')
	? storage('excel-state')
	: defaultState
