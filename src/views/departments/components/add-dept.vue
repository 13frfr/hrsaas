<template>
  <el-dialog
    :title="dialogTitle"
    :visible="visible"
    width="50%"
    @close="onClose"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="输入部门编码"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 100%"
          placeholder="请选择部门负责人"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  addDeptApi,
  getDeptByIdApi,
  editDeptByIdApi,
} from "@/api/department";
import { getEmployeesApi } from "@/api/employees";
export default {
  data() {
    // 检验部门是否重复
    const checkDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        // 编辑
        const { depts } = await getDeptsApi();
        const filterDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id
        );
        const isRepeat = filterDepts.some((item) => item.name === value);
        isRepeat ? callback(new Error("部门重复")) : callback();
      } else {
        // 1.判断 value是否和添加的同级部门重复（获取到同级部门）
        const isRepeat = this.currentNode.children?.some(
          (item) => item.name === value
        );
        // 2.重复 抛出错误
        // 3.没有重复 callback()
        isRepeat ? callback(new Error("部门重复")) : callback();
      }
    };
    const checkDeptCode = async (rule, value, cb) => {
      const { depts } = await getDeptsApi();
      let isRepeat;
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value);
      } else {
        isRepeat = depts.some((item) => item.code === value);
      }
      isRepeat ? cb(new Error("部门编码重复")) : cb();
    };
    return {
      formData: {
        name: "", //部门名称
        code: "", //部门编码
        manager: "", //部门负责人
        introduce: "", //部门介绍
      },
      formRules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { validator: checkDeptName, trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入部门编码", trigger: "blur" },
          { validator: checkDeptCode, trigger: "blur" },
        ],
        manager: [
          { required: true, message: "请输入部门负责人", trigger: "change" },
        ],
        introduce: [
          { required: true, message: "请输入部门介绍", trigger: "blur" },
        ],
      },
      employees: [],
    };
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.getEmployeesApi();
  },
  computed: {
    dialogTitle() {
      return this.formData.id ? "编辑部门" : "添加部门";
    },
  },

  methods: {
    // 获取员工列表/部门负责人
    async getEmployeesApi() {
      const res = await getEmployeesApi();
      // console.log(res);
      this.employees = res;
    },
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields();
      this.formData = {
        name: "", //部门名称
        code: "", //部门编码
        manager: "", //部门负责人
        introduce: "", //部门介绍
      };
    },
    // 点击添加确定
    async onSave() {
      await this.$refs.form.validate();
      try {
        if (this.formData.id) {
          // 发送编辑请求
          // console.log("编辑");
          await editDeptByIdApi(this.formData);
          this.$message.success("编辑成功");
          this.onClose();
          this.$emit("add-success");
        } else {
          // 发送添加请求
          this.formData.pid = this.currentNode.id;
          console.log(this.formData);
          console.log("表单校验成功");
          await addDeptApi(this.formData);
          this.$message.success("新增部门成功");
          this.onClose();
          this.$emit("add-success");
        }
      } catch (error) {
        this.$message.error("操作部门失败");
      }
    },
    async getDeptById(id) {
      // console.log(id);
      this.formData = await getDeptByIdApi(id);
    },
  },
};
</script>

<style scoped></style>
