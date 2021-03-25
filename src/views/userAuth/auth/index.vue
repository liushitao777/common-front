<template>
  <div class="tabs roleManage">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;">
      <el-breadcrumb-item>
        <img style="width: 16px;vertical-align: middle;margin-right: 5px" src="@/assets/indexPage/location.png"> 系统管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span style="font-weight:600;">
          角色管理
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-col>
        <el-form ref="form" :inline="true" :model="form" label-width="80px" size="small" class="searchLine">
          <el-form-item label="角色名称">
            <el-input v-model="form.roleName" class="searchItemWidth" size="small" placeholder="请输入角色名称" clearable />
          </el-form-item>
          <!-- <el-form-item label="用户名">
            <el-input v-model="form.userName" size="small" placeholder="请输入用户名" class="searchItemWidth"/>
          </el-form-item> -->
        </el-form>
      </el-col>
      <el-col style="margin-bottom:10px;">
        <el-button v-if="btnList.some(item=>item.resName=='新增角色')" type="primary" icon="el-icon-plus" size="small" @click="addNewRole">
          新增角色
        </el-button>
        <el-button v-if="btnList.some(item=>item.resName=='删除')" type="danger" size="small" @click="deleteRole">
          删除
        </el-button>
        <el-button size="small" style="float:right;margin-left:10px;" @click="reset">
          重置
        </el-button>
        <el-button type="primary" icon="el-icon-search" size="small" style="float:right;" @click="getList">
          查询
        </el-button>
      </el-col>
    </el-card>
    <el-table ref="table" v-loading="loading" :data="tableData" size="small" tooltip-effect="dark" stripe border style="width: 100%; margin-top:10px;"
      max-height="550" @selection-change="handleSelectionChange">
      <el-table-column type="selection" :resizable="false" width="55" />
      <el-table-column label="角色名称" prop="roleName" :resizable="false" width="200" />
      <el-table-column label="权限说明" :resizable="false" prop="orgName">
        <template slot-scope="scope">
          <div class="textOverflow">{{
            scope.row.resourcesLsit.join(',')
          }}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :resizable="false" width="100" label="操作">
        <template slot-scope="scope">
          {{
            scope.row.state === '0' ? '已删除' : '使用中'
          }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :resizable="false" width="100" label="操作">
        <template slot-scope="scope">
          <span v-if="btnList.some(item=>item.resName=='编辑')" class="btn" @click="changeRole(scope.row)">修改</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogFormVisible" width="80%" class="addNewRole" @close="cancelSubmit">
      <div class="addNewRole">
        <el-row style="background:#f5f8ff; color:#3977F3; line-height:40px; padding-left:10px; font-size:16px;">
          角色名称
        </el-row>
        <div style="min-height:100px; margin-left:10px; padding-top:20px;">
          角色名称
          <el-input v-model="roleName" placeholder="请输入角色名称" size="small" style="width:250px; margin-left:10px;" />
        </div>
        <el-row style="background:#f5f8ff; color:#3977F3; line-height:40px; padding-left:10px;  font-size:16px;">
          权限选择
        </el-row>
        <div class="authority">
          <el-tree v-for="(item, idx) in roleData" :key="idx" :ref="'roleLine' + idx" class="tree" :data="item"
            show-checkbox node-key="id" default-expand-all :props="defaultProps" />
        </div>
      </div>
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
  // import homeApi from '../../../api/homeApi'
  import authorityApi from '../../../api/authority'
  export default {
    name: "RoleManage",
    data: () => ({
      btnList: JSON.parse(window.localStorage.getItem('btnList')),
      tableData: [],
      form: {
        roleName: ''
      },
      selection: [],
      dialogFormVisible: false,
      rules: {},
      roleName: '',
      title: '新增角色',
      roleData: [],
      roleId: '',
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }),
    mounted() {
      this.getMenus()
      this.getList()
    },
    methods: {
      getMenus() {
        authorityApi.loadAllUserMenus({
          includeButtons: true
        }).then(res => {
          if (res.data.resultCode === 0) {
            this.roleData = res.data.data.back.map(item => ([item]))
          }
        })
      },
      getList() {
        authorityApi.roleList({
          roleName: this.form.roleName,
          page: 1,
          limit: 9999
        }).then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data.list
          }
        })
      },
      addNewRole() {
        authorityApi.loadAllUserMenus({
          includeButtons: true,
          judgeUser: false,
        }).then(res => {
          if (res.data.resultCode === 0) {
            this.roleData = res.data.data.back.map(item => ([item]))
          }
        })
        this.dialogFormVisible = true;
        this.title = '新增角色';
      },
      changeRole(data) {
        authorityApi.loadAllUserMenus({
          includeButtons: true,
          judgeUser: false,
        }).then(res => {
          if (res.data.resultCode === 0) {
            this.roleData = res.data.data.back.map(item => ([item]))
          }
        })
        this.dialogFormVisible = true;
        this.title = '修改角色';
        this.roleName = data.roleName;
        this.roleId = data.roleId;
        const checkedKeys = [];
        this.roleData.map(item => {
          const keys = this.getCheckedList(item, {})
          const choosen = []
          for (let key in keys) {
            if (data.resourcesLsit.includes(key)) {
              choosen.push(keys[key])
            }
          }
          checkedKeys.push(choosen)
        })
        this.$nextTick(() => {
          checkedKeys.map((item, idx) => {
            this.$refs['roleLine' + idx][0].setCheckedKeys(item)
          })
        })
      },
      getCheckedList(data, result) {
        data.map(item => {
          if (!item.children || item.children.length === 0) {
            result[item.name] = item.id
          } else {
            item.children.map(it => {
              result[it.name] = it.id
            })
          }
        })
        return result
      },
      deleteRole() {
        if (this.selection.length === 0) {
          this.$message.error('请选择需要删除角色')
          return
        }
        this.$confirm('是否确认删除选中角色', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          authorityApi.deleteRole({
            ids: this.selection.map(item => item.roleId)
          }).then(res => {
            if (res && res.data.code === 0) {
              this.$message.success('删除角色成功')
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
      reset() {
        this.form.roleName = ''
        this.getList()
      },
      handleSelectionChange(selection) {
        this.selection = selection
      },
      cancelSubmit() {
        this.dialogFormVisible = false
        this.clearCheckedKeys()
      },
      clearCheckedKeys() {
        this.roleData.map((item, idx) => {
          let target = this.$refs['roleLine' + idx][0].setCheckedKeys([])
        })
        this.roleName = ''
        if (this.roleId) {
          this.roleId = ''
        }
      },
      addSubmit() {
        if (!this.roleName) {
          this.$message.error('请输入角色名称！')
          return
        }
        let resourceIds = []
        this.roleData.map((item, idx) => {
          let target = this.$refs['roleLine' + idx][0].getCheckedKeys()
          if (target && target.length > 0) {
            resourceIds = [
              ...resourceIds,
              ...target
            ]
          }
        })
        if (resourceIds.length === 0) {
          this.$message.error('请选择角色菜单权限')
          return
        }
        this.loading = true
        let params = {
          roleName: this.roleName,
          resourceIds: resourceIds
        }
        if (this.roleId) {
          params.id = this.roleId
        }
        authorityApi.addNewRole(params).then(res => {
          this.loading = false
          if (res.data.code === 0) {
            if (this.roleId) {
              this.$message.success('修改角色成功')
            } else {
              this.$message.success('新增角色成功')
            }
            this.dialogFormVisible = false
            this.clearCheckedKeys()
            this.getList()
          }
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .roleManage {
    padding: 10px 20px;

    .btn {
      color: #409EFF;
      cursor: pointer;
    }

    .newRoleContent {
      padding: 10px;
    }

    .addNewRole {
      .authority {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;

        .tree {
          width: 150px;
        }
      }
    }

    .el-form--inline .el-form-item {
      margin-bottom: 1px !important;
    }
  }
</style>
