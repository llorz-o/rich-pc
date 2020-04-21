<template>
  <div class="CommentInjectBar">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
const COMMENT_ACTIVE_CLASS = "comment--active";
export default {
  data() {
    return {
      currentCommentBlock: null
    };
  },
  provide() {
    let _state = Vue.observable({
      messageId: "", // 消息 id
      isMaster: false, // 当前回复的是否是楼主
      nick: "" // 目标人nick
    });

    this.$on("refresh", ({ isMaster, messageId, nick }) => {
      _state.isMaster = isMaster;
      _state.messageId = messageId;
      _state.nick = nick;
    });

    this.$on("clear", () => {
      _state.isMaster = false;
      _state.messageId = "";
      _state.nick = "";
    });

    return {
      _d: _state,
      _refresh: this.refresh,
      _clear: this.clear,
      _parent: this // 当前组件
    };
  },
  methods: {
    refresh(arg) {
      this.$emit("refresh", arg);
    },
    clear() {
      this.$emit("clear");
    },
    recordingCurrentCommentBlockHandle(handle) {
      if (handle instanceof Vue) {
        if (this.currentCommentBlock) {
          this.currentCommentBlock.classList.remove(COMMENT_ACTIVE_CLASS);
        }
        this.currentCommentBlock = handle.$el;
        this.currentCommentBlock.classList.add(COMMENT_ACTIVE_CLASS);
      }
    },
    clearRecordingBlockHandle() {
      if (this.currentCommentBlock) {
        this.currentCommentBlock.classList.remove(COMMENT_ACTIVE_CLASS);
      }
      this.currentCommentBlock = null;
    }
  }
};
</script>
