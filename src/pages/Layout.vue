<template>
  <main>
    <i class="icon iconfont icon-back" @click="$router.go(-1)"></i>
    <transition name="move" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
    export default {
        name: "Layout"
    }
</script>

<style scoped lang="scss">
  main{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 40px;
    border-radius: 6px;
    box-shadow: 1px 1px 20px 1px #12005a;
    background: #ffffff;
    .icon-back{
      position: absolute;
      right: 25px;
      top: 15px;
    }
  }
</style>
