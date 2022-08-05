<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools :isRoot="true" :treeNode="company"></TreeTools>
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps">
          <template v-slot="{ data }">
            <TreeTools :treeNode="data"></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import {getDeptsApi} from "@/api/department";
import { transListToTree } from '@/utils'
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
    };
  },

  components: {
    TreeTools,
  },

  created() {
    this.loadDepts();
  },

  methods: {
    async loadDepts() {
      const res = await getDeptsApi();
      console.log(res);
      this.treeData = transListToTree(res.depts,'')
    },
  },
};
</script>

<style scoped lang="less"></style>
