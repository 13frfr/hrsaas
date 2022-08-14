import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入抽离的自定义指令
import * as directives from '@/directives'
// 组件
import components from '@/components'
// 时间过滤器
import * as filters from '@/filters'


// 遍历引入的自定义指令（自定义指令可能有多个）
for(let key in directives){
  Vue.directive(key,directives[key])
}
// 统一注册组件
Vue.use(components)
// 统一注册过滤器
for(let key in filters) {
  Vue.filter(key, filters[key])
}


// mock假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 注册 ElementUI
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 关闭生产提示
Vue.config.productionTip = false





new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
