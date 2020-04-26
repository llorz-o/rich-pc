<template>
  <Layout modifier="messages">
    <template slot="header">
      <div class="messagesHeader">
        <BreadCrumb
          :paths="[
            {
              text: '留言'
            }
          ]"
        />
      </div>
    </template>
    <div class="messageEdit">
      <textarea class="editor" v-model="message"></textarea>
      <div class="others">
        <el-input placeholder="姓名" v-model="nick"></el-input>
        <el-input
          placeholder="邮箱(必填)"
          type="email"
          v-model="email"
        ></el-input>
        <el-input placeholder="网站" type="url" v-model="net"></el-input>
      </div>
      <el-button class="submit" @click="onSubmit">提交</el-button>
    </div>
    <div class="messagesMain">
      <div class="messageContainer" v-for="item in messageList" :key="item._id">
        <div class="messageAvatarContainer">
          <el-avatar fit="cover" :size="50" :src="item.avatar | img">
          </el-avatar>
        </div>
        <div class="messageMainContainer">
          <div class="messageUserInfo">
            <span class="nick">
              {{ item.nick }}
            </span>
          </div>
          <div class="messageBody">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "components/common/Layout";
import BreadCrumb from "components/common/BreadCrumb.vue";
export default {
  components: {
    Layout,
    BreadCrumb
  },
  inject: ["root"],
  async asyncData(ctx) {
    let { data } = await ctx.$axios.get("/messageList/10/0");
    let messageList = data.data || [];
    return { messageList };
  },
  data() {
    return {
      nick: "",
      email: "",
      net: "",
      message: ""
    };
  },
  methods: {
    onSubmit() {
      let warnMessage = "";
      if (this.email === "") {
        warnMessage = "请填写email";
      }
      if (this.nick === "") {
        warnMessage = "请填写昵称";
      }
      if (this.message === "") {
        warnMessage = "请填写内容";
      }

      if (warnMessage) {
        this.$notify({
          title: "警告",
          message: warnMessage,
          position: "bottom-right",
          type: "warning"
        });
        return;
      }

      window.localStorage.setItem(
        "userInfo",
        JSON.stringify({
          nick: this.nick,
          email: this.email,
          net: this.net
        })
      );

      this.$axios
        .get("/avatar", {
          params: {
            email: this.email,
            s: 45
          }
        })
        .then(res => {
          let { ok, data } = res.data;
          if (ok) {
            this.$axios
              .post("/message", {
                avatar: data,
                nick: this.nick,
                content: this.message,
                state: 0,
                url: this.net,
                email: this.email
              })
              .then(res => {
                let { ok, data } = res.data;
                if (ok) {
                  this.message = "";
                  this.messageList.unshift(data);
                } else {
                  // fixme 留言失败
                }
              });
          }
        });
    }
  },
  created() {
    this.root.setLocalRoute("/message");
  },
  mounted() {
    let { nick, email, net } = JSON.parse(
      window.localStorage.getItem("userInfo") || "{}"
    );
    this.nick = nick;
    this.email = email;
    this.net = net;
  }
};
</script>

<style lang="scss">
#page-messages-root.page-messages-root {
  .LayoutMain {
    padding : {
      top: 10px;
      bottom: 10px;
    }
  }
  .messagesMain {
    .messageContainer {
      border-radius: 5px;
      background-color: $light;
      padding: 10px;
      margin-bottom: 10px;
      display: flex;
      .messageAvatarContainer {
        font-size: 0;
      }
      .messageMainContainer {
        flex: 1;
        padding-left: 10px;
        .messageUserInfo {
          .nick {
            color: $text-dark;
            font-size: $base;
            font-weight: $w600;
          }
        }
        .messageBody {
          margin-top: 5px;
          font-size: $base;
          color: $text;
        }
      }
    }
  }
  .messageEdit {
    padding-bottom: 10px;
    .editor {
      outline: none;
      resize: none;
      height: 150px;
      width: 100%;
      border: none;
      border-radius: 5px;
      padding: 5px;
      margin-bottom: 10px;
    }
    .others {
      display: flex;
      justify-content: space-between;
      > .el-input {
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .submit {
      position: relative;
      margin-top: 10px;
      border: none;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      padding: {
        top: 0;
        bottom: 0;
      }
      span {
        position: relative;
        z-index: 1;
      }
      @mixin color {
        color: $light;
        background: linear-gradient(to right, $root, #66b6e6);
      }
      @include color;
      &:hover {
        @include color;
        opacity: 0.9;
      }
      @keyframes decorate {
        100% {
          transform: scale(1.4);
          border-color: rgba(92, 219, 211, 0.1);
          background-color: rgba(92, 219, 211, 0);
        }
      }
      &:focus {
        &::before,
        &::after {
          box-sizing: border-box;
          content: "";
          @include abs;
          border-radius: 15px;
          border: 1px solid rgb(92, 219, 211);
          background-color: rgba(92, 219, 211, 0.7);
          box-sizing: border-box;
        }
        &::before {
          animation-name: decorate;
          animation-duration: 1s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        &::after {
          animation-name: decorate;
          animation-duration: 1s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-delay: 0.5s;
        }
      }
    }
  }
}
</style>
