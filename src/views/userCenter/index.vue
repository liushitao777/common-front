<template>
  <div class="userCenter1">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;">
      <el-breadcrumb-item>
        <img style="width: 16px;vertical-align: middle;margin-right: 5px" src="@/assets/indexPage/location.png"> <span
          style="font-weight:600;">
          个人中心
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="height: calc(100vh - 102px); padding: 0;">
      <el-row class="userLine">
        <span>帐号：</span>{{ userInfo.userCode }}
      </el-row>
      <el-row class="userLine">
        <span>密码：</span>
        <span class="btn" @click="changePwd">修改</span>
      </el-row>
      <el-row class="userLine">
        <span>角色权限：</span>
        {{ userInfo.userRoles && userInfo.userRoles[0] && userInfo.userRoles[0].roleName }}
      </el-row>
      <el-row class="userLine">
        <span>用户姓名：</span>
        {{ userInfo.userName }}
      </el-row>
      <el-row class="userLine">
        <span>联系电话：</span>
        {{ userInfo.phone }}
      </el-row>
    </el-card>
    <el-dialog :close-on-click-modal="false" title="修改密码" :visible.sync="dialogFormVisible" width="500px" @close="cancelSubmit">
      <el-form ref="newStation" :model="newForm" :rules="rules" label-width="85px" style="padding-left:50px;">
        <el-form-item label="当前密码:" prop="password">
          <el-input v-model="newForm.password" type="password" size="small" placeholder="请输入当前密码" style="width:250px;" />
        </el-form-item>
        <el-form-item label="新密码:" prop="newPassword">
          <el-input v-model="newForm.newPassword" type="password" size="small" placeholder="请输入新密码" style="width:250px;" />
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPwd">
          <el-input v-model="newForm.confirmPwd" type="password" size="small" placeholder="请输入确认密码" style="width:250px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelSubmit">
          取 消
        </el-button>
        <el-button type="primary" size="small" @click="addSubmit">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import authorityApi from '../../api/authority'
  export default {
    name: "UserCenter1",
    data: () => ({
      dialogFormVisible: false,
      newForm: {
        password: '',
        newPassword: '',
        confirmPwd: ''
      },
      rules: {
        password: [{
          required: true,
          message: '请输入原始密码',
          trigger: blur
        }],
        newPassword: [{
          required: true,
          message: '请输入原始密码',
          trigger: blur
        }],
        confirmPwd: [{
          required: true,
          message: '请输入原始密码',
          trigger: blur
        }]
      },
      userInfo: {}
    }),
    mounted() {
      let userInfo = window.localStorage.getItem('userInfo')
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo)
      }
    },
    methods: {
      changePwd() {
        this.dialogFormVisible = true
      },
      addSubmit() {
        if (this.newForm.newPassword !== this.newForm.confirmPwd) {
          this.$message.error('两次输入的密码不同，请重新输入')
          return
        }
        this.$refs.newStation.validate((valid) => {
          if (valid) {
            authorityApi.changePwd({
              "newPwd": this.newForm.newPassword,
              "oldPwd": this.newForm.password,
              "userCode": this.userInfo.userCode
            }).then(res => {
              if (res && res.data.code === 0) {
                this.$message.success('修改密码成功')
                this.dialogFormVisible = false
                this.newForm = {
                  password: '',
                  newPassword: '',
                  confirmPwd: ''
                }
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      cancelSubmit() {
        this.dialogFormVisible = false
        this.newForm = {
          password: '',
          newPassword: '',
          confirmPwd: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .userCenter1 {
    padding: 10px 20px;

    .userLine {
      padding-left: 10px;

      span {
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 10px;
        color: #6c6c6c;
        line-height: 40px;
        font-size: 14px;
        font-weight: 600;
      }

      .btn {
        color: #409EFF;
        cursor: pointer;
        font-weight: normal;
        display: inline;
        margin-right: 0;
      }
    }

  }
</style>
