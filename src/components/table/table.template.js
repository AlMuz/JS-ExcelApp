const CODES = {
    A: 65,
    Z: 90
}

// creating editable cell
function createCell(params = null) {
    return `<div class="row-cell" contenteditable></div>`
}   

// creating column header with letter
function createColumn(letter) {
    return `
        <div class="column">${letter}</div>
    `
}

// creating row with index and content
function createRow(content, index = '') {
    return `
        <div class="row">
            <div class="row-info">${index}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

// from charcode to latin thing
// in params skipping all except index
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    // storing latin alphabet difference here
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    // formating table header
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColumn)
        .join('')
    
    rows.push(createRow(cols))

    // for rowsCount formatting data cells with index
    for (let index = 1; index <= rowsCount; index++) {
        const dataCells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('')
            
        rows.push(createRow(dataCells, index))
    }
    return rows.join('')
}