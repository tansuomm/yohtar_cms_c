<template>
  <b-container fluid class="home text-light text-center">
    <b-row class="nav">
      <b-col cols="6" md="4" class="nav-item">
        <i class="icon iconfont icon-book" @click="toRouter('/index/book')"></i>
        <p>爱情笔记</p>
      </b-col>
      <b-col cols="6" md="4" class="nav-item">
        <i class="icon iconfont icon-shujucaiji" @click="toRouter('/index/craw')"></i>
        <p>数据采集</p>
      </b-col>
      <b-col cols="6" md="4" class="nav-item">
        <i class="icon iconfont icon-book"></i>
        <p>爱情笔记</p>
      </b-col>
      <b-col cols="6" md="4" class="nav-item">
        <i class="icon iconfont icon-book"></i>
        <p>爱情笔记</p>
      </b-col>
      <b-col cols="6" md="4" class="nav-item">
        <i class="icon iconfont icon-book"></i>
        <p>爱情笔记</p>
      </b-col>
      <b-col cols="6" md="4" class="nav-item">
        <i class="icon iconfont icon-book"></i>
        <p>爱情笔记</p>
      </b-col>


    </b-row>
  </b-container>
</template>

<script>

  export default {
    name: "Home",
    data() {
      return {}
    },
    created() {
    },
    methods: {
      toRouter(path){
        this.$router.push({path:path})
      }
    }
  }
</script>

<style scoped lang="scss">
  .home {
    height: 100%;
    position: relative;
    border-radius: 4px;
    background: #2299dde0;
    box-shadow: 1px 1px 20px 1px #12005a;
    .nav{
      height: 100%;
      .nav-item{
        border-radius: 50%;
        align-self: center;
        i {
          font-size: 3rem;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
