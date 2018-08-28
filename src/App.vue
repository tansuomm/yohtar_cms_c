<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import {login,bookInfo} from './apis/index'
export default {
  name: 'app',
  data(){
    return{
      msg:11,
      userInfo:{},
    }
  },
  created(){
    let self = this;
    login({username : 'gym',password:'123456'}).then(function (response) {
      if(response.code ===1){
          self.userInfo = response.data.userInfo;
          sessionStorage.setItem('token',JSON.stringify(response.data.token));
      }
    });

  },
  methods:{
    lookBook(){
      let self = this;
      bookInfo({id:self.userInfo.id}).then(function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
