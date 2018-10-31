<template>

   <span>
            <a @click="messageDialogVisible = true" style="margin-right:20px;">

                <i class="png-icon alarm middle" />
                   <el-badge style=" width:0px;left: -15px;" v-show="messageCount>0"  :value="messageCount"  class="nv-link item">
                </el-badge>
            </a>

   <el-dialog title="消息列表" :visible.sync="messageDialogVisible" width="50%" :append-to-body="true">

    <section class="search-table">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中"  border fit highlight-current-row>
        
        <el-table-column label="序号" prop = "ROW_ID"   width="55"  align="center" />

        <el-table-column label="消息类型" align="center"  prop = "MSG_TYPE"  width="80">
          <template slot-scope="scope">          
            <span v-if="scope.row.MSG_TYPE == 'notice'"  >通知公告</span>    
            <span v-else-if="scope.row.MSG_TYPE == 'task'"  >任务</span>
            <span v-else-if="scope.row.MSG_TYPE == 'alram'"  >预警</span>     
             <span v-else >其他</span>     
          </template>
        </el-table-column>

        <!--
        <el-table-column label="消息类型子类" align="center"  prop = "MSG_TYPE_SUB"  width="80">
        </el-table-column>
        -->

        <el-table-column label="消息内容" prop = "MSG_CONTENT">
          <template slot-scope="scope">
             <a class="nv-link"  @click="goto(scope.row)">      
               {{scope.row.MSG_CONTENT}}
             </a>                       
          </template>
        </el-table-column>

        <el-table-column label="消息时间" prop = "CREATE_TIME" width="200">
        </el-table-column>

        <el-table-column label="是否已读" align="center"  prop = "IS_READ"  width="80">
          <template slot-scope="scope">          
            <el-tag size="mini"  v-if="scope.row.IS_READ=='YES'" >已读</el-tag>
            <el-tag size="mini"  v-else  type="danger">未读</el-tag>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页  -->
      <div class="search-pagination" v-if="this.totalCount > 10">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper, slot" :total="totalCount">
          <el-button>确定</el-button>
        </el-pagination>
      </div>
    </section>
   </el-dialog>
  </span>
</template>
<script>
//消息列表
import vuex, { mapGetters, mapActions } from 'vuex';
export default {
   name:'MessageList',
   data(){     
        return {         
                list: null,
                listLoading: true,
                pageIndex: 1,
                pageSize: 10,
                orderBy: null,
                totalCount: 0,
                messageDialogVisible:false,
                 messageCount:0
        }
   },
   created(){
              //获取未读消息数目
    //    this.getMessageCount();
    //    this.getList();

   },
    computed: {
        ...vuex.mapState('user', {
            nickName: state => state.profile.nickName,
            user: state => state.profile
        })
    },

    methods:{
                //获取未读消息数目
        getMessageCount(){
             unfetch({
                url: `${process.env.COMMON?process.env.COMMON:''}`+'/platform/message/noreadcount',
                method: 'get',
                params:{ } 
            }).then(({data}) =>{
                this.messageCount = data;
            })
        },
        getList() {
            const self = this;
            unfetch({
                url: `${process.env.COMMON?process.env.COMMON:''}`+'/platform/message/usermsgs',
                method: 'get',
                params:{ pageIndex:this.pageIndex,pageSize:this.pageSize}
            }).then(({ data }) => {
                
                self.listLoading = false;
                self.list = data.list || null
                self.totalCount = data.totalCount;
            }).catch(err => {
                self.listLoading = false;
                console.log(err);
            })
        },
        handleSizeChange(pageIndex) {
            this.pageSize = pageIndex;
            this.getList();
        },
        handleCurrentChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.getList();
        },
        goto(row){
            var url;
            if(row.MSG_EXTRAS){
                var MSG_EXTRAS = JSON.parse(row.MSG_EXTRAS);
                if(row.MSG_TYPE == 'notice'){//通知公告
                    if(MSG_EXTRAS && MSG_EXTRAS.ID ) {
                        url = "/common/#/notice/edit" ;
                        unfetch.open(url,{params:{ID:MSG_EXTRAS.ID,'nv-view':true}});
                    }

                }else if(row.MSG_TYPE == 'task'){//任务
                    if(MSG_EXTRAS && MSG_EXTRAS.BUSINESS_ID && MSG_EXTRAS.PROC_INST_ID && MSG_EXTRAS.PROC_DETAIL_URL && row.FROM_SYSTEM) {
                        url = "/" + row.FROM_SYSTEM +"/" + MSG_EXTRAS.PROC_DETAIL_URL;
                        let params = {
                            ID: MSG_EXTRAS.BUSINESS_ID,
                            PROC_INST_ID: MSG_EXTRAS.PROC_INST_ID, 
                            'nv-view':true,
                            "nv-no-sidebar": true // 去掉左侧菜单栏
                        }
                        unfetch.open(url, { params });
                    }
                }
            }
            //添加阅读记录
            unfetch({
                url:  `${process.env.COMMON?process.env.COMMON:''}`+'/platform/message/log',
                method: 'post',
                params:{ MESSAGE_ID:row.ID} 
            }).then(({data}) =>{
               this.getList();
                this.getMessageCount();
            })
        }
    }
    
}
</script>
<style  lang="scss" scoped>

</style>
