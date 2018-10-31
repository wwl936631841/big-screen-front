import NvUploader from './uploader'

NvUploader.install = function(Vue) {
  Vue.component(NvUploader.name, NvUploader)
}

import './style.scss'

export default NvUploader