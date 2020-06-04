import { $ } from '@core/DOM'
import { range } from '@/core/utils'

export function onMousedown($root, event) {
    if (event.target.dataset.resize) {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const type = $resizer.data.resize
        const sideProp = type === 'col' ? 'bottom' : 'right'
        let value

        $resizer.css({
            opacity: 1,
            [sideProp]: '-2000px'
        })

        document.onmousemove= (e) => {
            if (type === 'col') {
                const delta = e.pageX - coords.right
                value = coords.width + delta
                $resizer.css({right: -delta + 'px'})
            } else {
                const delta = e.pageY - coords.bottom
                value = coords.height + delta
                $resizer.css({bottom: -delta + 'px'})
            }
        }
        
        document.onmouseup = () => {
            document.onmouseup = null
            document.onmousemove = null

            if (type === 'col') {
                $parent.css({width: value + 'px'})
                $root.findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach(el => el.style.width = value + 'px')
            } else {
                $parent.css({height: value + 'px'})
            }
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    }
}

export function onClick($root, selection, event) {
    // if data-id is setted
    if (event.target.dataset.id) {
        const $cell = $(event.target)

        // if user selected cell with shift
        if (event.shiftKey) {
            // target cell
            const target = $cell.id(true)

            // currently selected cell
            const current = selection.current.id(true)

            // range of cols
            const cols = range(current.col, target.col)

            // range of rows
            const rows = range(current.row, target.row)

            const ids = cols.reduce((acc, col) => {
                rows.forEach((row) => acc.push(`${row}:${col}`))
                return acc
            }, [])

            // getting all elements from IDS
            const $cells = ids.map((id) => $root.find(`[data-id="${id}"]`))
            selection.selectGroup($cells)
        } else {
            selection.select($cell)
        }
    }
}