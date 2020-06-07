/* eslint-disable no-unreachable */
import { $ } from '@core/DOM'
import { range } from '@/core/utils'

// resizing of cols and rows
export function onMousedown(event, $root) {
	return new Promise((resolve) => {
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

			document.onmousemove = (e) => {
				if (type === 'col') {
					const delta = e.pageX - coords.right
					value = coords.width + delta
					$resizer.css({ right: -delta + 'px' })
				} else {
					const delta = e.pageY - coords.bottom
					value = coords.height + delta
					$resizer.css({ bottom: -delta + 'px' })
				}
			}

			document.onmouseup = () => {
				document.onmouseup = null
				document.onmousemove = null

				if (type === 'col') {
					$parent.css({ width: value + 'px' })
					$root
						.findAll(`[data-col="${$parent.data.col}"]`)
						.forEach((el) => (el.style.width = value + 'px'))
				} else {
					$parent.css({ height: value + 'px' })
				}

				resolve({
					value,
					id: type === 'col' ? $parent.data.col : null
				})

				$resizer.css({
					opacity: 0,
					bottom: 0,
					right: 0
				})
			}
		}
	})
}

// on cells selections
export function onClick(event, $root, selection) {
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

// move selected cell according on pressed button
export function onKeydown(event, $root, selection) {
	const keys = [
		'Enter',
		'Tab',
		'ArrowLeft',
		'ArrowRight',
		'ArrowDown',
		'ArrowUp'
	]
	const { key } = event

	if (keys.includes(key) && !event.shiftKey) {
		event.preventDefault()

		const id = selection.current.id(true)
		const $next = $root.find(nextSelector(key, id))
		selection.select($next)
		return $next
	}
}

function nextSelector(key, { col, row }) {
	// col starts from 0
	const MIN_VALUE_COL = 0
	// row starts from 1
	const MIN_VALUE_ROW = 1
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++
			break
		case 'Tab':
		case 'ArrowRight':
			col++
			break
		case 'ArrowUp':
			row = row - 1 < MIN_VALUE_ROW ? MIN_VALUE_ROW : row - 1
			break
		case 'ArrowLeft':
			col = col - 1 < MIN_VALUE_COL ? MIN_VALUE_COL : col - 1
			break
		default:
			break
	}

	return `[data-id="${row}:${col}"]`
}
