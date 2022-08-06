import request from '@/utils/request'

/**
 * 获取组织架构的数据
 * @returns promise
 */
export function getDeptsApi(){
    return request({
        url: '/company/department'
    })
}

/**
 * 删除部门
 * @param {*} id 要删除的部门id
 * @returns promise
 */
export function delDeptsApi(id){
    return request({
        url: '/company/department/' +id,
        method: 'DELETE',
    })
}

/**
 * 新增部门
 * @returns data
 * code	部门编码，同级部门不可重复	
 * introduce 介绍	
 * manager	负责人名称	
 * name	部门名称	
 * pid	父级部门ID
 */
export function addDeptApi(data){
    return request({
        url:'/company/department',
        method: 'POST',
        data
    })
}
