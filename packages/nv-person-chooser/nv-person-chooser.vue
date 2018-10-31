<template>
    <section>
        <div class="nv-organize-user-dialog__input" @click="showDialog">
        <span v-if = "currentChooseList.length === 0" class="nv-organize-user-dialog__placeholder" >
            {{ placeholder }}
        </span>
        <el-tag 
            v-for = "node in currentChooseList" 
            :key="node.id" 
            size = "small"
            :title="node.userName"
            >
            {{ node.nickName }}
        </el-tag>
        <el-tag size = "small" type="info" @click="showDialog">
            +添加更多
        </el-tag>
		</div>
        <el-dialog :title="title" :visible.sync="isShowDialog" width="800px">
            <nv-person-choose :result="currentChooseList" @sync-result="syncResult"  @get-choose-person="getChoosePerson" @cancel-choose-person="cancelChoose" ></nv-person-choose>
        </el-dialog>
    </section>
</template>
<script>
import NvPersonChoose from './nv-person-choose'

export default {
    name:'NvPersonChooser',
    data(){
        return {
            isShowDialog:false,
            placeholder: '请选择人员',
            title: '请选择人员',

            //personList:[],
            // 当前选择的人
            currentChooseList:[]
        }
    },
    props:{
        currentPersonList:{
            type:Array,
            default(){
                return []
            }
        }

    },
    components:{
        NvPersonChoose
    },

    model:{
       prop:'currentPersonList',
       event:'change'
    },

   watch:{
     currentPersonList(val){
         this.currentChooseList = val;
     }
   },
    created(){
        this.currentChooseList = this.currentPersonList;
    },
    methods:{
        showDialog(){
            this.isShowDialog = true
        },
        getChoosePerson(choosePerson){
            //debugger
            this.isShowDialog = false
            if(choosePerson && choosePerson.length>0){
                //this.personList = choosePerson;
                this.currentChooseList =  choosePerson;
            }else{
                //this.personList = [];
                this.currentChooseList = [];
            }
         },
        cancelChoose(){
            this.isShowDialog = false;
        },
        syncResult(result){
            this.currentChooseList = result;
        },
        onchange:function(){
            this.$emit('change',this.currentPersonList);
        }
    }
};
</script>

<style lang="scss" scoped>
.nv-organize-user-dialog {
  &__input {
    cursor: pointer;
    min-height: 22px;
    border: 1px solid #dcdfe6;
    padding: 10px 10px 0 0px;

    max-width: 400px;

    &:hover {
      border-color: #c0c4cc;
    }

    .el-tag {
      margin-bottom: 10px;
      margin-left: 10px;
    }
  }

  &__placeholder {
    display: inline-block;
    font-size: 14px;
    margin: 0 0 10px 10px;
    color: #dcdfe6;
  }
}
</style>

