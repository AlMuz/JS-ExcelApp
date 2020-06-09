import { TABLE_RESIZE, CHANGE_TEXT } from "./types"

export function rootReducer(state, action) {
	let prevState
	let field
	switch (action.type) {
		case TABLE_RESIZE:
			// if its col - name colState
			// else rowState
			field = action.data.type === 'col' ? 'colState' : 'rowState'

			// if there is empty prevState for this field - empty object
			prevState = state[field] || {}
			prevState[action.data.id] = action.data.value
			return {...state, [field]: prevState} // id, value
		case CHANGE_TEXT:
			prevState = state['dataState'] || {}
			prevState[action.data.id] = action.data.value
			return {...state, currentText: action.data.value, dataState: prevState}
		default:
			return state
	}
}
