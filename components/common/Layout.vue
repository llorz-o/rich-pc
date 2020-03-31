<template>
  <el-container class="LayoutContainer" :class="[`page-${modifier}-root`]">
    <el-header class="LayoutHeader">
      <slot name="header"></slot>
    </el-header>
    <div class="boundary">
      <el-main class="LayoutMain">
        <slot>
          Main slot
        </slot>
      </el-main>
    </div>
  </el-container>
</template>

<script>
export default {
  props: {
    modifier: String
  }
};
</script>

<style lang="scss">
.LayoutContainer {
  .LayoutHeader {
    height: unset !important;
    padding: 0;
  }
  .boundary {
    margin: 10px 0;
    @include beauty-boundary;
    .LayoutMain {
      padding-top: 0;
      padding-bottom: 0;
      @include scroll;
      @include beauty-scroll;
      overflow-y: scroll;
    }
  }
}
</style>
