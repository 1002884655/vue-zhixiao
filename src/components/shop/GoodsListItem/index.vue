<template>
  <router-link tag="div" class="components GoodsListItem" :to="{ name: 'goodsDetail', query: { id: 'xxx' } }">
    <div class="Img">
      <img :src="null" class="centerLabel cover" alt="">
    </div>
    <div class="Title flex-h">
      <div class="flex-item">
        <span>商品名称</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
