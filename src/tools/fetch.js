export const fetchData = async (url, setData) => {
    const response = await fetch(url)
    if (response.status === 200) {
        const data = await response.json()
        setData(data)
    }
}
