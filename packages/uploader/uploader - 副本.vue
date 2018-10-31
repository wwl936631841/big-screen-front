<template>
    <div class="upload-table" v-loading.body="isUploading" element-loading-text="正在上传中，请稍等......">
        <section class="upload-table__from"><!-- isShowCreate -->
            <el-button @click="createdNewFolder" type="primary" :disabled ="isSearch" v-show="true">
                新建文件夹
            </el-button>
            <el-button @click="deleteSelectedAndChildren" type="primary" v-show="isShowDelete">
                删除
            </el-button>
            <el-button @click="downloadChooseRows" type="primary" v-show="isShowDownload">
                下载
            </el-button>
            <el-button   @click="batchHandOnToDialog()" v-show="levelList.length" type="primary">
                移交
            </el-button>
          
            <el-upload  class="upload-table__upload--btn" :action="uploadURL" 
              :on-success="success" 
              :before-upload="beforeUpload"
              :on-error = "errorUpload" 
              :headers="uploadHeaders" :data="fileData" 
              :show-file-list="false" 
              accept=".jpg, .jpeg, .png, .gif, .rar, .zip, .doc, .docx, .xls, .xlsx,  .ppt, .pptx, .pdf, .txt, .wps">
                <el-button  type="primary" v-show="levelList.length > 1 && showUpload && isShowUpload">上传</el-button>
            </el-upload>
            <el-input style="float: right; width:300px" icon="search"
                placeholder="请输入关键字" 
                v-model="fileName" 
                @keyup.enter.native="search" >
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </section>

        <!-- 面包屑导航 -->
        <div style="margin-top: 20px; margin-bottom: 20px; font-size: 14px">
            <el-breadcrumb class="app-levelbar" separator=" > ">
                <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.id">
                    <span v-if='index==levelList.length-1'>{{item.name}}</span>
                    <span v-else @click="setParentCode(item.id, item.name, 'delete', item)">{{item.name}}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label" name="first" ><i class="el-icon-tickets"/></span>
            <list-shape 
              :files="list"
              :user-name = "userName"
              @nv-event="handleNvEvent"
              /> 
            <!-- 文件列表 -->
            <!-- <el-table :data="list" ref="multipleTable" v-loading="listLoading" @selection-change="handleSelectionChange" fit highlight-current-row>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column align="center" label="" width="40">
                  <template slot-scope="scope" @click="setParentCode(scope.row.ID, scope.row.NAME,scope.row.IS_DIRECTORY)">
                    <i v-if="scope.row.IS_DIRECTORY == 'YES'" class="png-icon file-folder"/> 
                    <i v-else class="png-icon" :class="scope.row.FILE_TYPE | FileIconFilter"/>
                  </template>
                </el-table-column>
                <el-table-column align="left" label='名称'>
                    <template slot-scope="scope">
                        <span class="file-name">
                            <a class="file-label" v-show="!scope.row.isEdit" @click="setParentCode(scope.row.ID, scope.row.NAME,scope.row.IS_DIRECTORY)" :title="scope.row.NAME">{{scope.row.NAME}}</a>
                            <span class="file-input" v-if="scope.row.isEdit">
                              <span style="float: left; margin-bottom: 5px"><el-input id="" size="small" style="width: 310px" v-model="rename" :minlength="1" :maxlength="50" @keyup.enter.native="modifyComplete(scope.row)"></el-input></span>
                              <span style="float: left; margin-left: 10px"><el-button type="primary" size="mini" @click="modifyComplete(scope.row)" :disabled="rename.length<1">确认</el-button></span>
                              <span style="float: left; margin-left: 5px"><el-button type="primary" size="mini" @click="scope.row.isEdit = false">取消</el-button></span>
                            </span>
                        </span>
                    </template>
                </el-table-column>
            
                <el-table-column label="文件状态"  align="center" width="100">
                    <template slot-scope="scope">
                      
                        <span v-if=" scope.row.IS_DIRECTORY === 'YES'">-</span>
                        
                          <span v-if="scope.row.FILE_STATUS === '0'"><div class="reply-user">未移交</div></span>
                          <a class="file-name" @click="reviewedDialog(scope.row,0)">
                          <span v-if="scope.row.FILE_STATUS === '1'"><div class="reply-user">待审核</div></span>
                          <span v-if="scope.row.FILE_STATUS === '2'"><div class="reply-user">已归档</div></span>
                          <span v-if="scope.row.FILE_STATUS === '3'"><div class="reply-user">被退回</div></span>
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
                        <i title="重命名" class="png-icon file-rename small" @click="reName(scope.row)" v-if="scope.row.FILE_STATUS==3 ||  scope.row.FILE_STATUS==0 || scope.row.IS_DIRECTORY == 'YES'"></i>
                        <i title="下载" class="png-icon file-upload  small" @click="download(scope.row)"></i>
                        <i title="删除" class="png-icon file-delete small" @click="removeItem(scope.row)" v-if="scope.row.FILE_STATUS==3 || scope.row.FILE_STATUS==0 || scope.row.IS_DIRECTORY == 'YES'"></i>
                        <i title="移动到" class="png-icon file-txt small" @click="moveFolderTo(scope.row)" v-if="scope.row.IS_DIRECTORY == 'NO' && scope.row.FILE_STATUS==3 || scope.row.IS_DIRECTORY == 'NO' && scope.row.FILE_STATUS==0"></i>
                        <i title="移交" class="png-icon file-handon small" @click="handOnToDialog(scope.row)" v-if="userName==scope.row.CREATE_USER && scope.row.IS_DIRECTORY == 'NO' && scope.row.FILE_STATUS==0 || userName==scope.row.CREATE_USER && scope.row.IS_DIRECTORY == 'NO' && scope.row.FILE_STATUS==3"></i>
                        <i title="审核" class="png-icon file-folder small" @click="reviewedDialog(scope.row,1)" v-if="scope.row.IS_DIRECTORY == 'NO'  && scope.row.FILE_STATUS==1 && userName==scope.row.RECIPIENT"></i>
                    </template>
                </el-table-column>
            </el-table> -->
          </el-tab-pane>

          <el-tab-pane>
            <block-shape :files="list" @nv-event="handleNvEvent"/>
            <span slot="label" name="second" ><i class="el-icon-menu"></i></span>
          </el-tab-pane>
        </el-tabs>
        <div class="home-detail__page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper, slot"
                :total="totalCount">
                <el-button> 确定 </el-button>
            </el-pagination>
        </div>
        
        
        <el-dialog title="新建文件夹" :visible.sync="dialogFormVisible">
            <el-form label-width="120px">
                <el-form-item label="文件夹名称" >
                <el-input v-model="newFolderName" auto-complete="off" placeholder="请输入文件夹名称" @keyup.enter.native="confirmToAddFolder"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align:center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmToAddFolder" :disabled="newFolderName.length < 1">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="移至文件" :visible.sync="isSelectUserDialog" width="800px">
          <nv-person-choose ref="personchoose" :result="currentChooseList" @sync-result="syncResult"  @get-choose-person="getChoosePerson" @cancel-choose-person="cancelChoose" ></nv-person-choose>
        </el-dialog>
         
         <el-dialog class="dia_scroll" title="移动文件夹" :lock-scroll="false" :visible.sync="moveFormVisible" width="35%">
            <el-tree class="tree-folder"  :data="folderList"  node-key="ID" :default-expanded-keys="[0]" :check-strictly="true"  :highlight-current="true"   ref="selectTree" :props="defaultProps" @node-click="handleNodeClick"  @node-expand="defaultCheck" :expand-on-click-node='false' ></el-tree>
            <div slot="footer" style="text-align:center">
                <el-button @click="moveFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="moveConfirm" >确 定</el-button>
            </div>
        </el-dialog>
         <el-dialog class="dia_adopt_scroll" style="height:920px;" title="审核详情" :lock-scroll="false" :visible.sync="reviewedFormVisible" width="50%">
      
        <el-form ref="form" :model="reviewedForm" label-width="120px">
          <el-row type="flex" class="grid-content bg-purple">
            <el-col :span="12">
              <a class="file-label"  @click="setParentCode(reviewedForm.ID, reviewedForm.NAME,moveForm.IS_DIRECTORY)">{{reviewedForm.NAME }}</a>
          </el-col>
              <el-col :span="4">
                {{reviewedForm.FILE_SIZE}}
          </el-col>
              <el-col :span="4">
                {{ reviewedForm.USER_NAME }}
          </el-col>
            <el-col :span="4">
        <i title="下载" class="png-icon file-upload  small" @click="download(reviewedForm)"></i>
          </el-col>
          </el-row>
          
          <el-row type="flex">
            <el-col :span="24">
                <span v-if="isShowTextArea==1">
              <el-form-item label="审核意见">
                <el-input  type="textarea" :rows="6" placeholder="审核意见" v-model="reviewedForm.OPINION"></el-input>
              </el-form-item>
                </span>
            </el-col>
            
          </el-row>
      </el-form>
			

       <el-card class="box-card reply-card">
				<div slot="header" class="clearfix">
					<span>审核记录</span>
				</div>
	         <div v-for="item in adoptList" :key="item.ID" class="replyList">
						<el-row  type="flex" class="row-bg replyList__header" justify="space-between">
							<el-col :span="12">
								<span v-if="item.FILE_STATUS==1">已移交，{{item.OPINION}}</span>
								<span v-if="item.FILE_STATUS==2">审核通过，{{item.OPINION}}</span>
								<span v-if="item.FILE_STATUS==3">驳回，{{item.OPINION}}</span>
							</el-col>
							<el-col :span="12" class="reply-date" style="text-align: right;">
								<span>&nbsp;&nbsp;</span>
							</el-col>
						</el-row>
						<el-row class="reply-content" :gutter="20">
							<el-col :span="12">
								<span>操作人 {{item.USER_NAME}}</span>
							</el-col>
							<el-col :span="12" style="text-align: right;">
								<span type="primary" >{{item.CREATE_TIME || DateTimeFilter(0)}}</span>
							</el-col>
						</el-row>
					</div>
					</el-card>
            <div slot="footer" style="text-align:center">
              <span v-if="isShowTextArea==1">
                <el-button type="primary" @click="adoptConfirm(3)" >驳回</el-button>
                <el-button type="primary" @click="adoptConfirm(2)" >通过</el-button>
                </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import vuex, { mapGetters, mapActions } from 'vuex';
  import { getTreeDocuments, FileRename, FileDelete, FileAdd, FileDownload, FileCreatedNewFolder,FileRenameFolder,FileDeleteFolder,deleteDirAndFiles,FileView,
  getFolderList,moveFolder,batchSaveFileArchive,saveFileArchive,getOperatePermission,adoptSave,getAdoptList} from './api';
  import BlockShape from './components/block'
  import ListShape from './components/list'
  export default {
    name: 'NvUploader',
    components: { BlockShape, ListShape },
    data () {
      return {
        list: [],
        adoptList:[],
        isShowRename: false,
        isShowDownload: false,
        isShowDelete: false,
        isShowRemove: false,
        isShowUpload: false,
        isShowCreate: false,
        isShowTextArea:null,
        isflag:false,
        FILE_ID:null,
        fileInfo:null,
        // treeId: 0,
        listLoading: true,
        pageIndex:1,
        pageSize:10,
        totalCount: 0,
        value: '',
        isBatch:null,
       // listFileStatus:null,
        uploadURL: '/api/file/upload/project/type',
        fileData: {},
        isUploading:false, //上传中...图片
        uploadHeaders:{},
        // 当前选择的rows;
        currentChooseRows:[],
        nvOrganizeUserSelectResult: [],
        currentChooseList:[],
        // 当前层次的ID
        currentId: '',
        // 上一层次的ID,
        lastId: '',
        // 新建文件夹的dialog
        dialogFormVisible:false,
          // 新建文件夹的dialog
        moveFormVisible:false,
        reviewedFormVisible:false,
        isSelectUserDialog:false,
        // 新建文件夹的名称
        newFolderName: '',
        // projectId:'736',
        // type:'drwing',
        fileName: '',
        showUpload: false,
        // 重命名文件/文件夹的名称
        rename: '',
        // 层级导航列表层级导航列表
        levelList: [
            {
                id: 'ROOT',
                name: '文档中心'
            }
        ],
        moveForm:{
          ID:null,
          PARENT_ID:null,
          IS_DIRECTORY:null,
        },
        reviewedForm:{
          ID:null,
          NAME:null,
          OPINION:null,
          FILE_STATUS:null,
          FILE_SIZE:null,
          USER_NAME:null
        },
        checkAll: false,//总全选
        isSearch: false,//新建文件夹时是否正在搜寻绑定
        folderList:[],
        defaultProps: {
          children: 'children',
          label: 'NAME'
        },
      }
    },
    props: {
      // 项目ID
      projectId: {
        type: String,
        required: false,
        default: null
      },
      // 项目名称
      projectName: {
        type: String,
        required: false
      },
      // 文件类型
      type: {
        type: String,
        required: false
      },
      documentType: {
        type: String,
        required: false
      },
      // 上传的文件是否需要写入到ES服务器
      needIndex: {
        type: String,
        required: false
      }
    },
 
    mounted () {
      this.uploadHeaders ={
        'Authorization' : localStorage.getItem('user.token'),
      },
      
      this.fileData = {
				projectId: this.projectId,
				type: this.type
      };
    },
   
    created () {
      const self = this
      self.fetchData();
      history.pushState(null, null, document.URL)
      window.onpopstate = function () {
        if (self.levelList.length !== 1) {
          history.pushState(null, null, document.URL)
          const item = self.levelList[self.levelList.length - 2]
          self.setParentCode(item.id, item.name, 'delete', item)
        } else {
          window.onpopstate = null
        }
      }

      // 获取当前登录人的操作权限
      this.fetchOperatePermission();
    },
    beforeDestory () {
      window.onpopstate = null
    },
    computed: {
      selectedIds () {
        const { currentChooseRows } = this
        return  currentChooseRows.map(item => {
          return item.IS_DIRECTORY === 'YES' ? `DIR-${item.TREE_ID}` : `FILE-${item.TREE_ID}-${item.ID}`
        }).join(',')
      },
      treeId () {
        return this.projectId || 'ROOT'
      },
       selectedRowIds () {
        const { currentChooseRows } = this
        return  currentChooseRows.map(item => {
          return item.ID
        }).join(',')
      },
    },
    // 过滤器，用于处理文件管理模块根据不同类型的文件格式显示不同的图标
    filters: {
      FileIconFilter: function (value) {
        const map = {
          '.xls':  'file-xls',
          '.xlsx': 'file-xls',
          '.et':   'file-xls',
          '.doc':  'file-doc',
          '.docx': 'file-doc',
          '.wps':  'file-doc',
          '.ppt':  'file-ppt',
          '.pptx': 'file-ppt',
          '.dps':  'file-ppt',
          '.rar':  'file-arh',
          '.zip':  'file-arh',
          '.txt':  'file-txt',
          '.pdf':  'file-pdf',
          '.png':  'file-pic',
          '.gif':  'file-pic',
          '.jpg':  'file-pic',
        }
        return map[value] || 'file-other'
      }
    },
     computed: {
        ...vuex.mapState('user', {
            userName: state => state.profile.userName
        })
    },
    methods: {
      handleNvEvent (method, ...args) {
        this[method].bind(this)(...args)
      },
      // 获取列表数据
      calcFileImg (ext) {
        switch (ext) {
          case '.doc':
          case '.docx':
            return 'word'
        }
      },
      fetchData(treeId='') {
        this.listLoading = true;
        var tid = '';
        if(treeId == ''){
          if (this.projectId == ''){
            tid = 'ROOT';
          } else {
            tid = this.projectId;
          }
        } else {
          tid = treeId;
        }
        getTreeDocuments({
          pageIndex: this.pageIndex,
          pageSize : this.pageSize,
          PROJECT_ID : this.projectId,
          TYPE : this.type,
          DOCUMENT_TYPE : this.documentType,
          TREE_ID: treeId  || this.treeId
        }).then(({ data = {} }) => {
          console.log("文件列表");
          console.log(data);
          this.listLoading = false;
            function calcFileImg(ext) {
                switch (ext) {
                    case '.doc':
                    case '.docx':
                      return 'word'
                    case '.pdf':
                      return 'pdf' 
                    default:
                      return 'excel'
              }
            }
            const { list = [] } = data
            this.list = list.map(v => {
              v.BK_NAME = v.NAME
              v.isEdit = false;
              v.isChecked = false;
              v.imgURL = require(`./img/${calcFileImg(v.FILE_TYPE)}.png`)
              return v
            });
            this.totalCount =  data.totalCount || 0
        }).catch(err=>{
          this.listLoading = false;
        })
      },

      // 获取当前登陆人的操作权限
      fetchOperatePermission(){
        const self = this;
        getOperatePermission().then(({data = {}}) => {
          const { list = [] } = data;
          let operateStr = "";
          list.forEach(item => {
            if("RENAME" === item.OPERATE_NAME){
              self.isShowRename = true;
            } else if("DOWNLOAD" === item.OPERATE_NAME){
              self.isShowDownload = true;
            } else if("DELETE" === item.OPERATE_NAME){
              self.isShowDelete = true;
            } else if("REMOVE" === item.OPERATE_NAME){
              self.isShowRemove = true;
            } else if("CREATE" === item.OPERATE_NAME){
              self.isShowCreate = true;
            } else if("UPLOAD" === item.OPERATE_NAME){
              self.isShowUpload = true;
            }
          });
        }).catch(err=>{
          
        })
      },

      defaultCheck(nodeObj,checkObj,node)
      {
        
        console.log("打印默认选中节点");
         console.log(nodeObj);
      },
    moveFolderList() {
      let me = this;
      me.listLoading = true;
      getFolderList()
      .then(response => {
        this.listLoading = false;
        const data = response.data;
        if (data.list == undefined){
            me.folderList = null;
            return;
        }
       let nodeList=[{ 
         //PARENT_ID: "ROOT",
         IS_DIRECTORY: "YES",
         NAME: '全部文件',
         children:data.list,
         ID:0}];
       me.folderList = nodeList;
      }).catch(err => {
        console.log(err);
      })
    },
      handleNodeClick(data) {
        this.moveForm.PARENT_ID=data.ID;
      },
      // 创建文件夹
      createdNewFolder(){
         // 先清空之前填写的信息
        this.newFolderName = "";
        this.dialogFormVisible = true;
      },
      
      // 移动文件夹
      moveFolderTo(row){
        this.moveFolderList();
        this.moveFormVisible = true;
        this.moveForm.ID=row.ID;
        this.moveForm.IS_DIRECTORY=row.IS_DIRECTORY;
      },
    
    // 移至文件
    handOnToDialog(row){
      // 先清除选项
    this.currentChooseList.splice(0,this.currentChooseList.length);
    this.isSelectUserDialog = true;
    this.FILE_ID=row.ID
    },
    // 审核文件
    reviewedDialog(row,isShow){
      const self=this;
        self.reviewedForm.OPINION="";
        // this.reviewedForm.ID=row.ID;
        // this.reviewedForm.NAME=row.NAME;
        // this.reviewedForm.USER_NAME=row.USER_NAME;
        // this.reviewedForm.FILE_SIZE=row.FILE_SIZE;
        // this.reviewedForm.FILE_STATUS=row.FILE_STATUS;
        self.reviewedForm=row;
        self.moveForm.IS_DIRECTORY=row.IS_DIRECTORY;
        self.isShowTextArea =isShow == '1' ? ' 1' : ' 0';
        self.getAdoptRecord();
        self.reviewedFormVisible = true;
      },

         syncResult(result){
        this.currentChooseList = result;
    },

     // 批量移至文件
    batchHandOnToDialog(){
      const self=this;
      self.currentChooseRows.forEach(item=>{
         if("YES"===item.IS_DIRECTORY){
            self.$message.info("只能进行文件移交");
             self.isflag=true; 
         }
          if(this.userName!== item.userName){
              self.$message.info("非创建人不能进行移交");
              self.isflag=true; 
           }
          if("NO"===item.IS_DIRECTORY && ( item.FILE_STATUS === '2' || item.FILE_STATUS === '1')){
              self.$message.info("不能进行重复移交");
              self.isflag=true; 
          }
       
        });
        if(!self.isflag){
            self.isSelectUserDialog = true;
        }
    },
      // 获取选中的人员信息
    getChoosePerson(choosePerson){
      if(choosePerson.length == 0){
        this.$message.info("请先选择移交给的人员！");
        return
      }
      this.isSelectUserDialog = false
      if(choosePerson && choosePerson.length>0){
        this.currentChooseList =  choosePerson;
        if(this.currentChooseRows.length >= 1){
           this.batchHandOn(choosePerson);
        }else{
           this.handOn(choosePerson);
        }
      }else{
        this.currentChooseList = [];
      }
    },

  // 批量移至文件
    batchHandOn(choosePerson) {
        const self = this
        self.listLoading = true;
        let userNames = "";
        let fileIds = "";
        choosePerson.forEach(user => {
          userNames += user.userName + ",";
        });
        self.currentChooseRows.map(item=>{
            fileIds+=item.ID+","
        })
        fileIds=fileIds.substring(0, fileIds.lastIndexOf(','));
        userNames=userNames.substr(0,userNames.lastIndexOf(','));
        const arr={"FILE_IDS":fileIds,"RECIPIENT":userNames};
        batchSaveFileArchive(arr).then(({ data }) => {
          self.listLoading = false;
          self.$message.success("移交成功！");
        }).catch(err => {
          self.listLoading = false;
          console.log(err);
        })
      },
    cancelChoose(){
        this.isSelectUserDialog = false;
    },
  // 单个移至文件
    handOn(choosePerson) {
        const self = this
        self.listLoading = true;
        let userNames = "";
        choosePerson.map(user => {
          userNames += user.userName+",";
        })
        userNames=userNames.substring(0, userNames.lastIndexOf(','));
        console.log(choosePerson);
        const arr={"FILE_ID":self.FILE_ID,"RECIPIENT":userNames};
        //let param={dataList: JSON.stringify(arr)};
        saveFileArchive(arr).then(({ data }) => {
          self.listLoading = false;
          self.$message.success("移交成功！");
          this.fetchData(this.currentId);
        }).catch(err => {
          self.listLoading = false;
          console.log(err);
        })
      },
    cancelChoose(){
        this.isSelectUserDialog = false;
    },
  
    //审核
    adoptConfirm(fileStatus) {
        const self = this
        self.listLoading = true;
        const arr={"FILE_STATUS":fileStatus,"FILE_ID":self.reviewedForm.ID,"OPINION":self.reviewedForm.OPINION};
        //let param={dataList: JSON.stringify(arr)};
        adoptSave(arr).then(({ data }) => {
          self.listLoading = false;
          if(fileStatus=="2"){
           self.$message.success("审核成功！");
           this.fetchData(this.currentId);
          }else if(fileStatus=="3"){
           self.$message.success("驳回成功！");
           this.fetchData(this.currentId);
          }
         self.reviewedFormVisible=false;
        }).catch(err => {
          self.listLoading = false;
          console.log(err);
        })
      },
  //审核记录
    getAdoptRecord() {
      let self = this;
      self.listLoading = true;
      let arr={"FILE_ID":self.reviewedForm.ID};
      getAdoptList(arr)
      .then(response => {
        this.listLoading = false;
        const data = response.data;
        if (data == undefined){
            self.adoptList = null;
            return;
        }
       self.adoptList = data;
      }).catch(err => {
        console.log(err);
      })
    },
	
    cancelChoose(){
        this.isSelectUserDialog = false;
    },

    // change select 
    changeSelect(value){
      console.log("change", value);
    },

    handleSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.fetchData(this.currentId);
    },

    handleCurrentChange (pageIndex) {
      this.pageIndex = pageIndex;
      this.fetchData(this.currentId);
    },

    handleSelectionChange (section) {
      console.log(section);
      //当前选择的条目
      this.currentChooseRows = section;
      this.isDownload = !(this.currentChooseRows.length >= 1)
    },
    // 下载文件
    downloadChooseRows () {
      let rows = this.currentChooseRows;
      if(rows.length==0){
        return this.$message.info("请勾选要下载的文件")
      }
      unfetch.download('file/download/compress', {
        params: {
          ID: this.selectedIds
        }
      })
    },
    beforeUpload (file) {
      this.isUploading = true;
      if (this.currentId == "" || this.currentId == "ROOT") return false;
      if (file && file.size) {
        let size = file.size / 1024;
        if(size > 20000){  
          this.$message.error("上传文件不能超过20M");
          return false;
        }
      }
    },
    errorUpload () {
        this.isUploading = false;  
    },
    onUpload (e) {
        this.$message.error("上传文件中");
    },
    success (resp) {
      this.listLoading = false;
      let me = this;
      let {code , data, msg} = resp;
      if(code==0){
          // 开始添加到文件列表中
          var tid = '';
            if(me.currentId  == ''){
            if (this.projectId == ''){
              tid = 'ROOT';
            } else {
              tid = this.projectId;
            }
          } else {
            tid = me.currentId ;
          }
          let item = Object.assign({}, data, {
            TREE_ID : tid ,
            PROJECT_ID: this.projectId,
            TYPE_BIG: this.documentType,
            TYPE_SMALL: this.type,
            NEED_INDEX: this.needIndex,
          });
          let arr = [];
          arr.push(item);
          FileAdd(arr).then(resp=>{
            console.log(resp);
            let {code, data,msg} = resp.rawData;
            if(code==0){
              this.isUploading = false;
              me.$message.success('上传成功');
              me.fetchData(me.currentId);
            }else{
              me.$message.error(msg);
            }
          }).catch(() => {
            this.isUploading = false  
          });

      }else{
          this.isUploading = false
          this.$message.info(msg);
      }
    },
    removeInfo(row) {
      let me = this;
      const params = {
        ID: row.ID
      }
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action ,instance) => {
          if (action=='confirm') {
            me.reqData(params);
          }
        }
      });
    },
    updateFileNameByName (row, event) {
      row.FILE_TITLE = event.target.value;
      let backdata = JSON.parse(JSON.stringify(row));
      this.modifyForm = backdata;
    },
    
    removeItem (row) {
      	let me = this;
      	if(row.IS_DIRECTORY === 'YES'){
            me.$confirm('此操作将永久删除该文件夹以及所有子文件, 是否继续?', '提示', {
              confirmButtonText:'确定',
              concelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              // 当删除的是文件夹时需提示将会同时删除文件夹下的文件，确认后做删除文件夹下文件的操作，此处需完善
              FileDeleteFolder(row.ID).then(() =>{
                me.$message.success("删除成功");
                me.fetchData(me.currentId);
              }).catch(err=>{
                console.log(err);
              })
            }).catch(()=>{
              // me.$message.info("已取消删除");
            })
      }else{
        me.$confirm('删除后将不可恢复，是否确定要删除此文件?', '提示', {
            confirmButtonText:'确定',
            concelButtonText:'取消',
            type:'warning'
          }).then(()=>{
            FileDelete(row.ID).then(() =>{
                me.$message.success("删除成功");
                me.fetchData(me.currentId);
          }).catch(err=>{
              console.log(err);
          })
        }).catch(()=>{
          // me.$message.info("已取消删除");
        })
      }
    },
    // 修改父节点的值
    setParentCode (parentCode, name, type, item) {
      console.log(...arguments)
      //  this.$router.push({ path: this.$route.fullPath, query:{parentCode} })
       //window.history.pushState({}, null, location.href)
       // history.replaceState('x', null ,'www.baidu.com')
        //节点是文件不进入下一级
       if(type == 'NO'){
          //文件预览
          let req = {
            FILE_ID: parentCode
          };
          this.listLoading = true;
          FileView(req).then(({data})=>{
              this.listLoading = false;
              let me = this;
              let url = data.fileUrl + data.filePath;
              unfetch.open(url);
          }).catch(err=>{
            this.listLoading = false
            this.$message.error('预览失败！');
            console.error(err);
          });
          return;
        } 
        
        // 处理左上角的导航功能
        if ('delete' === type) {
            let index = this.levelList.indexOf(item) + 1;
            let length = this.levelList.length - index;
            this.levelList.splice(index, length);
            if(parentCode === "search"){
                this.fileName = name.substring(name.indexOf('"')+1,name.lastIndexOf('"'));
                this.search();
            }else{
                // 点击导航时清除搜索框中的内容
                this.fileName = "";
                // 点击导航时新建文件夹按钮可以使用
                this.isSearch = false;
            }
        } else {
          let temp = [{'id': parentCode, 'name': name}];
          this.levelList.push(...temp)
          // 当类型为search时单独处理
          // 控制可以显示上传按钮
          this.showUpload = ("search" !== type)
        }
        this.currentId = parentCode;
        if(parentCode != null && parentCode != "" && "search" !== type && "search" !== parentCode){
            this.fetchData(parentCode);
        }
    },

    confirmToAddFolder () {
      let me = this;
      if(this.newFolderName.length >15){
         me.$message.error('文件夹名称长度不能大于15');
         return;
      }
      var cid = '';
      if(this.currentId == ''){
        if (this.projectId == ''){
          cid = 'ROOT';
        } else {
          cid = this.projectId;
        }
      } else {
        cid = this.currentId;
      }
      FileCreatedNewFolder({
          PARENT_ID: cid ,
          NAME: this.newFolderName,
          PROJECT_ID: this.projectId,
          TYPE: this.type,
          DOCUMENT_TYPE: this.documentType
      }).then(resp=>{
        me.dialogFormVisible= false;
        me.$message({
          showClose: true,
          message: '创建成功'
        });
        me.fetchData(me.currentId);
       
      }).catch(err=>{
        me.$message.error("创建失败");
      })
    },
    moveConfirm(){
        let  me=this;
        if(this.moveForm.PARENT_ID==null || this.moveForm.PARENT_ID==0){
              me.$message.error("请选中文件夹");
        }else{
              let reqParams = {
                    ID: me.moveForm.ID,
                    PARENT_ID:me.moveForm.PARENT_ID,
                    IS_DIRECTORY:me.moveForm.IS_DIRECTORY,
                  }
                  console.log("移动请求参数：：：：");
                  console.log(reqParams);
              moveFolder(reqParams).then(resp=>{
                let {code, msg, data} = resp.rawData;
                if(code==0){
                me.fetchData(me.currentId);
                this.moveFormVisible=false;
                me.$message.success("移动成功");
                }else{
                  me.$message.error('移动失败');
                }
              }).catch(err=>{
                console.log(err)
            })
        }
},
    confirmToFileArchive(){
        let  me=this;
        if(this.moveForm.PARENT_ID==null || this.moveForm.PARENT_ID==0){
              me.$message.error("请选中文件夹");
        }else{
              let reqParams = {
                    ID: me.moveForm.ID,
                    PARENT_ID:me.moveForm.PARENT_ID,
                    IS_DIRECTORY:me.moveForm.IS_DIRECTORY,
                  }
                  console.log("移动请求参数：：：：");
                  console.log(reqParams);
              moveFolder(reqParams).then(resp=>{
                let {code, msg, data} = resp.rawData;
                if(code==0){
                me.fetchData(me.currentId);
                this.moveFormVisible=false;
                me.$message.success("移动成功");
                }else{
                  me.$message.error('移动失败');
                }
              }).catch(err=>{
                console.log(err)
            })
        }
       
    },
    download (row) {
      unfetch.download('file/download/compress', {
        params: {
        //  ID: this.selectedIds
          ID: row.IS_DIRECTORY === 'YES' ? `DIR-${row.TREE_ID}` : `FILE-${row.TREE_ID}-${row.ID}`
        }
      })
    },
    // 触发重命名
    reName (row) {
      const { list } = this
      this.rename = row.IS_DIRECTORY == "YES" ? row.NAME : row.NAME.substring(0,row.NAME.lastIndexOf("."));
      list.forEach(item => {
        item.isEdit = false
      })
      row.isEdit = true;
    },
    modifyComplete (row) {
      let me = this;
      if(this.rename.length >15){
        me.$message.error('修改文件夹名称长度不能大于15');
        return;
      }
      if(row.IS_DIRECTORY === 'YES'){
          //文件夹重命名
          FileRenameFolder({
            ID: row.ID,
            NAME: this.rename.trim()
          }).then(() => {
            me.fetchData(me.currentId);
            row.isEdit = false;
            me.$message({
              showClose: true,
              message: '修改成功'
            });
          }).catch(err=>{
            console.error(err);
            let {code, msg, data} = err;
            if (code == 3){
              me.$message.error(msg);
            } else {
              me.$message.error("创建失败");
            }
          })
      }else{
        //文件重命名
        FileRename({
          ID: row.ID,
          FILE_NAME: this.rename.trim(),
          FILE_TYPE : row.FILE_TYPE || ''
        }).then(() => {
            me.fetchData(me.currentId);
            row.isEdit = false;
            me.$message({
              showClose: true,
              message: '修改成功'
            });
        }).catch(err=>{
          console.error(err);
        })
      }
    },
    deleteSelectedAndChildren () {
      let rows = this.currentChooseRows;
      if(rows.length === 0){
        this.$message.info("请勾选要删除的文件或文件夹");
        return;
      }
      let me = this;
      me.$confirm('删除后将不可恢复，是否确定要删除此文件?', '提示', {
          confirmButtonText:'确定',
          concelButtonText:'取消',
          type:'warning'
      }).then(()=>{
        deleteDirAndFiles(me.selectedIds).then(() => {
            me.$message.success("删除成功");
            me.fetchData(me.currentId);
        }).catch(err=>{
            console.log(err);
        });
      }).catch(()=>{
        // me.$message.info("已取消删除");
      })
    },
    search () {
      this.listLoading = true;
      const pagePrams = {
        pageIndex: this.pageIndex,
        pageSize : this.pageSize,
        PROJECT_ID : this.projectId,
        TYPE : this.type
      }
      if (this.fileName == "") {
        this.isSearch = false;
        pagePrams.TREE_ID = 'ROOT';
        // 搜索时直接把导航清掉
        if(this.levelList.length > 1){
            this.levelList.splice(1);
        }
      } else {
        this.isSearch = true;
        pagePrams.FILE_NAME = this.fileName;
        // 搜索时先把导航清掉再显示搜索的内容
        if(this.levelList.length > 1){
            this.levelList.splice(1);
        }
        this.setParentCode("search", '搜索："' + this.fileName +'"', 'search', this.fileName);
      }
      getTreeDocuments(pagePrams)
      .then(({ data = {} }) => {
        this.listLoading = false;
        const { list = [] } = data
        this.list = list.map(v => {
            v.isEdit = false;
            return v
          });
        this.totalCount = data.totalCount || 0
      }).catch(err=>{
        console.log(err);
      });
    }
  },
  watch: {  //监听全选方法
    checkAll (val) {
      const self = this
      const { list } = self
      list.forEach(item => {
        item.isChecked = val;
      })
  }
}
}
</script>

