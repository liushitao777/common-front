<template>
  <el-row style="height: 100vh;" class="login">
    <div class="titleEa">
      <img class="logoImg" src="../../assets/login/logo.png">
      <div class="border" />
      <p>{{ setting.title }}</p>
    </div>

    <div class="content">
      <el-col style="width: 56vh; height: 73vh;">
        <div class="card">
          <img src="../../assets/login/boxImg.png">
          <div class="loginTitle">
            用户登录
          </div>
          <div class="usernameLogin">
            <el-form ref="formData" class=" text-center" :model="formData">
              <el-form-item :rules="{ required: true, message: '请输入用户名', trigger: 'blur'}" prop="username">
                <el-input v-model="formData.username" placeholder="请输入账号">
                  <i slot="prefix" class="el-icon-user el-input__icon" />
                </el-input>
              </el-form-item>
              <el-form-item :rules="{ required: true, message: '请输入密码', trigger: 'blur'}" prop="password" style="margin-top: 3vh">
                <el-input v-model="formData.password" placeholder="请输入密码" type="password" @keyup.enter.native="loginClickHandle">
                  <i slot="prefix" class="el-icon-lock el-input__icon" />
                </el-input>
              </el-form-item>
              <el-row class="text-left" style="margin-top: 4vh">
                <el-form-item>
                  <el-checkbox v-model="formData.remember">记住我</el-checkbox>
                </el-form-item>
              </el-row>
              <el-row class="text-center" style="margin-top: 6vh;">
                <el-form-item>
                  <template>
                    <el-button type="primary" class="loginBtn" @click="loginClickHandle">
                      点击登录
                    </el-button>
                  </template>
                </el-form-item>
              </el-row>
            </el-form>
          </div>

        </div>
      </el-col>
    </div>

    <div v-if="showLk === '1'" class="copyRightEa">
      <p>Copyright © 国家电投集团沧州新能源发电有限公司 2020</p>
      <p>技术支持：重庆中电自能科技有限公司</p>
    </div>
    <div v-if="showLk === '0'" class="copyRightEa">
      <p>Copyright © 国家电投集团吉电股份陕西吉电能源有限公司 2020</p>
      <p>技术支持：重庆中电自能科技有限公司</p>
    </div>

  </el-row>
</template>

<script>
  import eventBus from "../../eventBus";
  import setting from "../../settings";
  import config from '../../config/config'

  export default {
    name: "Login",
    data() {
      return {
        formData: {},
        showLk: config.url === '/db-platform' ? '0' : '1', //0: 定边 1: 沧州
        setting
      }
    },
    methods: {
      init() {},
      loginClickHandle() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/dologin', this.formData).then((data) => {
              if(data.data.data.firstLogin){
                this.$message({
                  message: '第一次登陆，请修改初始密码',
                  type: 'warning',
                  offset:70,
                });
              }else if(data.data.data.expired){
                this.$message({
                  message: '密码已过期，请修改密码',
                  type: 'warning',
                  offset:70,
                });
              }else{
                this.$message({
                  message: data.data.message,
                  type: 'success',
                  offset:70,
                });
              }
              console.log("login")
              this.$router.push({ path: "/" })
              // this.$router.push({ path: this.redirect || '/' })
            }).catch((e) => {})
          }
        })
      },
    }
  }
</script>

<style lang="scss">
  .login {
    background: url("../../assets/login/background.png") center;
    background-size: cover;

    .titleEa {
      margin-top: 4vh;
      margin-left: 6vh;
      display: flex;
      p{
        margin: 0;
        padding: 0;
      }

      .logoImg {
        width: 19vh;
      }

      .border {
        border-left: 2px solid white;
        height: 5vh;
        align-self: center;
        margin-left: 2vh;
      }

      p {
        font-size: 4vh;
        line-height: 4vh;
        color: #ffffff;
        align-self: center;
        margin-left: 3vh;
      }
    }

    .content {
      height: 73vh;
      width: 145vh;
      margin: 0 auto;
      margin-top: 3vh;
      border-radius: 3.5vh;
      background: url('../../assets/login/back1.png') no-repeat;
      background-size: cover;

      .card {
        height: 73vh;
        border-radius: 3.5vh;
        box-shadow: 0px 3px 14px 0px rgba(0, 14, 26, 0.33) !important;
        background-color: white;

        img {
          width: 28vh;
        }

        .loginTitle {
          text-align: center;
          font-size: 3vh;
          line-height: 3vh;
          color: #555555;
        }

        .usernameLogin {
          width: 39vh;
          margin: 0 auto;
          margin-top: 8vh;

          .el-input__inner,
          .el-form-item {
            height: 4vh;
            border: 0;
          }

          .el-input__inner {
            border-bottom: 1px solid #DCDFE6;
            border-radius: 0;
          }

          .el-form-item {
            margin-bottom: 3vh;
          }

          .loginBtn {
            width: 100%;
            font-size: 16px;
            height: 6vh;
            font-size: 2vh;
          }
        }
      }
    }

    .copyRightEa {
      font-size: 2vh;
      line-height: 2vh;
      color: #ffffff;
      text-align: center;
      margin-top: 4vh;

      p {
        margin-top: 2vh;
        font-family: MicrosoftYaHei;
        font-size: 2vh;
        line-height: 2vh;
      }
    }
  }
</style>
