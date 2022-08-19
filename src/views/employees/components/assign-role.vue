<!-- 分配角色 -->
<template>
  <el-dialog @open="onOpen" @close="close" title="分配角色" :visible="visible">
    <el-checkbox-group v-model="checkList">
      <!-- label:渲染name -->
      <!-- 会记录选中值id -->
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        <!-- 插槽也可以用于渲染 -->
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="assignRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from "@/api/role";
import { getUserDetail } from "@/api/user";
import { assignRoles } from "@/api/employees";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      checkList: ["A"],
      roles: [],
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    employeesId: {
      type: String,
      required: true,
    },
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    // 获取角色列表
    async getRolesList() {
      const { rows } = await getRolesApi();
      //   console.log(rows);
      this.roles = rows;
    },
    // 监听对话框打开
    onOpen() {
      this.getRolesList();
      this.getEmployeesRoles();
    },
    // 获取员工角色
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetail(this.employeesId);
    //   console.log(roleIds);
      this.checkList = roleIds;
    },
    async assignRoles() {
        if(!this.checkList.length) return this.$message.error('请选择角色')
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList,
      });
      this.$message.success('分配成功')
      this.close()
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
};
</script>
<style scoped></style>
