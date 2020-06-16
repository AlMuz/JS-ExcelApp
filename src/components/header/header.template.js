import { defaultTableTitle } from '../../constants'

export function createHeader(state) {
	const title = state.tableTitle || defaultTableTitle
	return `
        <input type="text" class="input" value="${title}" />
        <div class="buttons">
            <div class="button" data-button="remove">
                <i class="material-icons" data-button="remove"> delete </i>
            </div>
            <a href="#" class="button">
                <i class="material-icons"> exit_to_app </i>
            </a>
        </div>
    `
}
