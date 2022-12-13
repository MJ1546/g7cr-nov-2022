console.log('registered...and ready to work')
let cacheData = 'appV1'
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheData)
            .then(
                (cache) => {
                    cache.addAll([
                        '/static/js/bundle.js',
                        '/static/js/vendors~main.chunk.js',
                        '/static/js/main.chunk.js',
                        '/index.html',
                        '/',
                        "/users"
                    ])
                }, (e) => {
                    console.log(e)
                })
    )
})

this.addEventListener('fetch', (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                console.log(event.request)
                if (resp)
                    return resp

                let requestUrl = event.request.clone()
                fetch(requestUrl)
            })
        )
    }
})