import { defaultTableTitle } from "../../constants"

export function createHeader(state) {
    const title = state.tableTitle || defaultTableTitle
    return `
        <input type="text" class="input" value="${title}" />
        <div class="buttons">
            <div class="button">
                <i class="material-icons"> delete </i>
            </div>
            <div class="button">
                <i class="material-icons"> exit_to_app </i>
            </div>
        </div>
    `
}