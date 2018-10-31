<template>
<div id="tool_container" class="toolbox">
    <ul class='toolbox-ul'>
        <li class='item' id='layer' @mouseover="showLayerDiv" @mouseout="hideLayerDiv"><i class='ic-graph ic-layer'></i><span class='ic-text'>图层</span>
            <div class='layerDiv' id='layerSub' :class="{'active':showLayersDiv}">
                <ul class="listbox">
                    <app-layer v-for='(layer,index) in displayedLayers' :key='index' :layerInfo='layer'></app-layer>
                </ul>
            </div>
        </li>
        <li class='item' style="position:unset" id='tLi' @mouseover="showToolDiv" @mouseout="hideToolDiv"><i class='ic-graph ic-tool'></i><span class='ic-text'>工具</span>
            <ul class="tool-ul" id='toolDiv' :class="{'active':showToolsDiv}">
                <li class='tool-li-cg' id='bMeasureLine'><i class='toolcjlabel'></i><span class='ic-text'>测距</span></li>
                <li class='tool-li-cm' id='bMeasureArea'><i class='toolcmlabel'></i><span class='ic-text'>测面</span></li>
            </ul>
        </li>
        <li class='item' id='zoomIn' @click="zoomIn"><i class='ic-graph ic-add'></i><span class='ic-text'>放大</span></li>
        <li class='item' id='zoomOut' @click="zoomOut"><i class='ic-graph ic-min'></i><span class='ic-text'>缩小</span></li>
        <li class='item' id='panMove' @click="panMove"><i class='ic-graph ic-move'></i><span class='ic-text'>平移</span></li>
        <li class='item' id='preExtent' @click="preExtent" :disabled="isFirstExtent"><i class='ic-graph ic-left'></i><span class='ic-text'>前一视图</span></li>
        <li class='item' id='nextExtent' @click="nextExtent" :disabled="isLastExtent"><i class='ic-graph ic-right'></i><span class='ic-text'>后一视图</span></li>
        <!-- <li class='item' id='bClear' @click="clearMap"><i class='ic-graph ic-empty'></i><span class='ic-text'>清空</span></li> -->
        <!-- <li class='item' id='fullScreen' @click="fullScreen"><i class='ic-graph ic-full'></i><span class='ic-text'>全屏</span></li> -->
    </ul>
