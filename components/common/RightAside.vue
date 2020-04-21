<template>
  <el-aside class="rightAside">
    <el-row>
      <el-tabs>
        <el-tab-pane label="留言">
          <template slot="label">
            <i class="el-icon-chat-line-square"></i>
            <div class="label">
              留言
            </div>
          </template>
          <el-row class="rightAsideZone">
            <div class="tabContentBox Messages">
              <div
                class="newsMessage"
                @click="toArticle(item.articleId)"
                v-for="(item, index) in newsMessages"
                :key="index"
              >
                <div class="newsMessageAvatarBar">
                  <el-avatar
                    fit="cover"
                    :size="35"
                    :src="item.avatar | img"
                    class="newsMessageAvatar"
                  />
                </div>
                <div class="newsMessageInfos">
                  <div class="mewsMessageNick">{{ item.nick }}</div>
                  <div
                    class="newsMessageContent __md small"
                    v-html="item.content"
                  ></div>
                </div>
              </div>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="时间线">
          <template slot="label">
            <i class="el-icon-paperclip"></i>
            <div class="label">
              时间线
            </div>
          </template>
          <el-row class="rightAsideZone">
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
    },
    newsMessages() {
      return this.$store.state.init.newsMessage;
    }
  },
  methods: {
    toArticle(articleId) {
      if (this.$route.path.indexOf(articleId) === -1) {
        this.$router.replace(`/article/${articleId}/`);
      }
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
    .tabContentBox {
      font-size: $small-base;
      color: $text-light;
      padding: 0 8px;
      .newsMessage {
        display: flex;
        margin: 15px 0;
        cursor: pointer;
        .newsMessageAvatarBar {
          .newsMessageAvatar {
            border-radius: 5px;
            box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.54);
            border: 2px solid $bg-bright;
          }
        }
        .newsMessageInfos {
          padding-left: 10px;
          flex: 1;
          .mewsMessageNick {
            font-size: $aux;
            color: $text-dark;
          }
          .newsMessageContent {
            font-size: $base;
            color: $text-light;
            // transform: scale(0.8) translateX(-12.5%) translateY(-12.5%);
          }
        }
      }
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
    display: flex;
    align-items: center;
    justify-content: center;
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
    .label {
      font-size: $small-base;
      padding-left: 5px;
    }
  }
}
</style>
