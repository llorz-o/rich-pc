<template>
  <div class="Edit">
    <div class="EditContainer">
      <div class="EditReviewMd __md" v-if="openView" v-html="view">
        <!-- 预览markdown -->
      </div>
      <textarea
        id="Send"
        :placeholder="placeholder"
        v-model="comment"
        @keydown="tab"
      />
      <div class="EditFooter">
        <el-input v-model="commentNick" placeholder="昵称:" />
        <el-input
          type="email"
          v-model="commentEmail"
          placeholder="邮箱:xxx@email.com"
        />
        <el-input
          type="url"
          v-model="commentNet"
          placeholder="网址(http|https://):"
        />
        <el-button type="primary" @click="onView">
          预览Markdown
        </el-button>
        <el-button type="primary" icon="el-icon-s-promotion" @click="onSend" />
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
// import "highlight.js/styles/github.css";
import "~/assets/sty/highlight-sublime.min.css";

const md = new marked.Renderer();

md.image = (herf, title, text) => {
  return `<img src="${herf}" art="${text}" title="${title}" class="m-image" />`;
};

marked.setOptions({
  renderer: md,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});
export default {
  props: {
    id: String
  },
  data() {
    return {
      placeholder: "你确定不留下点什么?",
      comment: "",
      openView: false,
      view: "",

      commentNick: "",
      commentEmail: "",
      commentNet: ""
    };
  },
  inject: ["_d", "_refresh", "_clear"],
  methods: {
    onSend() {
      let verifyMessage = "";

      if (!this.commentNick) {
        verifyMessage = "请输入昵称!!";
      }

      if (this.comment === "") {
        verifyMessage = "请输入回复内容";
      }

      if (verifyMessage) {
        this.$notify({
          title: "警告",
          message: verifyMessage,
          position: "bottom-right",
          type: "warning"
        });
        return;
      }

      window.localStorage.setItem(
        "userInfo",
        JSON.stringify({
          nick: this.commentNick,
          email: this.commentEmail,
          net: this.commentNet
        })
      );

      this.view = marked(this.comment);
      this.$axios
        .post("/articleComment", {
          messageId: this._d.messageId,
          isMaster: this._d.isMaster,
          nick: this._d.nick,
          articleId: this.id,
          message: {
            avatar: "1.jpg", // 提交人头像
            nick: this.commentNick, // 提交人nick
            state: 0,
            content: this.view
          }
        })
        .then(res => {
          this.$emit("update", res.data);
          this.clear();
          this._clear();
        });
    },
    onView() {
      this.openView = !this.openView;
      this.view = marked(this.comment);
    },
    tab(e) {
      if (e.keyCode == 9) {
        e.preventDefault();
      }
    },
    clear() {
      this.comment = "";
      this.view = "";
      this.openView = false;
    }
  },
  watch: {
    comment(news) {
      if (this.openView) {
        this.view = marked(news);
      }
    },
    "_d.nick"(news) {
      if (news) {
        this.placeholder = `@${news}`;
      } else {
        this.placeholder = "你确定不留下点什么?";
      }
    }
  },
  mounted() {
    if (window) {
      let { nick, email, net } = JSON.parse(
        window.localStorage.getItem("userInfo") || ""
      );
      this.commentNick = nick;
      this.commentEmail = email;
      this.commentNet = net;
    }
  }
};
</script>

<style lang="scss">
.Edit {
  $edit-height: 250px;
  $edit-width: 750px;
  display: flex;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 50px;
  .EditContainer {
    border-radius: 5px;
    overflow: hidden;
    background-color: $light;
  }
  #Send {
    box-sizing: border-box;
    min-height: $edit-height;
    width: $edit-width;
    outline: none;
    resize: none;
    border: none;
    padding: 15px;
    background-color: #fefefe;
  }
  .EditFooter {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px 10px;
    > * {
      margin: 0 5px;
    }
  }
  .EditReviewMd {
    padding: 15px;
    min-height: 200px;
  }
}
</style>
