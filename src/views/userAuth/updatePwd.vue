<template>
  <div class="updatePwd">
    <el-card>
      <div class="box">
        <el-form
          ref="formData"
          :model="formData"
          label-width="120px"
          :rules="rules"
        >
          <el-form-item label="账户：">
            {{ formData.userCode }}
          </el-form-item>
          <el-form-item label="当前密码：" prop="oldPwd">
            <el-input
              v-model="formData.oldPwd"
              placeholder="请输入当前密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPwd">
            <el-input
              v-model="formData.newPwd"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="confirmPwd">
            <el-input
              v-model="formData.confirmPwd"
              placeholder="请输入确认密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="addSubmit">
            确 定
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import dataRequest from "../../api/user"
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  data() {
    return {
      formData: {
        userCode: JSON.parse(localStorage.getItem("userInfo")).userCode,
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      rules: {
        oldPwd: [
          {
            required: true,
            message: "请输入当前密码",
            trigger: 'blur',
          },
        ],
        newPwd: [
          {
            required: true,
            message: "请输入新密码",
            trigger: 'blur',
          },
        ],
        confirmPwd: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    addSubmit() {
      if (this.formData.newPwd !== this.formData.confirmPwd) {
        this.$message.error("两次输入的密码不同，请重新输入");
        return;
      }
      this.$refs.formData.validate((valid) => {
        if (valid) {
          dataRequest.updatePwd({
            "newPwd": this.formData.newPwd,
            "oldPwd": this.formData.oldPwd,
            "userCode": this.formData.userCode
          }).then(res => {
              console.log(res)
            if (res && res.data.code === 0) {
              this.$message.success(res.data.msg);
              window.localStorage.clear();
              removeToken();
              this.$router.push('/login')
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.updatePwd {
  padding: 10px 20px;
  .box {
    width: 500px;
    margin: 0 auto;
  }
}
</style>