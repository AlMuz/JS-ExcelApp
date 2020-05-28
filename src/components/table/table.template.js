const CODES = {
    A: 65,
    Z: 90
}


function createColumn(col) {
    return `
        <div class="column">${col}</div>
    `
}

function createRow(content = '') {
    return `
        <div class="row">
            <div class="row-info"></div>
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
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColumn)
        .join('')
    
    rows.push(createRow(cols))

    for (let index = 0; index < rowsCount; index++) {
        rows.push(createRow())
        
    }
    return rows.join('')
}