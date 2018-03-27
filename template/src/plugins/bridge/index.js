import { bus } from '@/services/utils'
import mock from '@/services/mock'

// 是否开启调试模式
const isDebug = false
// 与app嵌入联调时，isMock设为false，开发浏览器调试时设为true
const isMock = false
const ua = navigator.userAgent
const isAndroid = ua.indexOf('Android') > -1
const isIOS = Boolean(
    ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
)
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
let iosVersion = ''
if (iphone && iphone[2]) {
    iosVersion = iphone[2].replace(/_/g, '.')
}

if (isDebug && !isMock) {
    console.log = function(s) {
        const t = typeof s
        s = t === 'object' ? JSON.stringify(s) : s
        bus.$emit('alert', s)
    }
}

const bridge = {
    isIOS,
    iosVersion,
    isAndroid,
    isMock,
    connect(callback) {
        if (process.env.NODE_ENV === 'development' && isMock) {
            const b = {
                callHandler(method, params, cb) {
                    cb(mock.run(method, params))
                },
                registerHandler() {}
            }
            callback(b)
            return
        }
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge)
        } else {
            if (isAndroid) {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady',
                    () => {
                        callback(window.WebViewJavascriptBridge)
                    },
                    false
                )
            }
            if (isIOS) {
                if (window.WVJBCallbacks) {
                    return window.WVJBCallbacks.push(callback)
                }
                window.WVJBCallbacks = [callback]
                const WVJBIframe = document.createElement('iframe')
                WVJBIframe.style.display = 'none'
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
                document.documentElement.appendChild(WVJBIframe)
                setTimeout(() => {
                    document.documentElement.removeChild(WVJBIframe)
                }, 0)
            }
        }
    }
}

bridge.connect(b => {
    console.log('registerHandler')
    b.registerHandler('bridgeHook', function(data, cb) {
        console.log(data)
        data = JSON.parse(data)
        bus.$emit(data.method, data.params, cb)
    })
})

export default {
    install(vue) {
        if (!vue.$bridge) {
            vue.$bridge = bridge
        }

        vue.mixin({
            created: function() {
                this.$bridge = vue.$bridge
            }
        })
    }
}
