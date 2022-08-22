import { login,getUserInfoApi,getUserDetail } from "@/api/user"
import {setTokentime} from '@/utils/auth'
import { resetRouter } from "@/router"

export default {
  namespaced: true,
  state: {
    token:'',
    userInfo:{}
  },
  mutations: {
    setToken(state,payload){
      state.token = payload
    },
    setUserInfo(state,payload){
      state.userInfo = payload
    }
  },
  actions: {
    // 登录获取token
    async getToken(context,payload){
      const res=await login(payload)
      // console.log(res);
      context.commit('setToken',res)
      // 调用登录成功，存token的时间戳
      setTokentime()
    },

    // 获取用户信息
    async getUserInfo(context){
      // 基本信息
      const userBaseInfo = await getUserInfoApi()
      // 详细信息
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo',{...userBaseInfo,...userInfo})
      // actions 中可以通过return将数据传出去，类似then中的return
      return userBaseInfo
    },
    // 退出 
    logout(context){
      context.commit('setToken','')
      context.commit('setUserInfo','')
      resetRouter()
      // { root: true } context 相当于全局的context
      context.commit('permission/setRoutes', [], { root: true })
    }
  }
}
