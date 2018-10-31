<template>
  <div>
    <div class="top">
      <el-select v-model="TYPE_SMALL" placeholder="请选择" clearable v-show="options != ''" style="width: 300px;float: left; margin-right: 30px" @change="getList()">
        <el-option v-for="item in options" :key="item.VALUE" :label="item.NAME" :value="item.VALUE">
        </el-option>
      </el-select>
      <el-upload class="upload-table__upload--btn" :action="uploadURL" v-if="canUpload" :on-success="success" :before-upload="beforeUpload" :headers="uploadHeaders" :data="fileData" :show-file-list="false" :multiple=true accept=".jpg, .jpeg, .png, .gif, .rar, .zip, .doc, .docx, .xls, .xlsx,  .ppt, .pptx, .pdf, .txt, .wps, .avi,.mp4,.3gp,.wmv,.mpg">
        <el-button type="primary">上传</el-button>
      </el-upload>
    </div>

    <div style="margin-top: 10px">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-table-column label="序号" type="index" align="center" width="60%" />
        <el-table-column label="文件名称" min-width="30%">
          <template slot-scope="scope">
            <!-- <a class="file-label" @click="fileViewOrUpload(scope.row)">{{ scope.row.FILE_NAME }}</a> -->
            <span class="file-label nv-link" type="text" @click="fileViewOrUpload(scope.row)">{{ scope.row.FILE_NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文件大小" prop="SIZE" min-width="16%" />
        <el-table-column label="文件类型" prop="FILE_TYPE" min-width="16%" />
        <el-table-column label="上传时间" prop="CREATE_TIME" min-width="20%" />
        <el-table-column label="操作" align="center" min-width="18%">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="deleteFile(scope.row)" v-if="canOperate">删除</el-button>
            <slot name="extra" :file="scope.row" />
            <el-button size="small" type="primary" @click="download(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  selectOptionByFileType,
  selectByFileType,
  FileDelete,
  FileView,
  FileAdd,
  FileUpload
} from "./api";
import { mapState } from "vuex";
export default {
  name: "NvFormUploader",
  data() {
    return {
      listLoading: false,
      //uploadURL: 'api/file/upload',
      /* 参数remotePath是上传到FTP服务器上的最后一层目录，remotePath=/video/，说明文件被存放在/ftp/dev/manage/video中（%2F 为 / 经encodeURI编码后的）
       * isOnlyAllowVideoFile: 是否只允许上传视频格式文件
       */
      uploadURL:
        "api/fileWithftp/upload?remotePath=" +
        (this.TYPE_BIG ? "%2F" + this.TYPE_BIG + "%2F" : null) +
        "&isOnlyAllowVideoFile=" +
        this.isOnlyAllowVideoFile,
      TYPE_SMALL: null,
      list: [],
      options: [],
      fileData: {},
      uploadHeaders: {}
    };
  },
  props: {
    canUpload: {
      type: Boolean,
      default: true
    },
    canOperate: {
      type: Boolean,
      default: true
    },
    // 项目ID，默认为''
    projectId: {
      type: String,
      require: false,
      default: ""
    },
    // 是否需要加入到ES系统中，默认为NO
    needIndex: {
      type: String,
      require: false,
      default: "NO"
    },
    // 文件上传的大类别（TYPE_BIG不能跟其他地方的文件上传的类别重名）
    TYPE_BIG: {
      type: String,
      require: true,
      default: ""
    },
    // 要查询的表名（当是要查询其他数据库中的文件时启用此参数）
    TABLE_NAME: {
      type: String,
      require: false,
      default: ""
    },
    // 要查询的表名所在的系统URL地址（如：http://192.168.37.6:8580/manage/file/）
    FILE_URL_PRE: {
      type: String,
      require: false,
      default: ""
    },
    // 要查询的表名所在的项目根路径（如：/manage/）
    FILE_ROOT_PATH: {
      type: String,
      require: false,
      default: ""
    },
    // 是否只允许上传视频格式文件
    isOnlyAllowVideoFile: {
      default: "false"
    }
  },
  mounted() {
    (this.uploadHeaders = {
      Authorization: this.token
    }),
      (this.fileData = {
        projectId: this.projectId
      });
  },
  computed: {
    ...mapState("user", {
      token: state => state.token
    })
  },
  created() {
    this.getList();
    this.getOptionList();
  },
  methods: {
    getList() {
      const self = this;

      const { TYPE_BIG, TYPE_SMALL, TABLE_NAME } = self;
      const PROJECT_ID = self.projectId;

      //文档类型与业务ID不可为空
      if (TYPE_BIG && PROJECT_ID) {
        self.listLoading = true;
        selectByFileType({ TYPE_BIG, TYPE_SMALL, PROJECT_ID, TABLE_NAME })
          .then(({ data }) => {
            self.listLoading = false;
            self.list = (data || []).map(item => {
              item.SIZE = self.convertUnit(item.FILE_SIZE);
              return item;
            });
          })
          .catch(err => {
            self.listLoading = false;
            console.log(err);
          });
      }
    },

    // 文件大小 单位转换
    convertUnit(fileSize) {
      if (fileSize === null || fileSize === "") {
        return;
      }
      var size = "";
      if (fileSize < 0.1 * 1024) {
        //如果小于0.1KB转化成B
        size = fileSize.toFixed(2) + "B";
      } else if (fileSize < 0.1 * 1024 * 1024) {
        //如果小于0.1MB转化成KB
        size = (fileSize / 1024).toFixed(2) + "KB";
      } else if (fileSize < 0.1 * 1024 * 1024 * 1024) {
        //如果小于0.1GB转化成MB
        size = (fileSize / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        //其他转化成GB
        size = (fileSize / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }

      var sizeStr = size + "";
      var len = sizeStr.indexOf(".");
      var dec = sizeStr.substr(len + 1, 2);
      if (dec == "00") {
        //当小数点后为00时 去掉小数部分
        return sizeStr.substring(0, len) + sizeStr.substr(len + 3, 2);
      }
      return sizeStr;
    },

    // 查询选项的值
    getOptionList() {
      const self = this;
      const { TYPE_BIG } = self;
      selectOptionByFileType({ TYPE_CODE: TYPE_BIG })
        .then(({ data }) => {
          self.listLoading = false;
          self.options = data || [];
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 删除文件
    deleteFile(row) {
      const self = this;
      self
        .$confirm("删除后将不可恢复，是否确定要删除此文件?", "提示", {
          confirmButtonText: "确定",
          concelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          const params = {
            ID: row.ID, // 文件ID
            isForceDelFile: true // 是否删除服务器上的文件
          };
          FileDelete(params)
            .then(() => {
              self.$message.success("删除成功");
              self.getList();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // me.$message.info("已取消删除");
        });
    },

    // 下载文件
    download(row) {
      //unfetch.download('file/download', {
      unfetch.download("fileWithftp/download", {
        params: {
          ID: row.ID,
          TABLE_NAME: this.TABLE_NAME // 要查询的表名（当是要查询其他数据库中的文件时启用此参数）
        }
      });
    },

    goDictionaryData(row) {
      this.$router.push({
        path: "/document/upload/data",
        query: { CODE: "SHENPI", NAME: row.NAME }
      });
    },

    // 文件预览或下载
    fileViewOrUpload(row) {
      let req = {
        FILE_ID: row.ID,
        TABLE_NAME: this.TABLE_NAME, // 要查询的表名（当是要查询其他数据库中的文件时启用此参数）
        FILE_URL_PRE: this.FILE_URL_PRE, // 要查询的表名所在的系统URL地址（如：http://192.168.37.6:8580/manage/file/）
        FILE_ROOT_PATH: this.FILE_ROOT_PATH // 要查询的表名所在的项目根路径（如：/manage/）
      };
      this.listLoading = true;
      FileView(req)
        .then(({ data }) => {
          this.listLoading = false;
          let me = this;
          let url = data.fileUrl + data.filePath;
          unfetch.open(url);
        })
        .catch(err => {
          this.listLoading = false;
          if (err) {
            this.$message.error(err.msg);
          } else {
            this.$message.error("预览失败！");
          }
          // console.error(err);
        });
      return;
    },

    // 上传成功后进行的操作
    success(resp) {
      this.listLoading = false;
      let self = this;
      let { code, data, msg } = resp;
      if (code == 0) {
        let item = Object.assign({}, data, {
          PROJECT_ID: this.projectId,
          TYPE_BIG: this.TYPE_BIG,
          TYPE_SMALL: this.TYPE_SMALL,
          NEED_INDEX: this.needIndex
        });
        let arr = [];
        arr.push(item);
        FileAdd(arr)
          .then(resp => {
            let { code, data, msg } = resp.rawData;
            if (code == 0) {
              // this.isUploading = false;
              self.$message.success("上传成功");
              self.getList();
            } else {
              self.$message.error(msg);
            }
          })
          .catch(() => {
            // this.isUploading = false
          });
      } else {
        // this.isUploading = false
        this.$message.info(msg);
      }
    },

    // 文件上传前调用
    beforeUpload(file) {
      this.listLoading = true;
      if (file && file.size) {
        let size = file.size / 1024;
        if (size > 100000) {
          this.listLoading = false;
          this.$message.error("上传文件不能超过100M");
          return false;
        }
      }
    }
  },
  watch: {
    projectId(val) {
      if (val) this.getList();
    },
    // 当一个台账中存在两个文件上传时，通过监听type的变化重新进行请求
    TYPE_BIG(val) {
      if (val) this.getList();
    },
    isOnlyAllowVideoFile(val) {
      if (val) {
        this.uploadURL =
          "api/fileWithftp/upload?remotePath=" +
          (this.TYPE_BIG ? "%2F" + this.TYPE_BIG + "%2F" : null) +
          "&isOnlyAllowVideoFile=" +
          (this.isOnlyAllowVideoFile ? this.isOnlyAllowVideoFile : null);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.file-label {
  float: left;
  width: 520px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.top {
  overflow: hidden;
  margin-top: -20px;
}
.upload-table__upload--btn {
  float: right;
}
</style>

