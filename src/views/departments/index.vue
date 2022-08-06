<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <TreeTools
          @add="dialogVisible = true"
          :isRoot="true"
          :treeNode="company"
        ></TreeTools>
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools
              @add="showAddDept"
              :treeNode="data"
              @remove="loadDepts"
              @edit="showEdit"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹层 -->
    <AddDept
      ref="addDept"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
      @add-success="loadDepts"
    ></AddDept>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import { getDeptsApi } from "@/api/department";
import { transListToTree } from "@/utils";
import AddDept from "./components/add-dept.vue";
export default {
  data() {
    return {
      treeData: [
        { name: "总裁办", children: [{ name: "董事会" }] },
        { name: "行政部" },
        { name: "人事部" },
      ],
      defaultProps: {
        label: "name", // 将data想显示的名字显示到树形
      },
      company: { name: "传智教育", manager: "负责人" },
      dialogVisible: false,
      currentNode: {},
      loading: false,
    };
  },

  components: {
    TreeTools,
    AddDept,
  },

  created() {
    this.loadDepts();
  },

  methods: {
    // 获取部门列表
    async loadDepts() {
      this.loading= true
      const res = await getDeptsApi();
      // console.log(res);
      this.treeData = transListToTree(res.depts, "");
      this.loading= false;
    },
    // 新增弹层
    showAddDept(val) {
      this.currentNode = val;
      this.dialogVisible = true;
    },
    // 编辑弹层
    showEdit(val) {
      this.dialogVisible = true;
      this.$refs.addDept.getDeptById(val.id);
    },
  },
};
</script>

<style scoped lang="less"></style>
