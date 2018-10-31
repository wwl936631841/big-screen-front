<template>
    <el-table :data="files" ref="multipleTable" @selection-change="handleSelectionChange" fit highlight-current-row>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="序号" width="50" align="center">
              <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
              </template>
        </el-table-column>
        <el-table-column align="center" label="" width="40">
            <template slot-scope="scope" @click="setParentCode(scope.row.ID, scope.row.NAME,scope.row.IS_DIRECTORY)">
            <i v-if="scope.row.IS_DIRECTORY == 'YES'" class="png-icon file-folder"/> 
            <i v-else class="png-icon" :class="scope.row.FILE_TYPE | FileIconFilter"/>
            </template>
        </el-table-column>
        <el-table-column align="left" label='名称'>
            <template slot-scope="scope">
                <span class="file_name">
                    <a class="file-label" v-show="!scope.row.isEdit" @click="handleFileClick(scope.row)" :title="scope.row.NAME">{{scope.row.NAME}}</a>
                    <span class="file-input" v-if="scope.row.isEdit">
                        <span style="float: left; margin-bottom: 5px"><el-input id="" size="small" style="width: 310px" v-model="newName" :minlength="1" :maxlength="50" @keyup.enter.native="handleReNameComfirm(scope.row)"></el-input></span>
                        <span style="float: left; margin-left: 10px"><el-button type="primary" size="mini" @click="handleReNameComfirm(scope.row)" :disabled="newName.length<1">确认</el-button></span>
                        <span style="float: left; margin-left: 5px"><el-button type="primary" size="mini" @click="scope.row.isEdit = false">取消</el-button></span>
                    </span>
                </span>
            </template>
        </el-table-column>
    
        <el-table-column label="文件状态"  align="center" width="100">
            <template slot-scope="scope">
                    <span v-if=" scope.row.IS_DIRECTORY === 'YES'">-</span>
                    <span v-if="scope.row.FILE_STATUS === '0'">未移交</span>
                    <a class="file-name" @click.stop="handReview(scope.row,0)">
                      <span> {{ ['待审核', '已归档', '被退回'][parseInt(scope.row.FILE_STATUS) - 1] }}  </span>
                    </a>         
            </template>
        </el-table-column>
        <el-table-column label="大小"  align="center" width="100">
            <template slot-scope="scope">
                <span v-if=" scope.row.IS_DIRECTORY === 'YES'">-</span>
                <span v-else>{{ scope.row.FILE_SIZE | FileSizeFormat }}</span>
            </template>
        </el-table-column>
        <el-table-column label="创建者" align="center" width="150">
            <template slot-scope="scope">
                <span>{{ scope.row.USER_NAME }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" width="180">
            <template slot-scope="scope">
                <span>{{scope.row.CREATE_TIME | DateTimeFilter(0)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="" width="180">
            <template slot-scope="scope">
                <i title="重命名" class="png-icon cursor file-rename small" @click="handleReName(scope.row)" v-if="scope.row.permission.rename"></i>
                <i title="下载" class="png-icon cursor file-upload  small" @click="handleDownload(scope.row)" v-if="scope.row.permission.download"></i>
                <i title="删除" class="png-icon cursor file-delete small" @click="handleDelete(scope.row)" v-if="scope.row.permission.delete"></i>
                <i title="移动到" class="png-icon cursor file-txt small" @click="handleReMove(scope.row)"  v-if="scope.row.permission.move"></i>
                <i title="移交" class="png-icon cursor file-handon small" @click="handOnToDialog(scope.row)"  v-if="scope.row.permission.deliver"></i>

                <i title="审核" class="png-icon cursor file-folder small" @click="handReview(scope.row,1)"  v-if="scope.row.permission.review==user_name"></i>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import vuex, { mapGetters, mapActions } from 'vuex';
export default {
    props: {
        files: {
            type: Array,
            required: true,
        },
        userName: {

        }
    },
    data () {
        return {
            newName: '',
            silentSelection: false,
            // user_name:null
        }
    },
    mounted () {
        this.updateSelection()
    },
    computed: {
        ...vuex.mapState('user', {
            user_name: state => state.profile.userName
        })
    },
    methods: {
        updateSelection () {
            const self = this
            self.silentSelection = true
            self.files.forEach(file => {
                self.$refs.multipleTable.toggleRowSelection(file, file.isChecked)
            })
            self.silentSelection = false
        },
        handleSelectionChange (files) {
            const self = this
            if (!self.silentSelection) {
                self.files.map(file => file.isChecked = false)
                files.map(file => file.isChecked  = true)
            }
        },
        handleFileClick (file) {
          this.$emit('nv-event' ,'setParentCode', file.ID, file.NAME,file.IS_DIRECTORY)
        },
        handleReName (file) {
            const self = this
            const { files } = self
                files.forEach(item => {
                item.isEdit = false
            })
            self.newName = file.IS_DIRECTORY == "YES" ? file.NAME : file.NAME.substring(0, file.NAME.lastIndexOf("."));
            file.isEdit = true;
        },
        handleReNameComfirm (file) {
            this.$emit('nv-event', 'modifyComplete', file, this.newName)
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
        }
    },
}
</script>
<style lang="scss" scoped>
    .file {
        &_name {
            cursor: pointer;
        }
    }
</style>