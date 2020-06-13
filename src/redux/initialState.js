import { storage } from '@core/utils'
import { defaultStyles, defaultTableTitle } from '../constants'

const defaultState = {
	rowState: {},
	colState: {},
	dataState: {},
	stylesState: {},
	currentText: '',
	tableTitle: defaultTableTitle,
	currentStyles: defaultStyles 
}

const normalize = (state) => ({
	...state,
	currentStyles: defaultStyles,
	currentText: ''
})

// if there is empty localStorage - will be selected defaultState
export const initialState = storage('excel-state')
	? normalize(storage('excel-state'))
	: defaultState
