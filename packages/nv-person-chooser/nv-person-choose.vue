<template>
  <section class="e-person-choose">
    <div class="e-person-choose__row">
      <div class="e-person-choose__left">
        <el-input placeholder="请输入组织机构名称" v-model="filterText" class="e-person-choose__left-input">
        </el-input>
        <el-tree class="filter-tree" :data="treeDataArr"  :expand-on-click-node="false" @node-click="nodeClick" highlight-current :props="defaultProps" :default-expand-all="control.isShowAll" :accordion="control.isAccordion" :filter-node-method="filterNode" ref="organizeTree"  >
        </el-tree>
      </div>
      <div class="e-person-choose__middle"></div>
      <div class="e-person-choose__right">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedPersonIds" @change="handleCheckedPersonChange"  class="e-person-choose__checkbox-group">
          <el-checkbox v-for="person in currentPersonList"    :label="person.userId" :title="person.userName" :key="person.userId" class="e-person-choose__checkbox">{{person.nickName}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div class="e-person-choose__result">
      <el-tag v-for="item in resultList" :key="item.id" :title="item.userName" closable  @close="removeItemFromResult(item)" class="tag-gap">
        {{item.nickName}}
      </el-tag>
      <el-tag  type="danger"  @click.native = "clearResult" v-show="resultList.length > 0" >
          清空选择
      </el-tag>
    </div>

    <div class="e-person-choose__footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary"  @click="confirm">确定</el-button>
    </div>

  </section>

</template>
<script>
  export default {
    name: 'nvPersonChoose',
    props: {

      // 请求参数
      reqOpt: {
        type: Object,
        default () {
          return {
            url: '/user/organize',
            getUsersByOrganizeIdUrl: '/user/by/organize'
          }
        }
      },

      organizeId: {
        type: Object,
        default () {
          return {
            id: ""
          }
        }
      },

      control: {
        type: Object,
        default () {
          return {
            isShowAll: false,
            isAccordion: true
          }
        }
      },

      // 编辑模式 一开始有数据
      result:{
        type: Array,
        default(){
          return []
        }
      },
      // value: {
      //   required: true
      // }

    },
    data() {
      return {
        filterText: '',
        treeDataArr: [],
        defaultProps: {
          children: 'children',
          label: 'text'
        },

        // 当前选择的组织
        currentChooseGroupId:'',

        // 当前组织下的所有人
        currentPersonList:[],
        // 当前组织下选择的人
        checkedPerson:[],

        checkedPersonIds:[],

        checkAll:false,

        // 选择结果
        resultList:[]
      }

    },

    // computed:{
    //  resultList(){
    //    return  this.result;
    //  }
    // },

    watch: {
      filterText(val) {
        console.log(val)
        this.$refs.organizeTree.filter(val);
      },
      result(val){
        this.resultList = val;
      }
    },
    created() {
      let me = this
      me.getOrganizes()
      let len = me.resultList.length;
      if(me.result.length > 0){
        me.resultList = me.result;
      }
    },
    updated(){
      let me = this
      let len = me.resultList.length;
      if(me.result.length >= 0){
        me.resultList = me.result;
      }
    },
    methods: {
      getOrganizes(){
        let me = this
        unfetch.get(me.reqOpt.url, {

        params: {
          ORGANIZE_ID: me.reqOpt.organizeId
        }
      }).then(function ({data}) {
        //  
          me.treeDataArr = data
      })


      },
    getUsersByOrganizeId() {
      let me = this
      unfetch.get(me.reqOpt.getUsersByOrganizeIdUrl, {
        params: {
          ORGANIZE_ID: me.currentChooseGroupId
        }
      }).then(function ({data}) {
          me.currentPersonList = data;
          // 处理当前选择的情况
          me.handleChoose(me.currentPersonList)
      })
    },

      handleChoose(allPersonListArr){
        let me = this
        
        let personListLength = allPersonListArr.length || 0
        if(me.resultList.length <= 0){
          me.checkAll = false;
          return;
        }
        if(personListLength <= 0){
          me.checkAll = false;
          return;
        }
        //
        if(me.resultList.length > 0 && personListLength > 0){
          let chooseIds = [];
          for(let i=0;i < me.resultList.length;i++){
            let one = me.resultList[i];
            if(allPersonListArr.find(x=>x.userId == one.userId)){
              chooseIds.push(one.userId);
            }
          }
          // 更新选项
          me.checkedPersonIds = chooseIds
          me.checkAll = chooseIds.length == personListLength
        }

      },
      filterNode(value, data) {
        if (!value) return true;
        return data.text.indexOf(value) !== -1;
      },

      handleCheckAllChange(isAll) {
        this.checkedPersonIds = isAll ? this.currentPersonList.map(x=>x.userId) : [];
        if(isAll){
          this.checkedPerson = this.currentPersonList.filter(x=>this.checkedPersonIds.includes(x.userId));
          this.pushItem2Result(this.checkedPerson);
        }else{
          this.removeItem2Result(this.checkedPerson)
        }
      },

      // item 从结果集中删除条目
      removeItemFromResult(item){
        let me = this
        let index = me.resultList.findIndex(x=>x.userId == item.userId)
        if(index>-1){
          me.resultList.splice(index, 1);
        }
        // 更新对应的
        if(me.currentPersonList.length > 0){
          let personIndex = me.checkedPersonIds.findIndex(x=> x == item.userId);
          if(personIndex > -1){
            me.checkedPersonIds.splice(personIndex,1)
          }
          me.checkAll = me.currentPersonList.length == me.checkedPersonIds.length
        }
      },
      handleCheckedPersonChange(value) {
        let me = this
        // 清空本集合中所有选择的值
        if(me.resultList.length > 0){
          let allGroupPerson = me.currentPersonList;
          this.removeItem2Result(allGroupPerson);
        }

        let checkedCount = value.length;
        let total = this.currentPersonList.length;
        this.checkAll = checkedCount === total;

        this.checkedPerson = this.currentPersonList.filter(x=>this.checkedPersonIds.includes(x.userId));

        this.pushItem2Result(this.checkedPerson);

      },

      // 添加项目
      pushItem2Result(arr){
        let me = this
        if(arr && arr.length>0){
        arr.forEach(item=>{
          if(!me.resultList.find(y=>y.userId==item.userId)){
            me.resultList.push(item)
          }
        })
        }
      },

      //删除数组
      removeItem2Result(arr){
        let me = this
        if(arr && arr.length >0 ){
          let arrIds = arr.map(x=>x.userId);
          let arrLength = arrIds.length;
          let resultLen = me.resultList.length;
          for(let i = 0;i < arrLength;i++ ){
            let currentId = arrIds[i];
            let index  = me.resultList.findIndex(x=>x.userId == currentId);
            if(index > -1){
              me.resultList.splice(index, 1)
            }

          }
        }
      },

      // 点击事件
      nodeClick(node, data, self){
        let me = this
        console.log(node,data, self)
        me.currentChooseGroupId = node.id
        // 根据currentChooseGroupId 来获取人员
        me.getUsersByOrganizeId();






      },
      //confirm
      confirm(){
        this.$emit('get-choose-person',this.resultList)
      },

      cancel(){
        this.$emit('cancel-choose-person')
      },

      clearResult(){
        alert("清空数据");
        this.resultList = [];
        this.checkAll = false;
        this.checkedPersonIds = [];
        this.checkedPerson = [];
        this.$emit('sync-result',[]);
      }

    }

  }

</script>

<style scoped>
.e-person-choose{
  margin: 0 auto;
  height:100%;
  width:100%;
}


.e-person-choose__row{
  display: flex;
  justify-content: center;
  height:500px;
  border:1px solid #dedede;
}

.e-person-choose__left{
  flex:1;
  max-height: 100%;
  overflow: auto;
  border-right:1px solid #dedede;
  padding-top:10px;
}
.e-person-choose__middle{
  width:24px;
  height: auto;
  border-right:1px solid #dedede;
}
.e-person-choose__right{
  flex:1;
  padding-left:10px;
  text-align:left;
  overflow:auto;
}

.e-person-choose__result{

  border-top:1px solid #dedede;
  border-bottom:1px solid #dedede;
  height:100px;
  overflow:auto;
  padding-top:10px;
  padding-bottom:10px;
  text-align:left;
}

.e-person-choose__result--item{
  position:relative;
  height:100px;
  width:100px;
  text-align:center;
  display:inline-block;
}

.e-person-choose__close{
  position:absolute;
  top:0;
  right:0;
  height:10px;
  width:10px;
}

.e-person-choose__checkbox-group{
  overflow: auto;
}

.e-person-choose__checkbox{
  display: block;
}

.e-person-choose__checkbox-group .el-checkbox+.el-checkbox{
  margin-left: 0
}

.e-person-choose__footer{
  margin-top:10px;
  text-align: center;
}
.e-person-choose__left-input{
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  width: calc(100% - 20px);
}

.e-person-choose__left-tree{
  margin-left: 10px;
  margin-right: 10px;
}

.tag-gap{
  margin-right: 10px;
}

</style>

