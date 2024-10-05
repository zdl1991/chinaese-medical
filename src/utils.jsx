
// 取URL上参数
const geUrlParams = (names) => {
    const params = new URLSearchParams(window.location.search)
    const result = {}
    names.forEach((name) => {
        result[name] = params.get(name)
    })
    return result
}

// 特殊字符转换为十六进制转义序列
const escapeHtml = (v) => {
    let escapedStr = v.replace(/&/g, '&#x26;')
        .replace(/</g, '&#x3C;')
        .replace(/>/g, '&#x3E;')
        .replace(/"/g, '&#x22;')
        .replace(/'/g, '&#x27;');
    return escapedStr
}
// 反转义
const unEscapeHtml = (v) => {
    let escapedStr = v.replace(/&#x26;/g, `&`)
        .replace(/&#x3C;/g, `<`)
        .replace(/&#x3E;/g, `>`)
        .replace(/&#x22;/g, `"`)
        .replace(/&#x27;/g, `'`);
    return escapedStr
}

export { geUrlParams, escapeHtml, unEscapeHtml }