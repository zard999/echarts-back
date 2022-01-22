<template>
  <div class="indexContainer">
    <div class="content">
      <TopView></TopView>
      <MiddleView></MiddleView>
      <BottomView></BottomView>
    </div>
  </div>
</template>

<script>
import BottomView from './components/BottomView'
import TopView from './components/TopView'
import MiddleView from './components/MiddleView'
export default {
  name: 'Dashboard',

  mounted() {
    this.getEchartsData()
  },

  methods: {
    getEchartsData() {
      this.$store.dispatch('echarts/getEchartsData')
    }
  },

  components: {
    BottomView,
    TopView,
    MiddleView
  }
}
</script>

<style lang="scss" scoped>
.indexContainer {
  padding: 10px;
  .content {
    background-color: #eee;
    padding: 20px;
  }
}
</style>
