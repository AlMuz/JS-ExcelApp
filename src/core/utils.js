export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }

    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
	if (start > end) {
		[end, start] = [start, end]
	}
	return new Array(end - start + 1)
		.fill('')
		.map((_, index) => start + index)
}

export function storage(key, data) {
	if (!data) {
		return JSON.parse(localStorage.getItem(key))
	}

	localStorage.setItem(key, JSON.stringify(data))
}


export function isEqual(first, second) {
	if (typeof first === 'object' && typeof second === 'object') {
		return JSON.stringify(first) === JSON.stringify(second)
	}
	return first === second
}

export function camelToDashCase(str) {
	return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}