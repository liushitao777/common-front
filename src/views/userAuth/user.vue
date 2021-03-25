<template>
  <div class="userManage">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;">
      <el-breadcrumb-item>
        <img style="width: 16px;vertical-align: middle;margin-right: 5px" src="@/assets/indexPage/location.png"> 系统管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="font-weight:600;">
          用户管理
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-col>
        <el-form ref="form" :inline="true" :model="form" label-width="80px" size="small" class="searchLine">
          <!--<el-form-item label="归属单位">-->
          <!--<el-select-->
          <!--v-model="form.orgCode"-->
          <!--size="small"-->
          <!--placeholder="请选择单位名称"-->
          <!--class="searchItemWidth"-->
          <!--filterable-->
          <!--clearable-->
          <!--disabled-->
          <!--&gt;-->
          <!--<el-option-->
          <!--v-for="(item, idx) in companyList"-->
          <!--:key="idx"-->
          <!--:label="item.companyName"-->
          <!--:value="item.companyCode"-->
          <!--/>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="用户姓名">
            <el-input v-model="form.userName" size="small" placeholder="请输入用户姓名" class="searchItemWidth" />
          </el-form-item>
          <el-form-item label="角色名称">
            <el-select v-model="form.roleCode" size="small" placeholder="请选择角色名称" class="searchItemWidth" filterable
              clearable>
              <el-option v-for="item in userTypeList" :key="item.roleId" :value="item.roleId" :label="item.roleName" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col style="margin-bottom:10px;">
        <el-button v-if="btnList.some(item=>item.resName=='新增用户')" type="primary" icon="el-icon-plus" size="small"
          @click="addNewOrg">
          新增用户
        </el-button>
        <el-button v-if="btnList.some(item=>item.resName=='删除')" type="danger" size="small" @click="deleteOrg">
          删除
        </el-button>
        <el-button size="small" style="float:right;margin-left:10px;" @click="reset">
          重置
        </el-button>
        <el-button type="primary" icon="el-icon-search" size="small" style="float:right;" @click="listSearch">
          查询
        </el-button>
      </el-col>
    </el-card>
    <el-table ref="table" v-loading="loading" :data="tableData" size="small" tooltip-effect="dark" :stripe="true"
      :border="true" style="width: 100%; margin-top:10px;" max-height="550" @selection-change="handleSelectionChange">
      <el-table-column type="selection" :resizable="false" width="55" />
      <el-table-column label="用户姓名" prop="username" :resizable="false" width="200" />
      <el-table-column label="用户权限" :resizable="false" width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          {{
            scope.row.userType && userTypeList.find(item => item.roleId === scope.row.userType) && userTypeList.find(item => item.roleId === scope.row.userType).roleName
          }}
        </template>
      </el-table-column>
      <el-table-column prop="userCode" show-overflow-tooltip :resizable="false" width="200" label="账号" />
      <!-- <el-table-column
       prop="diagModelName"
       show-overflow-tooltip
       :resizable="false"
       width="200"
       label="上级单位编码">
     </el-table-column> -->
      <!--<el-table-column-->
      <!--prop="unitName"-->
      <!--show-overflow-tooltip-->
      <!--:resizable="false"-->
      <!--width="200"-->
      <!--label="归属单位"-->
      <!--/>-->
      <!--<el-table-column-->
      <!--show-overflow-tooltip-->
      <!--prop="stationName"-->
      <!--width="200"-->
      <!--:resizable="false"-->
      <!--label="归属场站"-->
      <!--/>-->
      <el-table-column prop="phone" show-overflow-tooltip :resizable="false" width="120" label="联系电话" />
      <el-table-column prop="postscript" :resizable="false" show-overflow-tooltip label="备注" />
      <el-table-column width="200" :resizable="false" label="操作">
        <template slot-scope="scope">
          <span v-if="btnList.some(item=>item.resName=='编辑')" class="btn" @click="changeOrg(scope.row)">修改</span>
          <span v-if="!scope.row.makerUserId" class="btn" style="margin-left: 10px;" @click="setExecutor(scope.row)">设置为机库执行人</span>
          <span v-else style="margin-left: 10px;">已为机库执行人</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="pagination">
      <el-pagination background :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
        :total="total" @current-change="handleCurrentChange" />
    </el-row>
    <!-- username: ,
    userType: ,
    userCode: [
      { required: true, message: '请输入用户账号', trigger: 'blur' }
    ],
    userpwd: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    unitCode: [
      { required: true, message: '请选择单位名称', trigger: 'blur' }
    ],
    stationCode: [
      { required: true, message: '请选择场站名称', trigger: 'blur' }
    ],
    phone: [
      { required: true, validator: checkPhone, trigger: 'blur' }
    ] -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogFormVisible" width="500px" @close="cancelSubmit">
      <el-form ref="newOrg" :model="newForm" label-width="100px" style="padding-left:50px;">
        <el-form-item label="用户姓名:" prop="username" :rules="[{ required: true, message: '请输入用户姓名', trigger: 'blur' }]">
          <el-input v-model="newForm.username" size="small" placeholder="请输入用户姓名" style="width:250px;" />
        </el-form-item>
        <el-form-item label="用户权限:" prop="userType" :rules="[{ required: true, message: '请输入单位名称', trigger: 'blur' }]">
          <el-select v-model="newForm.userType" style="width:250px;" size="small" placeholder="请选择用户权限" clearable
            filterable>
            <el-option v-for="item in userTypeList" :key="item.roleId" :value="item.roleId" :label="item.roleName" />
          </el-select>
        </el-form-item>
        <el-form-item label="帐号:" prop="userCode" :rules="[{ required: true, validator:checkUserName, trigger: 'blur' }]">
          <el-input v-model="newForm.userCode" size="small" placeholder="请输入由字母数字或_组成4-16位的用户名" style="width:250px;" />
        </el-form-item>
        <el-form-item label="密码:" prop="userpwd" :rules="title === '新增用户' ? [{ required: true, message: '请输入密码', trigger: 'blur' }] : []">
          <el-input v-model="newForm.userpwd" type="password" size="small" placeholder="请输入密码" style="width:250px;" />
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone" :rules="[{ required: true, message: '请输入负责人联系电话', trigger: 'blur' }, { pattern: /^[1][3-9][0-9]{9}$/, message: '请输入格式正确的负责人联系电话' }]">
          <el-input v-model="newForm.phone" size="small" placeholder="请输入单位负责人" style="width:250px;" />
        </el-form-item>
        <el-form-item label="备注:" prop="introText">
          <el-input v-model="newForm.postscript" type="textarea" size="small" style="width:250px;" :rows="2"
            placeholder="请输入备注信息" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="small" @click="addSubmit">
          确 定
        </el-button>
        <el-button size="small" @click="cancelSubmit">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import authorityApi from "../../api/authority"
  export default {
    name: 'UserManage',
    data: () => {
      return {
        btnList: JSON.parse(window.localStorage.getItem('btnList')),
        form: {
          userName: '',
          orgCode: '1',
          roleCode: ''
        },
        companyList: [{
          'companyCode': '1',
          'companyName': '威宁能源公司'
        }], //单位列表
        stationList: [{
          'stationCode': '1',
          'stationName': '小官山光伏电站'
        }], //场站列表
        tableData: [],
        loading: false,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        dialogFormVisible: false,
        title: '新增用户',
        rules: {

        },
        newForm: {
          username: '',
          userType: '',
          userCode: '',
          userpwd: '',
          phone: '',
          postscript: ''
        },
        selection: [],
        userTypeList: [],
        tree: [],
      }
    },
    mounted() {
      this.getList();
      this.getRoleList();
    },
    methods: {
      checkUserName(rule, value, callback) {
        let reg = /^[a-zA-Z0-9_-]{4,16}$/
        if (!reg.test(value)) {
          callback(new Error('请输入由字母数字或_组成4-16位的用户名'));
        } else {
          callback()
        }
      },
      getRoleList() {
        authorityApi.roleList({}).then(res => {
          if (res && res.data.code === 0) {
            this.userTypeList = res.data.data.list;
          }
        })
      },
      listSearch() {
        this.currentPage = 1
        this.getList()
      },
      reset() {
        this.form = {
          userName: '',
          orgCode: '1',
          roleCode: ''
        }
        this.currentPage = 1
        this.getList()
      },
      deleteOrg() {
        if (this.selection.length === 0) {
          this.$message.error('请选择需要删除的用户')
          return
        }
        this.$confirm('是否确认删除选中用户', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          authorityApi.deleteUser({
            id: this.selection.map(item => item.id).join(',')
          }).then(res => {
            if (res && res.data.code === 0) {
              this.$message.success('删除用户成功')
              this.$refs.table.clearSelection()
              this.getList()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {
          console.log('取消删除')
        })
      },
      changeOrg(data) {
        this.dialogFormVisible = true
        this.title = '修改用户信息'
        this.newForm = {
          username: JSON.parse(JSON.stringify(data)).username,
          userType: JSON.parse(JSON.stringify(data)).userType,
          userCode: JSON.parse(JSON.stringify(data)).userCode,
          userpwd: '',
          id: JSON.parse(JSON.stringify(data)).id,
          phone: JSON.parse(JSON.stringify(data)).phone,
          postscript: JSON.parse(JSON.stringify(data)).postscript
        }
      },
      //设置为机库执行人
      setExecutor(data) {
        // let formData = new FormData();
        // formData.append("userId", data.id);

        authorityApi.addMakerUser({id: data.id}).then(res => {
          if (res && res.data.code === 0) {
            this.$message.success('设置成功')
            this.getList();
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      addNewOrg() {
        this.dialogFormVisible = true
        this.title = '新增用户'
      },
      clearInfo() {
        this.newForm = {
          username: '',
          userType: '',
          userCode: '',
          userpwd: '',
          phone: '',
          postscript: ''
        }
        this.$refs['newOrg'].clearValidate()
        this.getList()
      },
      addSubmit() {
        this.$refs.newOrg.validate((valid) => {
          if (valid) {
            if (this.title === '新增用户') {
              authorityApi.addNewUser(this.newForm).then(res => {
                if (res && res.data.code === 0) {
                  this.$message.success('新增用户成功')
                  this.dialogFormVisible = false
                  this.clearInfo()
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            } else {
              authorityApi.updateRole(this.newForm).then(res => {
                if (res && res.data.code === 0) {
                  this.$message.success('修改用户成功')
                  this.dialogFormVisible = false
                  this.clearInfo()
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            }

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      cancelSubmit() {
        this.dialogFormVisible = false
        this.newForm = {
          username: '',
          userType: '',
          userCode: '',
          userpwd: '',
          phone: '',
          postscript: ''
        }
      },
      getList() {
        this.loading = true
        authorityApi.userList({
          // orgCode: this.form.orgCode,
          userName: this.form.userName,
          roleId: this.form.roleCode,
          page: this.currentPage,
          limit: this.pageSize
        }).then(res => {
          this.loading = false
          if (res && res.data.code === 0) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          this.loading = false
        })
      },
      handleSelectionChange(selection) {
        this.selection = selection
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
        this.getList()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .userManage {
    padding: 10px 20px;

    .searchLine {
      .el-form-item {
        margin-bottom: 3px !important;
      }
    }

    .pagination {
      text-align: center;
      margin-top: 20px;
    }

    .btn {
      color: #409EFF;
      cursor: pointer;
    }
  }
</style>