</div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    import { loadModules } from 'esri-loader';
    import layer from './layer';
    import store from '../store';
    export default {
        props: {
            displayedLayers: {
                type: Array,
                required: true
            },
        },
        components: {
            'app-layer': layer,
        },
        data(){
            return{
                map:null,
                navToolbar:null,
                isFirstExtent:false,
                isLastExtent:false,
                showLayersDiv:false,
                showToolsDiv:false,
                
            }
        },

        methods: {
            //显示图层面板
            showLayerDiv(){
                this.showLayersDiv=true;       
            },
            //折叠图层面板
            hideLayerDiv(){
                this.showLayersDiv=false;         
            },
            //显示工具面板
            showToolDiv(){
                this.showToolsDiv=true;       
            },
            //折叠工具面板
            hideToolDiv(){
                this.showToolsDiv=false;         
            },
            //清除
            clearMap() {
                this.map.graphics.clear();
                for (let i = 0; i < this.map.graphicsLayerIds.length; i++) {
                    let layer = map.getLayer(this.map.graphicsLayerIds[i]);
                    layer.clear();
                }
                this.map.infoWindow.hide();
            },
            //平移
            panMove() {
                let self=this;
                loadModules(["esri/toolbars/navigation"])                
                .then(([Navigation]) => {
                    if(self.map){
                       self.map.setMapCursor("default"); 
                    }                     
                    self.navToolbar.activate(Navigation.PAN);
                })
                .catch(err => {                    
                    console.error(err);
                });
            },
            preExtent(){                
                this.navToolbar.zoomToPrevExtent();
            },
            nextExtent(){                
                this.navToolbar.zoomToNextExtent();
            },
            extentHistoryChangeHandler(){
                this.isFirstExtent= this.navToolbar.isFirstExtent();
                this.isLastExtent= this.navToolbar.isLastExtent();
            },
            zoomIn() {
                let self=this;
                loadModules(["esri/toolbars/navigation"])                
                .then(([Navigation]) => {  
                    if(self.map){
                       self.map.setMapCursor("url('static/cursor/zoomin.cur'),auto"); 
                    }                  
                    self.navToolbar.activate(Navigation.ZOOM_IN);
                })
                .catch(err => {                    
                    console.error(err);
                });
            },
            zoomOut(){
                let self=this;
                loadModules(["esri/toolbars/navigation"])                
                .then(([Navigation]) => {  
                    if(self.map){
                       self.map.setMapCursor("url('static/cursor/zoomout.cur'),auto"); 
                    }                   
                    self.navToolbar.activate(Navigation.ZOOM_OUT);
                })
                .catch(err => {
                    console.error(err);
                });
            },
            fullScreen(){

            },
            InitTool(map){
                let self=this;
                self.map=map;
                loadModules(['esri/toolbars/navigation',
                            "esri/toolbars/draw",
                            "esri/symbols/SimpleFillSymbol",
                            "esri/symbols/SimpleLineSymbol","esri/Color","dextra/modules/MeasureTools","dijit/registry"])                
                    .then(([Navigation,Draw,SimpleFillSymbol,SimpleLineSymbol,Color,MeasureTools,registry]) => {
                        self.navToolbar=new Navigation(self.map);
                        self.navToolbar.on("extent-history-change", self.extentHistoryChangeHandler);

                        if(registry.byId("toolDiv")){
                            registry.byId("toolDiv").destroy();
                        }

                        var measureTool=new MeasureTools({
                            map:self.map
                        },"toolDiv");                        
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
        },
        created () {
        },
        beforeDestory () {
        },
        mounted(){
        },
        computed: {
        }
    }
</script>
<style lang="scss" scoped>
.toolbox-ul {
    list-style-type: none;
    overflow: hidden;
    margin: 0;
    padding: 0;
    >li {
        display: inline-block;
        padding-right: 6px;
        :not(:nth-last-child()) {
            padding-right: 4px;
        }
    }    
}

.tool-ul{
    background-color: #fff;
    width: 60px;
    text-align: center;
    position: absolute;
    left: 62px;
    top: 44px;
    list-style: none;
    padding: 0px;
    display: none;

    .tool-li-cg,.tool-li-cm{
        display: inline-block;
        width: 60px;
        height: 40px;
    }  
    li:hover{
        .toolcmlabel{
            display: inline-block;
            // width: 14px;
            // height: 14px;
            width: 16px;
            height: 16px;
            margin-right: 4px;
            background-image: url("./img/ic_cm_select.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 1px 1px;
        }
        .toolcjlabel{
            display: inline-block;
            // width: 15px;
            // height: 15px;
            width: 16px;
            height: 16px;
            margin-right: 4px;
            background-image: url("./img/ic_measure_select.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 1px 1px;
        }           
    } 
}

.item  {
    .ic-graph{
        display: inline-block;
        // height: 13px;
        // width: 13px;
        height: 16px;
        width: 16px;
        margin-left: 6px;
        margin-right: 6px;
    }
    &:hover {
        cursor: pointer;
        border: 1px solid #e5e5e5;
        background: #e8eff6;
        border-bottom: none;
        background-size: contain;
        background-repeat: no-repeat;
        .ic-layer {
            background-image: url("./img/ic_layer_select.png");
        }
        .ic-add {
            background-image: url("./img/ic_add_select.png");
        }        
        .ic-text {
            color: #4087F0;
            font-size: 12px;
        }  
        .ic-min {
            background-image: url("./img/ic_min_select.png");
        }
        .ic-move {
            background-image: url("./img/ic_move_select.png");
        }     
        .ic-left {
            background-image: url("./img/ic_left_select.png");
        }   
        .ic-right {
            background-image: url("./img/ic_right_select.png");
        }     
        .ic-tool {
            background-image: url("./img/ic_tool_select.png");
        }     
        .ic-empty {
            background-image: url("./img/ic_query_3_select.png");
        } 
        .ic-full {
            background-image: url("./img/ic_full_select.png");
        }     
        .ic-full-exit {
            background-image: url("./img/ic_full_exit_select.png");
        }           
    }
}

.toolcjlabel {
     display: inline-block;
    //  width: 15px;
    //  height: 15px;
     width: 16px;
     height: 16px;
     margin-right: 4px;
     background-image: url("./img/ic_measure.png");
     background-size: contain;
     background-repeat: no-repeat;
     background-position: 1px 1px;
 }

.toolcmlabel {
    display: inline-block;
    // width: 14px;
    // height: 14px;
    width: 16px;
    height: 16px;
    margin-right: 4px;
    background-image: url("./img/ic_cm.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 1px 1px;
}

.ic{
    &-text {
        font-size: 12px;
        font-weight:400;
        color:rgba(255,255,255,1);
    }    
    &-layer {
        background-image: url("./img/ic_layer.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    &-add {
        background-image: url("./img/ic_add.png");
        background-size: contain;
        background-repeat: no-repeat;        
    }
    &-min {
        background-image: url("./img/ic_min.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    &-move {
        background-image: url("./img/ic_move.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    &-left {
        background-image: url("./img/ic_left.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    &-right {
        background-image: url("./img/ic_right.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    &-tool {
        background-image: url("./img/ic_tool.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    &-empty {
        background-image: url("./img/ic_empty.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    &-full {
        background-image: url("./img/ic_full.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
    &-full-exit {
        background-image: url("./img/ic_full_exit.png");
        background-size: contain;
        background-repeat: no-repeat;
    }
}

.layerDiv {
    flex-direction: row;
    display: none;
    position: absolute;
    width: 156px;
    border-radius:2px;
    background:rgba(0,158,255,1);
    box-shadow:0px 2px 4px 0px rgba(3,10,44,1);
    opacity:0.6;
}
.active{
    display: block;
}
.resize-width{
    width: 650px;
}
.toolbox {
    position: absolute;
    top: 20px;
    left: 250px;
    // top: 10px;
    // left: 150px;
    width: 480px;
    border-radius: 2px;
    height: 44px;
    line-height: 44px;
    z-index: 99;
    color:rgba(255,255,255,1);
    font-size: 12px;
    font-weight:400;
    background:rgba(0,158,255,1);
    box-shadow:0px 2px 4px 0px rgba(3,10,44,1);
    opacity:0.6;    
}
.listbox{
    padding-left: 8px;
    background-color: #fff;
}
</style>