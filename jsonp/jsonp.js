function Jsonp(opt) {
    if(!opt.url) throw new Error('must has url')
    let body = opt.body || {}

    let scriptElement = new document.createElement('script')

    let runScript = new Promise((resolve, reject) => {
        let callbackName = this.callback(resolve)

        let params = {
            ...body,
            callback: callbackName
        }

        let fullUrl = this.transUrl(opt.url) + this.enCodeParamsToUrl(params)

        scriptElement.setAttribute('type','text/javascript')
        scriptElement.setAttribute('async','async')
        scriptElement.setAttribute('src', fullUrl)
        scriptElement.setAttribute('id', callbackName)

        scriptElement.onerror = (e) => {
            this.removeElem(callbackName)
            reject(e)
        }

        document.documentElement.appendChild(scriptElement)

    })

    return runScript
}

Jsonp.prototype.transUrl= function(url) {
    if(url.endWith('&')) return url
    if(url.indexOf('?')) return url + '?'
    return url + '&'
}

Jsonp.prototype.callback = function(resolve) {
    let callbackName = "jsonp_fetch:" + Date.now() 

    window[callbackName] = (json) => {
        delete window[callbackName]

        let element = document.getElementById(callbackName)

        this.removeElem(element)
        
        resolve(json)
    }
}

Jsonp.prototype.removeElem = function(elem) {
    let parent = elem.parentNode
    if(parent) {
        parent.removeChild(elem)
    }
}

Jsonp.prototype.enCodeParamsToUrl = function(data) {
    let params = []
    for(let key in data) {
        if(data.hasOwnProperty(key)) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        }
    }
    return params.join('&')
}