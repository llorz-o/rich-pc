<template>
  <div class="articleCard2" :style="info.style.coverDft">
    <!-- 封面 -->
    <img
      class="articleCover"
      :style="info.style.coverSty"
      :src="info.style.coverUrl"
    />
    <div class="articleCardTop">
      <nuxt-link :to="`/article/${info._id}`" class="articleCardTitle">
        {{ info.title }}
      </nuxt-link>
      <div class="articleCardDesc">
        {{ info.desc }}
      </div>
    </div>
    <div class="articleCardBottom">
      <div class="articleBaseInfo el-row el-row--flex">
        <div class="infoItem">
          <i class="el-icon-user"></i>
          <span class="val">
            {{ info.auth }}
          </span>
        </div>
        <div class="infoItem">
          <i class="el-icon-time"></i>
          <span class="val">
            {{ info.date | dateYmd }}
          </span>
        </div>
        <div class="infoItem">
          <i class="el-icon-chat-line-round"></i>
          <span class="val"> {{ info.messageCount }}条评论 </span>
        </div>
        <div class="infoItem">
          <i class="el-icon-chat-line-round"></i>
          <span class="val"> {{ info.likeCount }}条点赞 </span>
        </div>
        <div class="infoItem">
          <i class="el-icon-chat-line-round"></i>
          <span class="val"> {{ info.viewCount }}条查看 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { articleCardExtend } from "./exends";
export default {
  name: "article-card2",
  extends: articleCardExtend
};
</script>

<style lang="scss">
.articleCard2 {
  user-select: none;
  text-decoration: none;
  color: #909399;
  font-size: 18px;
  font-weight: 600;
  display: block;
  margin-top: 15px;
  background-color: #fff;
  border-radius: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  position: relative;
  border-bottom-color: #ebeef5;
  padding: 0 !important;
  // overflow: hidden;
  .articleCover {
    display: block;
    height: 200px;
    object-fit: cover;
    z-index: 0;
    width: 100%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  .articleCardTop,
  .articleCardBottom {
    margin: 0 20px;
    padding: 10px 0;
  }
  .articleCardTop {
    position: relative;
    z-index: 1;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: inherit;
    .articleCardTitle {
      font-size: inherit;
      color: #303133;
      font-weight: inherit;
    }
    .articleCardDesc {
      color: inherit;
      font-size: 14px;
      padding: 10px 0 5px;
      font-weight: 500;
    }
  }
  .articleCardBottom {
    padding: 15px 0;
    font-weight: 500;
    .articleBaseInfo {
      font-size: 13px;
      color: inherit;
      display: flex;
      .infoItem {
        padding: 2px 6px;
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }
}
</style>
