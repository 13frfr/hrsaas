<!-- 员工列表 -->
<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex">
        <el-col>
          <el-tag v-if="isShowLeft">
            <i :class="leftIcon"></i>
            <slot name="left-tag"/>
          </el-tag>
        </el-col>
        <el-col>
          <el-row type="flex" justify="end">
            <slot name="right"/>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PageTools",
  data() {
    //这里存放数据
    return {};
  },
  props:{
    leftIcon:{
        type: String,
        default:'el-icon-info'
    },
    isShowLeft:{
        type: Boolean,
        default:true
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
};
</script>
<style scoped></style>
