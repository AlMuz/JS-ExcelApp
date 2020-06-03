const CODES = {
    A: 65,
    Z: 90
}

// creating editable cell
function createCell(row) {
    return function(_, index) {
        return `<div 
                class="row-cell" 
                contenteditable 
                data-col="${index}" 
                data-id="${row}:${index}"
            ></div>`
    }
}   

// creating column header with letter
function createColumn(letter, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${letter}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

// creating row with index and content
function createRow(content, index = '') {
    const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
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
            // .map((_, col) => createCell(index, col))
            .map(createCell(index))
            .join('')
            
        rows.push(createRow(dataCells, index))
    }
    return rows.join('')
}