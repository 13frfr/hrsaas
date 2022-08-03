import Cookies from 'js-cookie'
// 封装了操作token的方法
// 做做tkoen的原生方法比较麻烦

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取登录成功，存token的时间戳
export function setTokentime(){
  Cookies.set('tokenTime', Date.now())
}
// 获取存在Cookies  token的时间戳
export function getTokentime(){
  return Cookies.get('tokenTime')
}
