export default function register() {
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(swUrl).then(
            (resp) => console.log(resp),
            (e) => console.log(e)
        )
    } else {
        console.log('sw not present..older browser')
    }
}