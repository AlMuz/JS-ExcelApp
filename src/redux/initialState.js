import { defaultStyles, defaultTableTitle } from '../constants'
import { clone } from '@core/utils'

const defaultState = {
	rowState: {},
	colState: {},
	dataState: {},
	stylesState: {},
	currentText: '',
	tableDate: new Date().toJSON(),
	tableTitle: defaultTableTitle,
	currentStyles: defaultStyles
}

const normalize = (state) => ({
	...state,
	currentStyles: defaultStyles,
	currentText: ''
})

export function normalizeInitalState(state) {
	return state ? normalize(state) : clone(defaultState)
}
