<template>
  <el-row type="flex" justify="start" class="articleBaseInfo">
    <!-- 作者 -->
    <div class="infoItem" v-if="article.auth">
      <i class="el-icon-user"></i>
      <span class="val">
        {{ article.auth }}
      </span>
    </div>
    <!-- 时间 -->
    <div class="infoItem" v-if="article.date">
      <i class="el-icon-time"></i>
      <span class="val">
        {{ article.date | dateYmd }}
      </span>
    </div>
    <!-- 查看次数 -->
    <div class="infoItem" v-if="article.viewCount !== undefined">
      <i class="el-icon-view"></i>
      <span class="val"> {{ article.viewCount }}次查看 </span>
    </div>
    <!-- 点赞量 -->
    <div class="infoItem" v-if="article.likeCount !== undefined">
      <i class="el-icon-thumb"></i>
      <span class="val"> {{ article.likeCount }}个赞 </span>
    </div>
    <!-- 评论量 -->
    <div class="infoItem" v-if="article.messageCount !== undefined">
      <i class="el-icon-chat-line-round"></i>
      <span class="val"> {{ article.messageCount }}条评论 </span>
    </div>
    <!-- # 分类 -->
    <div class="infoItem" v-if="article.category">
      <i class="el-icon-category"></i>
      <span class="val">
        {{ article.category }}
      </span>
    </div>
    <!-- tags -->
    <div class="infoItem" v-if="article.tags && article.tags.length">
      <i class="el-icon-collection-tag"></i>
      <span class="val tag" v-for="(item, index) in article.tags" :key="index">
        {{ item }}
      </span>
    </div>
  </el-row>
</template>

<script lang="ts">
import { createTime } from "~/utils/dateFomat";
export default {
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    dateYmd(val: string) {
      let { year, month, day } = createTime(new Date(val));
      return `${year}年${month}月${day}日`;
    }
  }
};
</script>

<style lang="scss">
.articleBaseInfo {
  font-size: $small-base;
  color: $text-light;
  .infoItem {
    padding: 2px 6px;
    .el-icon-category::before {
      content: "#";
    }
    .val {
      font-size: $aux;
      &.tag {
        margin-right: 5px;
      }
    }
  }
}
</style>
