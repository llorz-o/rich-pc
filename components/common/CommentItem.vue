<template>
  <el-row type="flex" class="CommentItem" v-if="commentData">
    <el-col :span="1" class="commentAvatar">
      <el-avatar fit="cover" :size="50" :src="commentData.avatar | img" />
    </el-col>
    <el-col class="commentMain">
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
        <span
          class="sendTo"
          @click="
            onSendTo({
              messageId: commentData._id,
              isMaster: false,
              nick: commentData.nick
            })
          "
        >
          回复
        </span>
      </el-row>
      <el-row
        type="flex"
        align="center"
        class="childrenComment"
        v-for="(item, index) in commentData.children"
        :key="index"
      >
        <!-- 子留言 -->
        <el-col :span="1" class="childrenCommentAvatar">
          <el-avatar fit="cover" :size="20" :src="item.avatar | img" />
        </el-col>
        <el-col :span="23" class="childrenCommentMain">
          <el-row class="childrenCommentInfo">
            <div class="item">
              <!-- 用户信息 -->
              <span class="childrenCommentNick">{{ item.nick }}</span>
              <span class="childrenCommentTo" v-if="item.to">
                回复
                <span class="nick">&nbsp;@{{ item.to }}</span>
                :
              </span>
            </div>
            <div class="item childrenCommentContext __md" v-html="item.content">
              <!-- 留言 -->
            </div>
          </el-row>
          <el-row class="childrenCommentOption">
            <!-- 留言信息 -->
            <span>{{ item.date | dateYmdHms }}</span>
            <span
              class="sendTo"
              @click="
                onSendTo({
                  id: item._id,
                  isMaster: false,
                  messageId: commentData._id,
                  nick: item.nick
                })
              "
              >回复</span
            >
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { createTime } from "~/utils/dateFomat";
export default {
  props: {
    commentData: Object
  },
  inject: ["_d", "_refresh"],
  methods: {
    onSendTo(data) {
      this._refresh(data);
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

    .childrenCommentAvatar {
      width: 20px;
      flex: unset;
      display: flex;
      justify-content: center;
      align-items: center;
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
      .childrenCommentContext {
        @include context;
        margin-top: 0;
      }
    }
    .childrenCommentOption {
      @include option;
    }
  }

  .sendTo {
    cursor: pointer;
  }
}
</style>
