export function getItem(key) {
    const str = localStorage.getItem(key)
    return str ? JSON.parse(str) : null
}

export function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function removeItem(key) {
    localStorage.removeItem(key)
}