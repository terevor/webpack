import wechat from 'weixin-js-sdk'

export default {
    install(vue) {
        if (!vue.$wechat) {
            vue.$wechat = wechat
        }

        vue.mixin({
            created: function() {
                this.$wechat = vue.$wechat
            }
        })
    }
}
