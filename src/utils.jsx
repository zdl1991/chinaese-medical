

const geUrlParams = (names) => {
    const params = new URLSearchParams(window.location.search)
    const result = {}
    names.forEach((name) => {
        result[name] = params.get(name)
    })
    return result
}


export { geUrlParams }