<style lang="scss" scoped>
  .upload-table{
      &__from {
          //padding:20px;
      }
      &__gap {
        margin-bottom: 10px; 
      }
      &__upload--btn {
          display: inline-block;
          padding-left: 9px;
      }
  }

  .file-name:hover {
    color: #398DEE;
    cursor: pointer;
  }

   .file-label {
    float: left;
    width: 520px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .file-input {
    float: left;
    margin-left: 10px;
  }

  // 分页组件样式
  .home-detail__page {
    margin-top: 20px;
    margin-right: 30px;
    text-align: center;
  }
  .cell i{
    margin-right:5px;
    cursor: pointer;
  }

	
</style>
<style rel="stylesheet/scss" lang="scss">
@media screen and (max-width: 1400px){
   .file-label {
    width: 200px!important;  
  }

};

.dia_scroll {
  .el-dialog__body {
    height: 260px;
    overflow: auto; 
  }
}
.dia_adopt_scroll {
  .el-dialog__body {
    height: 500px;
    overflow: auto; 
  }
}
.dia_adopt_scroll {
  .el-dialog {
    height: 650px;
  }
}

.reply-user {
				width: 46px;
				height: 19px;
				margin-right: 10px !important;
				border-radius: 4px;
				border: 1px solid #398dee;
				color: #398dee;
				font-size: 12px;
				text-align: center;
				padding: 0 3px;
				display: inline-block;
			}



.dia_scroll {
  .el-dialog{
    height: 420px;
  }
}

	.replyList {
			border-top: 1px dashed rgb(230, 232, 238);
			/*height: 88px;*/
			width: 100%;
			padding: 20px 0;
			&__header { margin-bottom: 13px; font-size: #333; }
			.reply-user {
				width: 46px;
				height: 18px;
				margin-right: 10px !important;
				border-radius: 4px;
				border: 1px solid #398dee;
				color: #398dee;
				font-size: 12px;
				text-align: center;
				padding: 0 3px;
				display: inline-block;
			}
    }

 .bg-purple {
    background: rgb(245,245,245);
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>