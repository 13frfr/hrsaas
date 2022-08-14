import request from '@/utils/request'

/**
 * 登录请求
 * @param {Object} data mobile password
 * @returns promise
 */
export function login(data) {
    return request({
        url:'/sys/login',
        method: 'POST',
        data
    })
}

/**
 * 获取用户信息
 * @returns promise
 */
export function getUserInfoApi() {
    return request({
        url:'/sys/profile',
        method: 'POST',
    })
}

/**
 * 根据用户id获取用户详细信息
 * @param {String} id 用户id
 * @returns promise
 */
export function getUserDetail(id) {
    return request({
        url:'/sys/user/'+id
    })
}

/** *
 *
 * 保存员工的基本信息
 * **/
 export function saveUserDetailById(data) {
    return request({
      url: `/sys/user/${data.id}`,
      method: 'put',
      data
    })
  }
