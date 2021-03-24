<template>
  <router-link tag="div" class="components GoodsListItem" :to="{ name: 'goodsDetail', query: { id: data.id } }">
    <div class="Img">
      <img :src="data.pictureUrl" class="centerLabel cover" alt="">
    </div>
    <div class="Title flex-h">
      <div class="flex-item">
        <span>{{data.productName}}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    data: {
      default: () => {
        return {}
      },
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
