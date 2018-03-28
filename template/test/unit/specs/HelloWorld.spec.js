import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
    const wrapper = mount(HelloWorld)

    it('should render correct contents', () => {
        expect(wrapper.find('.hello h1').text())
            {{#if_eq runner "karma"}}.to.equal('Welcome to Your Vue.js App'){{/if_eq}}{{#if_eq runner "jest"}}.toEqual('Welcome to Your Vue.js App'){{/if_eq}}
    })
})
