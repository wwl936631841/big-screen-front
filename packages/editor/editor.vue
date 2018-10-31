<template>
  <div :id="id">
  </div>
</template>
<script>

import Editor from 'wangeditor'
import { mapState } from 'vuex'
import index from 'vue';
export default {
  name: 'NvEditor',
  props: {
    value: {

    },
    disabled:{
      type:Boolean,
      default:false
    },
    uploadImgServer: {
      type: String,
      default: '/file/upload/project/type'
    },
    previewUrlPrefix: {
      type: String,
      default: '/file'
    },
    format: {
      type: String,
      default: 'html'
    },
    menus: {
      type: Array,
      default () {
        return [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ]
      }
    }
  },
  data () {
    return {
      editor: null,
      id: (function randomId(id) {
        id += ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f'][ Math.floor(Math.random() * 16)]
        return id.length > 10 ? id : randomId(id)
      })('')
    }
  },
  mounted () {
    const self = this
    const { id, value, uploadImgServer, token, menus } = self
    const editor = new Editor(this.$el)
    editor.customConfig = {
      menus,
      onchange (html) {
        self.currentValue = html
      },
      zIndex: 99,
      customUploadImg (files, insert) {
        const formData = new FormData()

        formData.append('file', files[0])
        formData.append('projectId', 'editor')
        formData.append('type', undefined)

        console.log(files)

        unfetch.post(uploadImgServer, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          transformRequest: [function (data) {
              return data
          }],
        }).then(({ data }) => {
          const { previewUrlPrefix } = self
          const { FILE_PATH } = data
          insert( `${previewUrlPrefix}/${FILE_PATH}`.replace(/\/\//g, '/') )
        })
      },
      debug : true
    }
    editor.create()
    editor.txt.html(value)
    // 禁用编辑功能
    editor.$textElem.attr('contenteditable', !(self.disabled !== undefined ? self.disabled : self.$route.query['nv-view'] === 'true'));
    self.editor = editor
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
    ...mapState('user', {
      token: state => state.token
    }),

  },
  watch: {
    value (val) {
      this.editor.txt.html(val)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>


