<!--  -->
<template>
  <div style="margin: 0 8px" >
    <svg-icon @click="onFullScreen" className="fullscreen" iconClass="fullscreen" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
    name:"FullScreen",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onFullScreen(){
        if(screenfull.isEnabled){
            screenfull.toggle()
        }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
};
</script>
<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
