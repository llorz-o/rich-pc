<template>
  <div class="articleCard3" :style="info.style.coverDft">
    <img
      class="articleCover"
      :style="info.style.coverSty"
      :src="info.style.coverUrl"
    />
    <div class="articleCardRight">
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
  </div>
</template>

<script>
import { articleCardExtend } from "./exends";
export default {
  name: "article-card3",
  extends: articleCardExtend
};
</script>

<style lang="scss">
.articleCard3 {
  user-select: none;
  text-decoration: none;
  color: #909399;
  font-size: 18px;
  font-weight: 600;
  display: block;
  margin-top: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  position: relative;
  border-bottom-color: #ebeef5;
  display: flex;
  padding: 0 !important;
  .articleCardRight {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .articleCover {
    display: block;
    width: 280px;
    height: 180px;
    object-fit: cover;
    z-index: 0;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
  .articleCardTop {
    position: relative;
    z-index: 1;

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
    padding-top: 5px;
    font-weight: 500;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: inherit;
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
