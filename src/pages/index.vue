<template>
  <div class="Page Index">
    <router-view></router-view>
  </div>
</template>

<script>
// const MainPage = () => import('@/components/common/MainPage')
export default {
  name: 'index',
  components: {
    // MainPage
  },
  data: () => {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "page.scss";
</style>
