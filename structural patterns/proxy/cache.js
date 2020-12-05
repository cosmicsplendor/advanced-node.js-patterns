const fetchData = async url => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const fetchDataProxy = (function() {
    const cache = {}
    return async url => {
        if (!cache[url]) {
            cache[url] = await fetchData(url)
        }
        return cache[url]
    }
}())