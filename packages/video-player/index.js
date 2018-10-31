// import 'videojs-contrib-hls/dist/videojs-contrib-hls'
import NvVideo from './video-player'
NvVideo.install = function (Vue) {
  Vue.component(NvVideo.name, NvVideo)
}

export default NvVideo

// 第一个是videoJs的样式，后一个是vue-video-player的样式，因为考虑到我其他业务组件可能也会用到视频播放，所以就放在了entry.js内
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

//把VueVideoPlayer导入并挂在到vue上
// import VideoPlayer from 'vue-video-player'
// Vue.use(VideoPlayer);

//增加hls支持
// import dayjs from 'dayjs'
// Vue.prototype.dayjs = dayjs
