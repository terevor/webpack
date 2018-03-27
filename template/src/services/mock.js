import router from '@/router'

const MOCK = {
    invoke(params) {
        router.push('/' + params.url)
    }
}

export default {
    run(method, params) {
        const m = MOCK[method]
        if (m) {
            return JSON.stringify(m(params))
        }
        return ''
    }
}
