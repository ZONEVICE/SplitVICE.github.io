(async () => {

    const req = await fetch('https://raw.githubusercontent.com/ZONEVICE/SplitVICE.github.io/data/redirect.json')
    const res = await req.json()

    const r = new URLSearchParams(window.location.search).get('r')

    let dynamic_url_detected = false
    
    for (const _r of res) {
        
        if (_r.key == r) {

            dynamic_url_detected = true

            window.location.href = _r.url

        }

    }

    if (dynamic_url_detected === false) {

        window.location.replace('/')

    }


})()
