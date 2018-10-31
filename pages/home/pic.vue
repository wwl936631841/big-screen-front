<template>
    <div class="video">
        <div class="left">
            <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
            </el-tree>
        </div>
        <div class="right">
            <div class="box1">
                <ul>
                    <li>
                        <p>监控站1#</p>
                    </li>
                    <li>
                        <p>监控站1#</p>
                    </li>
                    <li>
                        <p>监控站1#</p>
                    </li>
                    <li>
                        <p>监控站1#</p>
                    </li>
                    <li>
                        <p>监控站1#</p>
                    </li>
                    <li>
                        <p>监控站1#</p>
                    </li>
                    <li>
                        <p>监控站1#</p>
                    </li>
                    <li>
                        <p>监控站1#</p>
                    </li>
                </ul>
            </div>
            <div class="box2">
                <div class="top">
                    <el-button class="t btn" type="primary">
                        <i class="el-icon-caret-top"></i>
                    </el-button>
                    <el-button class="b btn" type="primary">
                        <i class="el-icon-caret-bottom"></i>
                    </el-button>
                    <el-button class="l btn" type="primary">
                        <i class="el-icon-caret-left"></i>
                    </el-button>
                    <el-button class="r btn" type="primary">
                        <i class="el-icon-caret-right"></i>
                    </el-button>
                    <el-button class="reload btn" type="primary">
                        <i class="el-icon-refresh"></i>
                    </el-button>
                </div>
                <div class="bottom">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import a from './a.scss';
export default {
    data() {
      return {
        value1: 0,
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
}
</script>
<style lang="scss" scoped>

    .video{
        width: 3840px;
        height: 1040px;
        display: flex;
        .left{
            flex-basis: 400px;
            height: 1040px;
            background-color: #134163;
            >.el-tree{
                background-color: #134163 !important;
                color: #fff !important;
            }
        }
        .right{
            flex: 1;
            height: 1040px;
            display: flex;
            position: relative;
            // background-color: #fff;
            >.box1{
                width: 2840px;
                height: 920px;
                background-color:#fff;
                margin: 60px 0 0 60px;
                >ul{
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    margin: 0;
                    padding: 0;
                    li{
                        width: 690px;
                        height: 450px;
                        background-color: red;
                        margin-bottom: 20px;
                        position: relative;
                        >p{
                            margin: 0;
                            width: 100%;
                            height: 60px;
                            background-color: rgba($color: #000000, $alpha: 0.5);
                            position: absolute;
                            font-size: 28px;
                            color: #fff;
                            line-height: 60px;
                            padding-left: 20px;
                            box-sizing: border-box;
                        }

                    }
                }
            }
            >.box2{
                position: absolute;
                right: 45px;
                top: 60px;
                width: 450px;
                height: 920px;
                background-color: #fff;
                >.top{
                    position: relative;
                    width: 100%;
                    height: 450px;
                    // background-color: yellowgreen;
                    margin-bottom:20px; 
                    .btn{
                        width: 120px;
                        height: 120px;
                        position: absolute;
                        font-size: 40px;
                    }
                    .t{
                        left: 165px;
                        top: 20px;
                    }
                    .b{
                        left: 155px;
                        bottom: 20px;
                    }
                    .l{
                        left: 10px;
                        top: 165px;
                    }
                    .r{
                        right: 20px;
                        top: 165px;
                    }
                    .reload{
                        left: 155px;
                        top: 165px;
                    }
                }
                .bottom{
                    width: 100%;
                    height: 450px;
                    background-color: greenyellow;
                }
            }
        }  
    }
        
</style>


