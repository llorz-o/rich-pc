<template>
  <Layout v-if="article" modifier="article">
    <template slot="header">
      <el-row class="articleInfos">
        <el-row class="articleTitle">
          {{ article.title }}
        </el-row>
        <ArticleBaseInfo :article="article" />
      </el-row>
      <BreadCrumb
        :paths="[
          {
            text: '正文'
          }
        ]"
      />
    </template>
    <!-- toTop -->
    <div class="articleContent" v-html="article.content"></div>
    <div class="articleFooter">
      <i class="el-icon-time"></i>
      <span> 最后修改：{{ article.lastChangeDate | lastChange }}</span>
    </div>
    <div class="commentTitle">{{ article.messageCount }} 条评论</div>
    <CommentInject>
      <div class="articleCommentList">
        <CommentItem
          v-for="(item, index) in article.messageList"
          :key="index"
          :comment-data="item"
        />
      </div>
      <Edit :id="article._id" @update="onEditUpdate" />
    </CommentInject>
  </Layout>
</template>

<script>
import CommentItem from "components/common/CommentItem.vue";
import BreadCrumb from "components/common/BreadCrumb.vue";
import ArticleBaseInfo from "components/common/ArticleBaseInfo.vue";
import Edit from "components/common/Edit.vue";
import Layout from "components/common/Layout";
import CommentInject from "components/common/CommentInject.vue";
import { createTime } from "~/utils/dateFomat";
export default {
  components: {
    CommentItem,
    BreadCrumb,
    ArticleBaseInfo,
    Edit,
    CommentInject,
    Layout
  },
  async asyncData(ctx) {
    let id = ctx.route.params.id;
    if (id) {
      let { data } = await ctx.$axios.get(`/article/${id}`);
      return {
        article: data
      };
    } else {
      ctx.redirect("/404");
    }
  },
  methods: {
    onEditUpdate(article) {
      this.article = article;
    }
  },
  filters: {
    lastChange(val) {
      let { year, month, day, hours, millisecond } = createTime(new Date(val));
      return `${year}年${month}月${day}日 ${hours}:${millisecond}`;
    }
  }
};
</script>

<style lang="scss">
.page-article-root {
  height: 100%;
  width: 100%;
  flex: 1;
  .articleInfos {
    @include circleBlock;
    .articleTitle {
      @include etched;
      font-size: $master-title;
      margin-bottom: 10px;
      color: $text-dark;
    }
  }
  .articleContent {
    padding: 15px 0;
  }
  .commentTitle {
    font-size: $title;
    color: text-dark;
    font-weight: $w600;
    margin-top: 10px;
  }
  .articleFooter {
    padding: 10px 0;
    @include etched;
    font-size: $min;
  }
}
</style>
