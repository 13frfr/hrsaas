// 自定义指令
export const imgError={
    // 当绑定的元素插入到dom中时
    inserted:function(el,{value}){
      // 聚焦元素
      // 监听dom img 图片加载失败事件
      el.onerror = function(){
        el.src=value
      }
    }
  }