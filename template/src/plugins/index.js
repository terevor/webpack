export { default as axios } from './axios'
{{#if_eq mobileConfig "bridge"}}export { default as bridge } from './bridge'{{/if_eq}}
{{#if_eq mobileConfig "wxsdk"}}export { default as wechat } from './wechat'{{/if_eq}}
