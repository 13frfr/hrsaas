<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button
            @click="addDialogVisible = true"
            type="primary"
            v-if="isHas(point.roles.add)"
            >新增角色</el-button
          >

          <!-- table -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button
                  size="small"
                  type="success"
                  @click="showRigthsDialog(row.id)"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination
            :page-sizes="[3, 5, 10, 20]"
            layout="sizes,prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 添加角色对话框 -->
    <el-dialog
      @close="dialogClose"
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormRules"
        ref="form"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button @click="onAddClose" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 给角色分配权限 -->
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRigthsDialog"
      width="50%"
      destroy-on-close
      @close="setRightsClose"
    >
      <el-tree
        default-expand-all
        show-checkbox
        :data="permissions"
        :props="{ label: 'name' }"
        :default-checked-keys="defaultCheckbox"
        node-key="id"
        ref="perTree"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRigthsDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi, getRolesInfo, assignPerm } from "@/api/role";
import { getCompanyInfoApi } from "@/api/setting";
import { getPermissionList } from "@/api/permission";
import { transListToTree } from "@/utils";
import MixinPermission from "@/mixins/permission";
// import { getRolesInfo } from "@/api/role";
export default {
  name: "setting",
  mixins: [MixinPermission],
  data() {
    return {
      activeName: "first",
      tableData: [],
      total: 0,
      pageSize: 2,
      page: 1,
      addDialogVisible: false,
      addRoleForm: {
        name: "",
        description: "",
      },
      addRoleFormRules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
      },
      companyInfo: {},
      setRigthsDialog: false,
      permissions: [],
      defaultCheckbox: [], //分配权限
      roleId: "",
    };
  },

  created() {
    this.getRoles();
    this.getCompanyInfo();
    this.getPermissions();
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      });
      this.tableData = rows;
      this.total = total;
    },
    currentChange(val) {
      this.page = val;
      this.getRoles();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRoles();
    },
    // 点击取消
    onClose() {
      this.addDialogVisible = false;
    },
    async onAddClose() {
      await this.$refs.form.validate();
      // console.log("表单校验成功");
      await addRolesApi(this.addRoleForm);
      this.$message.success("添加成功");
      this.addDialogVisible = false;
      this.getRoles();
    },
    // 监听对话框关闭
    dialogClose() {
      this.$refs.form.resetFields();
      this.addRoleForm.description = "";
    },
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      );
      this.companyInfo = res;
    },
    async showRigthsDialog(id) {
      // console.log(id);
      this.roleId = id;
      this.setRigthsDialog = true;
      const res = await getRolesInfo(id);
      // console.log(res);
      this.defaultCheckbox = res.permIds;
    },
    // 获取权限列表
    async getPermissions() {
      const res = await getPermissionList();
      // console.log(res);
      const treePermisson = transListToTree(res, "0");
      console.log(treePermisson);
      this.permissions = treePermisson;
    },
    // 监听设置权限对话框关闭
    setRightsClose() {
      this.defaultCheckbox = [];
    },
    async onSaveRights() {
      await assignPerm({
        id: this.roleId,
        permIds: this.$refs.perTree.getCheckedKeys(),
      });
      this.$message.success("分配成功");
      this.setRigthsDialog = false;

      // console.log(this.roleId);
      // console.log(this.$refs.perTree.getCheckedKeys());
    },
  },
};
</script>

<style scoped lang="less"></style>
