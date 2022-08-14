<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="showAdd"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <!-- 使用插槽，因为时间格式化，不止局限于表格 -->
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#DCDFE6"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onRemove(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :page-size="pages.size"
            :current-page="pages.page"
            :total="total"
            @current-change="changeChange"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 添加员工组件 -->
    <add-employees
      @add-success="getEmployeesList"
      :visible.sync="showAddEmployees"
    ></add-employees>
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployee } from "@/api/employees";
import employees from "@/constant/employees";
import AddEmployees from "./components/add-employees.vue";
export default {
  data() {
    return {
      employees: [],
      pages: {
        page: 1,
        size: 5,
      },
      total: 0,
      showAddEmployees: false,
    };
  },

  created() {
    this.getEmployeesList();
  },
  components: {
    AddEmployees,
  },

  methods: {
    async getEmployeesList() {
      const { rows, total } = await getEmployeesInfoApi(this.pages);
      this.employees = rows;
      // console.log(this.employees);
      this.total = total;
    },
    changeChange(val) {
      this.pages.page = val;
      this.getEmployeesList();
    },
    formatFormOfEmployment(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue);
      return findItem ? findItem.value : "未知";
    },
    async onRemove(id) {
      await this.$confirm("是否删除该员工？");
      await delEmployee(id);
      this.$message.success("删除员工成功");
      this.getEmployeesList();
    },
    showAdd() {
      this.showAddEmployees = true;
    },
  },
};
</script>

<style scoped lang="less"></style>
