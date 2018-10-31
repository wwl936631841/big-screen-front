<template>
  <div class="player">
    <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)">
    </video-player>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import posterPicture from "./gph-poster.jpg";
export default {
  name: "NvVideoPlayer",
  props: {
    fileType: {
      type: String
    },
    videoType: {
      type: String,
      default: "video/mp4"
    },
    src: {
      type: String,
      default: "http://vjs.zencdn.net/v/oceans.mp4"
    },
    poster: {
      type: String,
      default: posterPicture // 默认封面地址
      // "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg"
    }
  },
  data() {
    return {
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            // type: "application/x-mpegURL",
            // src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8" //你的m3u8地址（必填）
            type: "video/mp4",
            src: "http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L" //
          }
        ],
        poster:
          posterPicture,
          /* "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-3.jpg", //你的封面地址 */
        height: "360",
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  mounted() {
    const me = this;
    /*  if (me.videoType) { */
    me.playerOptions.sources = [
      {
        type: me.videoType,
        src: me.src
      }
    ];
    /*}  else {
      var videoType = "";
      if (me.fileType.toLowerCase() === ".mp4") {
        videoType = "video/mp4";
      } else if (me.fileType.toLowerCase() === ".avi") {
        videoType = "video/msvideo";
      } else if (me.fileType.toLowerCase() === ".m3u8") {
        videoType = "application/x-mpegURL";
      } else if (me.fileType.toLowerCase() === ".swf") {
        videoType = "application/x-shockwave-flash";
      } else if (me.fileType.toLowerCase() === ".mov") {
        videoType = "video/quicktime";
      } else if (me.fileType.toLowerCase() === ".3gp") {
        videoType = "video/3gp";
      } else if (
        me.fileType.toLowerCase() === ".mpg" ||
        me.fileType.toLowerCase() === ".mpeg"
      ) {
        videoType = "video/mpeg";
      } else {
        videoType = "video/mp4";
      }
      me.playerOptions.sources = [
        {
          type: videoType,
          src: me.src
        }
      ];
    } */

    me.playerOptions.poster = me.poster;
    this.player.muted(false);
  },
  components: { videoPlayer },
  methods: {
    onPlayerPlay(player) {
      console.log("player");
    },
    onPlayerPause(player) {
      //alert("pause");
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
.player {
  background-color: #efefef;
  min-height: 100%;
}
</style>
