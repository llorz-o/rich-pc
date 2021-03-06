<template>
  <el-row
    type="flex"
    class="CommentItem"
    :id="commentData._id"
    v-if="commentData"
    ref="masterComment"
  >
    <el-col :span="1" class="commentAvatar">
      <el-avatar fit="cover" :size="50" :src="commentData.avatar | img" />
    </el-col>
    <el-col :span="22" class="commentMain">
      <el-row>
        <!-- 用户账户信息 -->
        <span class="commentMainNick">
          {{ commentData.nick }}
        </span>
      </el-row>
      <el-row class="commentMainContext __md" v-html="commentData.content">
        <!-- 用户留言内容 -->
      </el-row>
      <el-row class="commentMainOption">
        <!-- 用户留言信息 时间,点赞,回复按钮 -->
        <span>{{ commentData.date | dateYmdHms }}</span>
        <a
          class="sendTo"
          :href="`#${commentData._id}`" 
          @click="
            onSendTo({
              messageId: commentData._id,
              isMaster: false,
              nick: commentData.nick
            })
          "
        >
          回复
        </a>
      </el-row>
      <el-row
        type="flex"
        align="center"
        class="childrenComment"
        ref="childrenComment"
        :id="item._id"
        v-for="(item, index) in commentData.children"
        :key="index"
      >
        <!-- 子留言 -->
        <el-col :span="1" class="childrenCommentAvatar">
          <el-avatar fit="cover" :size="20" :src="item.avatar | img" />
        </el-col>
        <el-col :span="22" class="childrenCommentMain">
          <el-row class="childrenCommentInfo">
            <div class="item">
              <!-- 用户信息 -->
              <span class="childrenCommentNick">{{ item.nick }}</span>
              <span class="childrenCommentTo" v-if="item.targetNick">
                回复
                <span class="nick">&nbsp;@{{ item.targetNick }}</span>
                :
              </span>
            </div>
          </el-row>
          <el-row class="childrenCommentContext __md" v-html="item.content">
            <!-- 留言 -->
          </el-row>
          <el-row class="childrenCommentOption">
            <!-- 留言信息 -->
            <span>{{ item.date | dateYmdHms }}</span>
            <a
              :href="`#${item._id}`"
              class="sendTo"
              @click="
                onSendTo(
                  {
                    isMaster: false,
                    messageId: commentData._id,
                    nick: item.nick
                  },
                  index
                )
              "
            >
              回复
            </a>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { createTime } from "~/utils/dateFormat";
export default {
  props: {
    commentData: Object
  },
  inject: ["_d", "_refresh", "_parent"],
  methods: {
    onSendTo(data, index) {
      this._parent.recordingCurrentCommentBlockHandle(
        index === undefined
          ? this.$refs.masterComment
          : this.$refs.childrenComment[index]
      );

      this._refresh(data);

      this.$emit("send-comment");
    }
  },
  filters: {
    dateYmdHms(val) {
      let { year, month, day, hours, millisecond, second } = createTime(
        new Date(val)
      );
      return `${year}-${month}-${day} ${hours}:${millisecond}:${second}`;
    }
  }
};
</script>

<style lang="scss">
.CommentItem {
  margin-top: 10px;
  padding: 5px;
  @mixin nick {
    color: $text-dark;
    font-size: $base;
    font-weight: $w600;
  }
  @mixin context {
    margin-top: 5px;
    font-size: $base;
    color: $text;
  }
  @mixin option {
    margin-top: 5px;
    font-size: $aux;
    color: $text-light;
    > span {
      margin-right: 8px;
    }
  }
  .commentAvatar {
    width: 50px;
    flex: unset;
  }
  .commentMain {
    padding-left: 15px;
    .commentMainNick {
      @include nick;
    }

    .commentMainContext {
      @include context;
    }
    .commentMainOption {
      @include option;
    }
  }
  .childrenComment {
    margin-top: 10px;
    padding: 5px;
    .childrenCommentAvatar {
      width: 20px;
      flex: unset;
      display: flex;
      justify-content: center;
    }
    .childrenCommentMain {
      padding-left: 10px;
    }
    .childrenCommentNick {
      @include nick;
    }
    .childrenCommentTo {
      font-size: $base;
      color: $text-dark;
      margin-left: 8px;
      .nick {
        color: $root;
      }
    }
    .childrenCommentInfo {
      display: flex;
      align-items: center;
      .item {
        margin-right: 10px;
        display: flex;
        align-items: center;
        > * {
          display: flex;
          align-items: center;
        }
      }
    }
    .childrenCommentContext {
      @include context;
      margin-top: 0;
      font-size: $small-base;
    }
    .childrenCommentOption {
      @include option;
    }
  }

  .sendTo {
    cursor: pointer;
    text-decoration: none;
    color: $text-light;
  }
}
</style>
