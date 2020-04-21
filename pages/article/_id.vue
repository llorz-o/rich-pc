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
    <div class="articleContent" id="articleContent"></div>
    <div class="articleFooter">
      <div class="footerLeft">
        <i class="el-icon-time"></i>
        <span> 最后修改：{{ article.lastChangeDate | lastChange }}</span>
      </div>
      <div class="footerRight">
        <el-button
          @click="
            $refs.commentInject.refresh({
              isMaster: true,
              messageId: article._id
            })
          "
        >
          留言
        </el-button>
      </div>
    </div>
    <div class="commentTitle">{{ article.messageCount }} 条评论</div>
    <CommentInject ref="commentInject">
      <div class="articleCommentList">
        <CommentItem
          v-for="(item, index) in article.messageList"
          :key="index"
          :comment-data="item"
          @send-comment="sendComment(index)"
        />
      </div>
      <Edit :id="article._id" @update="onEditUpdate" />
    </CommentInject>
  </Layout>
</template>

<script>
// fixme 留言有bug,当点击回复某人,然后点击回复文章时,目标人并未清空
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "codemirror/lib/codemirror.css";
import "highlight.js/styles/github.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-chart/dist/tui-chart.css";

import CommentItem from "components/common/CommentItem.vue";
import BreadCrumb from "components/common/BreadCrumb.vue";
import ArticleBaseInfo from "components/common/ArticleBaseInfo.vue";
import Edit from "components/common/Edit.vue";
import Layout from "components/common/Layout";
import CommentInject from "components/common/CommentInject.vue";
import { createTime } from "~/utils/dateFormat";
let viewer;
export default {
  layout: "article",
  components: {
    CommentItem,
    BreadCrumb,
    ArticleBaseInfo,
    Edit,
    CommentInject,
    Layout
  },
  inject: ["root"],
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
  data() {
    return {
      masterIdx: null
    };
  },
  methods: {
    sendComment(masterIdx) {
      this.masterIdx = masterIdx;
    },
    onEditUpdate(article) {
      if (this.masterIdx !== null) {
        let comment = this.article.messageList[this.masterIdx];
        comment.children.push(article);
        this.$set(this.article.messageList, this.masterIdx, comment);
      } else {
        this.article.messageList.unshift(article);
        this.article.messageCount += 1;
      }
      this.masterIdx = null;
    },
    syncArticleInfo() {
      this.root.articleInfo = this.article;
    }
  },
  mounted() {
    const chartPromise = import("@toast-ui/editor-plugin-chart");
    const hljsPromise = import("highlight.js");
    const codeSyntaxHightlightPromise = import(
      "@toast-ui/editor-plugin-code-syntax-highlight"
    );
    const ViewerPromise = import("@toast-ui/editor/dist/toastui-editor-viewer");
    let initViewer = async () => {
      let chart = (await chartPromise).default;
      let hljs = (await hljsPromise).default;
      let codeSyntaxHightlight = (await codeSyntaxHightlightPromise).default;
      let Viewer = (await ViewerPromise).default;
      viewer = new Viewer({
        el: window.document.querySelector("#articleContent"),
        viewer: true,
        initialValue: this.article.content,
        plugins: [
          [codeSyntaxHightlight, { hljs }],
          [
            chart,
            {
              height: 300,
              width: 700,
              minWidth: 200,
              minHeight: 200
            }
          ]
        ]
      });
    };
    this.syncArticleInfo();
    initViewer();
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    @include etched;
    font-size: $min;
  }
}
</style>
