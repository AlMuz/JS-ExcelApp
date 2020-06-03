export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
    }

    // selecting cell
    select($el) {
        // clearing group from selected cells
        this.clear()
        this.group.push($el)
        $el.addClass(TableSelection.className)
    }

    clear() {
        // removing classes from all cells
        this.group.forEach(($el) => $el.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup() {

    }
}