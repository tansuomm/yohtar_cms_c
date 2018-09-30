<template>
  <div class="login">
    <b-card title="Content Manage System"
            :img-src="headerImg"
            img-alt="Image"
            img-top
            tag="article"
            body-class="body"
            class="text-center card">
      <b-form @submit="onSubmit">

        <b-form-group id="exampleInputGroup1"
                      label="Your Name:"
                      class="text-left"
                      label-for="exampleInput1">
          <b-form-input id="exampleInput1"
                        v-model="loginForm.username"
                        required
                        autocomplete="on"
                        placeholder="手机号用户名或邮箱">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                      label="Your Pass:"
                      class="text-left"
                      label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        type="password"
                        v-model="loginForm.password"
                        autocomplete="on"
                        required
                        placeholder="登录密码">
          </b-form-input>
        </b-form-group>
        <!--<b-form-group id="exampleGroup4">-->
        <!--<b-form-checkbox v-model="checked">记住密码</b-form-checkbox>-->
        <!--</b-form-group>-->
        <b-button type="submit" class="btn" variant="primary">Sign In</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
  import {login} from './../apis/index'

  export default {
    name: "Login",
    data() {
      return {
        headerImg:require('./../assets/login_header.jpg'),
        checked: false,
        loginForm: {
          username: '',
          password: ''
        },
        disableCodeBtn: true,
      }
    },
    created() {
    },
    mounted() {
      // if (this.$cookies.get("u") && this.$cookies.get("u") !== 'null') {
      //   this.loginForm.username = this.decode(this.$cookies.get("u"));
      //   this.loginForm.password = this.decode(this.$cookies.get("p"));
      //   this.checked = true;
      // }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        let self = this;
        login(self.loginForm).then(res => {
          if (res.code === 1) {
            // if (self.checked) {
            //   self.$cookies.set("u", self.encode(self.loginForm.username), '30d');
            //   self.$cookies.set("p", self.encode(self.loginForm.password), '30d');
            // } else {
            //   self.$cookies.set("u", null, -1);
            //   self.$cookies.set("p", null, -1);
            // }
            sessionStorage.setItem('token',JSON.stringify(res.data.token));
            sessionStorage.setItem('user',JSON.stringify(res.data.userInfo));
            self.$router.push({
              path: '/'
            });
          }
        })
      },
      encode(str) {
        return window.btoa(window.encodeURIComponent(str))
      },
      decode(str) {
        return window.decodeURIComponent(window.atob(str))
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    display: flex;
    align-items: center;
    height: 100%;
    width: 350px;
    margin-left: auto;
    .card{
      img{
        height: 200px;
      }
      .body{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .btn{
        width: 100%;
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .login {
      width: auto;
    }
  }
</style>
