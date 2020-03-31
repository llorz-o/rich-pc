<template>
  <el-aside class="rightAside">
    <el-row>
      <el-tabs>
        <el-tab-pane label="留言">
          <el-row class="rightAsideZone">
            <div class="label">
              留言
            </div>
            <div class="tabContentBox">
              12
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="时间线">
          <el-row class="rightAsideZone">
            <div class="label">
              时间线
            </div>
            <div class="tabContentBox">
              12
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>

    <el-row class="rightAsideZone">
      <div class="label">标签</div>
      <div class="tagBox">
        <template v-for="(item, index) in tags">
          <el-tag @click="$router.push(`/tag/${item.tagName}`)" :key="index">
            {{ item.tagName }}
          </el-tag>
          &nbsp;
        </template>
      </div>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  computed: {
    tags() {
      return this.$store.state.init.tags;
    }
  }
};
</script>

<style lang="scss" scoped>
.rightAside {
  .el-row {
    margin-bottom: 20px;
  }
  .tagBox {
    display: table;
    table-layout: fixed;
    line-height: 30px;
    .el-tag {
      height: 20px;
      line-height: 18px;
      border-radius: 10px;
      background-color: $bg-bright;
      color: $text;
      border: none;
      font-size: $aux;
    }
  }
  .rightAsideZone {
    padding: 0 20px;
    .label {
      padding-bottom: 10px;
      font-size: $small-title;
      color: $text;
    }
    .tabContentBox {
      font-size: $small-base;
      color: $text-light;
    }
  }
}
</style>

<style lang="scss">
.rightAside {
  .el-tabs__nav {
    display: flex;
    float: unset;
  }
  .el-tabs__active-bar {
    background-color: $root;
  }
  .el-tabs__item {
    color: $text;
    &:hover {
      color: $text;
    }
    &.is-active {
      color: $root;
    }
    &.is-top {
      text-align: center;
      flex: 1;
      padding: 0;
    }
  }
}
</style>
