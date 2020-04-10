<template>
  <el-container>
    <el-header class="Header" />
    <el-container>
      <LeftAside />
      <el-container>
        <el-main class="Main">
          <nuxt />
        </el-main>
        <el-footer class="Footer"> </el-footer>
      </el-container>
      <RightAside />
    </el-container>
  </el-container>
</template>

<script>
import LeftAside from "components/common/LeftAside.vue";
import RightAside from "components/common/RightAside.vue";
export default {
  middleware: "init",
  components: {
    LeftAside,
    RightAside,
  },
};
</script>

<style lang="scss">
.Header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  height: 40px !important;
}
.Main {
  background-color: #f0f3f4;
  overflow: hidden;
  min-width: 800px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  > * {
    max-width: 800px;
    min-width: 800px;
  }
}
.Footer {
  background-color: #f0f3f4;
  box-shadow: 0 -2px 1px rgba(200, 200, 200, 0.12);
}
.el-container {
  height: 100%;
}
</style>
