import enLocale from 'element-ui/lib/locale/lang/en'
export default{
    name:'en',
    dashboard:{
        calendar:'calendar',
        progress:'progress'
    },
    ...enLocale,
     route: {
          首页: 'dashboard',
          组织架构: 'departments',
          员工: 'employees',
          权限管理: 'permission',
          工资: 'salarys',
          公司设置: 'setting',
          社保: 'social',
          审批: 'approvals',
          考勤: 'attendances'
         }
   }