<template>
  <div class="login">
    <div class="left">
      a
    </div>
    <div class="right">
      <el-form :model="loginRuleForm" :rules="loginRules" ref="loginRuleForm">
                <el-form-item prop="name">
                    <el-input
                        v-model="loginRuleForm.name"
                        placeholder="手机号用户名或邮箱">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="loginRuleForm.password"
                        type="password"
                        @keyup.native.enter="loginSubmitForm('loginRuleForm')"
                        placeholder="用户密码">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="password">
                        <!-- <router-link to="forget">忘记密码</router-link> -->
                        <el-checkbox style="margin-bottom: 20px" v-model="checked">记住密码</el-checkbox>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginSubmitForm('loginRuleForm')"
                               @keyup.enter.native="loginSubmitForm('loginRuleForm')" style="width:100%;">登录
                    </el-button>
                </el-form-item>
            </el-form>
    </div>
  
  </div>
</template>

<script>

  export default {
    name: "Login",
    data() {
      return {
        checked: false,
                loginOrRegisterData: {
                    isShow: true,
                    activeName: ''
                },
                loginRuleForm: {
                    name: '',
                    password: '',
                },
                loginRules: {
                    name: [
                        {required: true, message: '请输手机号', trigger: 'blur'},
                      
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                       
                    ]
                },

                disableCodeBtn: true,
      }
    },
    created() {
    },
    mounted() {
            // console.log('this.endTime:'+this.endTime)

            if(this.$cookies.get("loginInfo") && this.$cookies.get("loginInfo") !== 'null'){
                let str = this.$cookies.get("loginInfo");
                this.loginRuleForm.name = str.split("-")[0];
                this.loginRuleForm.password = str.split("-")[1];
                this.checked = true;
            }
        },
    methods: {
    
             loginRuleForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        
                    } else {
                        return false;
                    }
                })
            },
            
             user_login() {
               
                user_login(queryParam).then(data => {
                    if (data.success) {
                        sessionStorage.setItem("loginPhone", this.loginRuleForm.name);
                        if (this.checked) {
                            this.$cookies.set("loginInfo", this.loginRuleForm.name + '-' + this.loginRuleForm.password, '30d');
                        } else {
                            this.$cookies.set("loginInfo", null, -1);
                        }
                        this.$cookies.set("appLoginname", this.loginRuleForm.name, '7d');

                        if (data.code == 0) {
                            sessionStorage.setItem("bei_phone", data.data);
                            this.$router.push({
                                name: 'register'
                            });
                        } else if (data.data == 1) {
                            this.$router.push({
                                name: 'index'
                            });
                        }

                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });
                    }

                })
            },
    }
  }
</script>

<style scoped lang="scss">
  .login {
    display: flex;
    height: 100%;
    .left{
      flex: 0 1 50%;
      
      background: red
    }
    .right{
     
      flex: 0 1 50%
    }
  }
</style>
