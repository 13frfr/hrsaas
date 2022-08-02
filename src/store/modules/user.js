import { login,getUserInfoApi,getUserDetail } from "@/api/user"

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
    },

    // 获取用户信息
    async getUserInfo(context){
      // 基本信息
      const userBaseInfo = await getUserInfoApi()
      // 详细信息
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo',{...userBaseInfo,...userInfo})
      // setTimeout(()=>{
      //   const res= {name:'张三'}
      // context.commit('setUserInfo',res)
      // },1000)
    }
  }
}
