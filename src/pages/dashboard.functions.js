import { storage } from '@core/utils'

export function createRecordsTable() {
	const keys = getAllKeys()
	console.log(keys)

	if (!keys.length) {
		return `<p>There are no any created tables</p>`
	}

	return `
    <div class="dashboard__list-header">
        <span>Title</span>
        <span>Last open date</span>
    </div>
    <ul class="dashboard__list">
        ${keys.map(toHTML).join('')}
    </ul>
    `
}

function getAllKeys() {
	const keys = []

	for (let index = 0; index < localStorage.length; index++) {
		const key = localStorage.key(index)
		if (!key.includes('excel')) {
			continue
		}
		keys.push(key)
	}

	return keys
}

function toHTML(key) {
	const { tableTitle } = storage(key)
	const id = key.split(':')[1]

	return `
        <li class="dashboard__record">
            <a href="#excel/${id}">${tableTitle}</a>
            <strong>12.12.2021</strong>
        </li>
    `
}