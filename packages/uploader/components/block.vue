<template>
<div>
  <div  class="files-wrapper">
          <div v-for="file in files"  :key="file.ID" class="file-item_wrapper">
            <div class="file_item file-type" :class="file.IS_DIRECTORY === 'YES' ? 'folder':file.FILE_TYPE.substring(1)" @click="handleFileClick(files,file)" @contextmenu.prevent="showPopover(files,file)">
                <el-checkbox v-model="file.isChecked" @click.native.stop="() => {}" :class ="{isChecked:file.isChecked}" />
                <div class="file_status" :class="['audit','archived', 'returned'][parseInt(file.FILE_STATUS) - 1]" v-if="file.IS_DIRECTORY !== 'YES'">
                    <span v-if="file.FILE_STATUS === '0'">未移交</span>
                    <a class="file-name" @click.stop="handReview(file,0)">
                      <span> {{ ['待审核', '已归档', '被退回'][parseInt(file.FILE_STATUS) - 1] }}  </span>
                    </a>           
                </div>
                <el-popover
                  v-model="file.isShowPopover" 
                  width = '500px'
                >
                  <div class="file_popover--inner">
                      <div @click="handleDownload(file)" v-if="file.permission.download">下载</div>
                      <div @click="handleDelete(file)"  v-if="file.permission.delete">删除</div>
                      <div @click="handleReMove(file)"  v-if="file.permission.move">移动到</div>
                      <div @click="handOnToDialog(file)"  v-if="file.permission.deliver">移交</div>

                      <div @click="handReview(file,1)"  v-if="file.permission.review==userName">审核</div>
                      <div hid></div>
                  </div>
                </el-popover>
            </div>
            <input v-model="file.BK_NAME" placeholder="文件标题" class="file_name" @change="handleReNameComfirm(file);" :minlength="1" :maxlength="50" @keyup.enter.native="handleReNameComfirm(file)" :readonly="!file.permission.rename"/>
          </div>
  </div>
  <div class="file_badge">
    <el-badge is-dot class="file_tips">温馨提示：在文件夹/文件区域鼠标右击弹出相关操作权限！</el-badge>
  </div>
</div>
</template>
<script>
import vuex, { mapGetters, mapActions } from 'vuex';
export default {
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  data () {
      return {
          isAllSelected: false,
      }
  },
   computed: {
        ...vuex.mapState('user', {
            userName: state => state.profile.userName
        })
    },
  methods: {
      handleFileClick (files,file) {
          let into = false;
          files.map(f => { 
              if(f.isShowPopover){
                f.isShowPopover = false;
                into = true;
              }
          })
          if(into) return;
          this.$emit('nv-event' ,'setParentCode', file.ID, file.NAME,file.IS_DIRECTORY)
      },
      handleReMove (file) {
        this.$emit('nv-event', 'moveFolderTo', file)
      },
      handleDelete (file) {
        this.$emit('nv-event', 'removeItem', file)
      },
      handleDownload (file) {
        this.$emit('nv-event', 'download', file)
      },
      handOnToDialog (file) {
          this.$emit('nv-event', 'handOnToDialog', file)
      },
      handReview (file,isShow) {
            this.$emit('nv-event', 'reviewedDialog', file,isShow)
      },
      handleReNameComfirm (file) {
        if(file.BK_NAME.trim().length < 1 || !file.permission.rename){
          file.BK_NAME = file.NAME;
          return;
        }
        let newName = file.IS_DIRECTORY == "YES" ? file.BK_NAME : file.BK_NAME.substring(0, file.BK_NAME.lastIndexOf("."));
        this.$emit('nv-event', 'modifyComplete', file, newName);
     },
     showPopover (files,file) {
          files.map(f => { 
              f.isShowPopover = false;
          })
          file.isShowPopover = true;
     }
  }
};
</script>
<style lang="scss" scoped>

.file_item {
    position: relative;
    cursor: pointer;
}

.file {
  &-tool {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 40px;
    width: 40px;
    border: 1px solid red;
    color: blue;
    line-height: 40px;
    font-size: 60px;
  }

  &_status {
    writing-mode:tb-rl;
    font-size: 14px;
    vertical-align: middle;
    height: 58px;
    line-height: 24px;
    color: #fff;
    background-color: #FECA43;
    border: 1px solid #FECA43;
    position: absolute;
    right: 10px;
    &:after {
      z-index: 100;
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      border-bottom: 12px solid #fff;
      border-right: 12px solid transparent;
      border-left: 12px solid transparent; 
    }

    &.archived {
      background-color:#4EC781;
      border-color: #4EC781;
    }

    &.audit {
      background-color:#3096FA;
      border-color: #3096FA;
    }

    &.returned {
      background-color:#DD5044;
      border-color: #DD5044;
    }
  }

  &_popover--inner {
    > div {
      cursor: pointer;
      color: #3c8cff;
      padding: 3px 2px;
    }
  }
}

.file-type {
    background-repeat: no-repeat;
    background-position: center;
    &.folder {
        background-image: url('./assets/folder.png')
    }
    &.pdf {
        background-image: url('./assets/pdf-new.png')
    }
    &.word {
        background-image: url('./assets/word.png')
    }
    &.xlsx {
        background-image: url('./assets/xlsx.png')
    }
    &.xls {
        background-image: url('./assets/xlsx.png')
    }
}

.files-wrapper {
  display: flex;
  flex-wrap: wrap;


  .file-item_wrapper {
    margin-bottom: 20px;
    margin-left: 30px;
    .file_item {
      border: 1px solid #ccc;
      border-radius: 4px; 
      width: 160px;
      height: 160px;
      display: block;
      margin-bottom: 15px;
      position: relative;
      img.file_format {
        width: 64px;
        height: 72px;
        overflow: hidden;
        margin: 73px auto;
        display: block;
      }
      .el-checkbox {
        position: absolute;
        left: 0;
        top: -1px;
        display: none;
        &.isChecked {
          display: block;
        }
      }
      .el-button-group {
        position: absolute;
        bottom: 10px;
        left: 54px;
        display: none;
      }
    }
    .file_item:hover {
      border: 1px solid #9dc851;
      .el-checkbox {
        display: block;
      }
      .el-button-group {
        display: block;
      }
    }
    .file_name {
      text-align: center !important;
      height: 32px;
      width: 100%;
      border: none;
      font-size:12px;
    }
    .file_name:hover {
      background-color: #f5f5f5;
    }
  }
}
.file_badge {
  text-align: center;
  font-size: 12px;
}
.file_tips {
  margin-top: 10px;
  margin-right: 40px;
}
</style>


