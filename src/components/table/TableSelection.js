export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    // selecting cell
    select($el) {
        // clearing group from selected cells
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.addClass(TableSelection.className)
    }

    selectGroup($elements = []) {
        this.clear()
        this.group = $elements
        this.group.forEach(($el) => $el.addClass(TableSelection.className))
    }

    clear() {
        // removing classes from all cells
        this.group.forEach(($el) => $el.removeClass(TableSelection.className))
        this.group = []
    }
}