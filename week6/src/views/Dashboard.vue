<template>
  <div>
    <h2>
    後台管理 - dashboard
    </h2>
    <div id="nav">
      <router-link to="/">←回到前台</router-link> |
      <router-link to="/admin/">後台首頁</router-link> |
      <router-link to="/admin/products">產品列表</router-link> |
      <router-link to="/admin/orders">訂單列表</router-link> |
      <router-link to="/admin/coupon">優惠券列表</router-link> |
      <router-link to="/admin/images">圖片儲存列表</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>
