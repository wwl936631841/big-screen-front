import NvUploader from './src/uploader'

NvUploader.install = function(Vue) {
  Vue.component(NvUploader.name, NvUploader)
}

export default NvUploader