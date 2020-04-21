<template>
  <el-container
    class="LayoutContainer"
    :class="[modifierClass]"
    :id="modifierClass"
  >
    <el-header class="LayoutHeader">
      <slot name="header"></slot>
    </el-header>
    <el-main class="LayoutMain">
      <slot>
        Main slot
      </slot>
    </el-main>
  </el-container>
</template>

<script>
export default {
  props: {
    modifier: String
  },
  computed: {
    modifierClass() {
      if (this.modifier !== undefined) {
        return `page-${this.modifier}-root`;
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
.LayoutContainer {
  .LayoutHeader {
    height: unset !important;
    padding: 0;
  }
  .LayoutMain {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
