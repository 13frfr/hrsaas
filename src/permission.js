import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例

// 路由(全局)前置守卫
// 会在所有路由进入前触发
const witeList=['/login','/404']
router.beforeEach((to, from, next) => {
  // 进行了权限控制
  // 调用了next进入该路由，如果没有调用则无进入
  const token=store.state.user.token
  if(token){
    if(!store.state.user.userInfo.userId){
      // 获取用户信息
      store.dispatch('user/getUserInfo')  
    }
    
    if(to.path==='/login'){
      // 是否进入登录小
      // 1.1是跳到省页
      next('/')
    } else{
      // 1.2不是直接进入
      next()
    }
  } else{
    // 2.未登录
// 访问的是否在白名单（未登录也能访问的页面
    const isCludes=witeList.includes(to.path)
    if(isCludes){
      // 2.1在白名单放行
      next()
    } else{
      // 2.2不在白名单跳到登录页
      next('/login')
    }
  }
  
})

