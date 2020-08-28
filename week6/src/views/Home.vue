<template>
  <div class="home">
    <h2>
    kite home
    </h2>
    <loading :active.sync="isLoading"></loading>
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/about">關於我們</router-link>  |
      <router-link to="/products">產品列表</router-link>  |
      <router-link to="/cart">購物車</router-link> |
      <router-link to="/admin">→後台管理</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

</script>
