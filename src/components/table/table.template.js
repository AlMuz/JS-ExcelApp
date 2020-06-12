import { defaultStyles } from "../../constants"
import { camelToDashCase } from "@core/utils"

const CODES = {
	A: 65,
	Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24


function getWidth(colState, index) {
	return (colState[index] || DEFAULT_WIDTH) + 'px'
}


function getHeight(rowState, index) {
	return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}

function getData(dataState, index) {
	return dataState[index] || ''
}

// creating editable cell
function createCell(state, row) {
	return function (_, index) {
		const width = getWidth(state.colState, index)
		const data = getData(state.dataState, `${row}:${index}`)
		const styles = Object.keys(defaultStyles)
			.map((key) => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
			.join(';')
		
		return `<div
                class="row-cell"
                contenteditable
                data-col="${index}"
                data-id="${row}:${index}"
                style="${styles}; width:${width}"
            >${data}</div>`
	}
}

// creating column header with letter
function createColumn({ letter, index, width }) {
	return `
        <div 
            class="column" 
            data-type="resizable" 
            data-col="${index}" 
            style="width:${width}">
            ${letter}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

// creating row with index and content
function createRow(content, state, index = '') {
	const height = getHeight(state.rowState, index)
	const resizer = index
		? '<div class="row-resize" data-resize="row"></div>'
		: ''
	return `
        <div class="row" data-type="resizable" data-row="${index}" style="height:${height}">
            <div class="row-info">
                ${index}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

// from charcode to latin thing
// in params skipping all except index
function toChar(_, index) {
	return String.fromCharCode(CODES.A + index)
}

function widthFrom(state) {
	return function (letter, index) {
		return {
			letter,
			index,
			width: getWidth(state.colState, index)
		}
	}
}

export function createTable(rowsCount = 15, state) {
	// storing latin alphabet difference here
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []

	// formating table header
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(widthFrom(state))
		.map(createColumn)
		.join('')

	rows.push(createRow(cols, state))

	// for rowsCount formatting data cells with index
	for (let index = 1; index <= rowsCount; index++) {
		const dataCells = new Array(colsCount)
			.fill('')
			.map(createCell(state, index))
			.join('')

		rows.push(createRow(dataCells, state, index))
	}
	return rows.join('')
}
