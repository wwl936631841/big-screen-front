<template>
    <div class="search">
        <el-autocomplete
            v-model="station"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入站点名称"
            @select="handleSelect"
            style="width: 295px;"
            @focus="toggleTypePanel()"
        >
        </el-autocomplete>
        <el-button class="search-btn" size="mini" type="primary" icon="el-icon-search" ></el-button>
    </div>
</template>
<script>
import {mapState } from 'vuex';
import store from '../../MapFrame/store';
import { loadModules } from 'esri-loader';
import {GetStationInfo} from '../api';
import {CheckCoordinateExtent} from '../../utils';

export default{
    name:'search-control',
    data(){
        return{
            station: '',
            stations: [],
            curItem:null,
        }
    },
    created(){
    },
    mounted() {
        this.loadAllStations();
    },
    computed:{
        ...mapState(store.name, ['mapInstance']),
    },
    methods:{
        loadAllStations() {
            let self=this;
            GetStationInfo()
            .then(({data})=>{
                if(data.length>0){
                    //过滤有效坐标站点
                    let validStations=data.filter(v=>{
                        if(v.LONGITUDE&&v.LATITUDE&&CheckCoordinateExtent(v.LONGITUDE,v.LATITUDE)){
                            return v;
                        }
                    });
                    self.stations=validStations.map(v=>{
                        return{
                            value:v.NAME,
                            LONGITUDE: v.LONGITUDE,
                            ID: v.ID,
                            LATITUDE: v.LATITUDE,
                            TYPE: v.TYPE,
                            TYPE_NAME: v.TYPE_NAME,
                            NAME: v.NAME
                        }
                    });
                }
            })
            .catch(
                err => {console.error(err);}
            );
        },
        querySearchAsync(queryString, cb) {
            let stations = this.stations;
            let results = queryString ? stations.filter(this.createStateFilter(queryString)) : stations;

            cb(results);
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
            };
        },
        handleSelect(item) {
            console.log(item);

            // let selected=item||curItem;

            let self=this;

            loadModules(["esri/geometry/Point"])
            .then(([Point])=>{
                let name=item.NAME;
                let x=item.LONGITUDE;
                let y=item.LATITUDE;
                let id=item.ID;
                let type=item.TYPE;
                let typeName=item.TYPE_NAME;

                if(x&&y&&CheckCoordinateExtent(x,y)){
                    let geometry = new Point(x,y);                        
                    //缩放并居中
                    self.mapInstance.centerAndZoom(geometry, 15);

                    let layer=self.mapInstance.getLayer(typeName);
                    if(layer!=null){
                        //保证该图层是显示状态
                        if(!layer.visible){
                            layer.setVisibility(true);
                        }

                        let graphic=layer.graphics.find((g)=>{
                            return g.attributes['NAME']==name;
                        });
                        
                        if(graphic!=null){
                            let resizeInterval1,resizeInterval2;
                            let resizeTimer,resizeTime=1000;

                            clearTimeout(resizeTimer);

                            resizeInterval1=setInterval(function(){
                                graphic.hide()
							},200);					
							resizeInterval2=setInterval(function(){
                                graphic.show()
                            },220);	
                            
                            resizeTimer=setTimeout(function(){
                                clearInterval(resizeInterval1);	
                                clearInterval(resizeInterval2);	
                                graphic.show();					
                            },resizeTime);
                        }
                    }
                }
            })
            .catch(
                err => {console.error(err);}
            );
        },
        toggleTypePanel(){
            this.showTypePanel=true;
        }
    }
}
</script>
<style lang="scss" scoped>
    .search {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 999;
        display: inline-block;
        background-color: rgba(1, 99, 170,.5);
        width: 345px;
        // background:rgba(0,158,255,1);
        box-shadow:0px 2px 4px 0px rgba(3,10,44,1);
        border-radius:1px;
        opacity:0.6;
        &-btn{
            position:relative;
            left:-5px;
            top:-1px;
        }
    }
    
</style>
<style lang="scss">
.el-autocomplete-suggestion{
        .el-scrollbar__wrap{
            background-color: rgba(1, 99, 170,.5) !important;
            // border:1px solid #0163aa;
            ul{
                li{
                    color:#fff;
                    &:hover{
                        background-color: rgb(34, 140, 182);
                    }
                }
            }
        }
    }
    .el-input__inner{
        background-color: rgba(1, 99, 170,.5) !important;
        border-right:none;
        color: #fff !important;
    }
    .search-btn{
        border:1px solid #fff;
        background: rgba(1, 99, 170,.5);
        border-left: none;
        left:-10px !important;
    }
</style>

