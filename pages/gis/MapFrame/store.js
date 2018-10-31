export const name = 'mapStore'

const store = {
    name,
    state: {
        //地图实例
        mapInstance: null,
        //专题业务数组(复选框)
        subjectLayers: [],
        //报警点闪烁符号
        alarmPms: null,
        //报警图层
        alarmLayer: null,
        //巡检业务数组(单选框)
        patrolLayers: [],
        //投诉业务数组(单选框)
        complainLayers: [],
        //外部系统调用图层
        invokeLayer: null,
        //地图配置参数
        mapConfig: null,
        //数据监控一张图图层类型,默认值:'StationDistribution'
        bizLayerType: 'StationDistribution',
    },
    mutations: {
        UPDATE_MAP_INSTANCE: (state, instance) => {
            state.mapInstance = instance;
        },
        SET_SUBJECTLAYERS: (state, layers) => {
            state.subjectLayers = layers;
        },
        ADD_SUBJECT_LAYER: (state, layer) => {
            state.subjectLayers.push(layer);
        },
        DELETE_SUBJECT_LAYER: (state, layer) => {
            //TODO
            // state.subjectLayers.push(layer);
        },
        CLEAR_SUBJECTLAYERS: (state) => {
            //先移除地图中的图层
            if (state.mapInstance && state.subjectLayers) {
                state.subjectLayers.forEach(element => {
                    let layer = state.mapInstance.getLayer(element.id);
                    if (layer) {
                        state.mapInstance.removeLayer(layer);
                    }
                });
            }
            state.subjectLayers = [];
        },
        TOGGLE_LAYER_VISIBILITY: (state, obj) => {

            let { layerId, isVisible } = obj;

            if (state.mapInstance) {
                let layer = state.mapInstance.getLayer(layerId);
                if (layer) {
                    layer.setVisibility(isVisible);
                }

                //同步开关报警图层中的相应点
                state.alarmLayer = state.mapInstance.getLayer('alarm-layer');
                if (state.alarmLayer) {
                    state.alarmLayer.graphics.forEach(g => {
                        if (g.attributes['REL_LAYER_ID'] === layerId) {
                            if (isVisible) {
                                g.show();
                            } else {
                                g.hide();
                            }
                        }
                    });
                }

                //同步开关subjectLayers中的相应图层
                let subjectLayer = state.subjectLayers.find(v => v.id === layerId);
                if (subjectLayer) {
                    subjectLayer.visible = isVisible;
                }
            }
        },
        SET_ALARM_PMS: (state, sysmbol) => {
            state.alarmPms = sysmbol;
        },
        SET_ALARM_LAYER: (state, layer) => {
            state.alarmLayer = layer;
        },
        RESET_ALARM_LAYER: (state) => {
            if (state.alarmLayer && state.mapInstance) {
                //清空报警图层
                state.alarmLayer.clear();
                //移到最顶端，防止被站点图层遮挡
                let topIndex = state.mapInstance.graphicsLayerIds.length;
                state.mapInstance.reorderLayer(state.alarmLayer, topIndex);
            }
        },
        SET_PATROL_LAYERS: (state, layers) => {
            state.patrolLayers = layers;
        },
        SET_COMPLAIN_LAYERS: (state, layers) => {
            state.complainLayers = layers;
        },
        SET_INVOKE_LAYER: (state, layer) => {
            state.invokeLayer = layer;
        },
        SET_MAP_CONFIG: (state, config) => {
            state.mapConfig = config;
        },
        SET_BIZ_LAYER_TYPE: (state, type) => {
            state.bizLayerType = type;
        },
    },
    actions: {
        updateMapInstance: ({ commit }, instance) => {
            commit('UPDATE_MAP_INSTANCE', instance);
        },
        setSubjectLayers({ commit }, layers) {
            commit('SET_SUBJECTLAYERS', layers);
        },
        addSubjectLayer({ commit }, layer) {
            commit('ADD_SUBJECT_LAYER', layer);
        },
        deleteSubjectLayer({ commit }, layer) {
            commit('DELETE_SUBJECT_LAYER', layer);
        },
        clearSujectLayers({ commit }) {
            commit('CLEAR_SUBJECTLAYERS');
        },
        toggleLayerVisibility({ commit }, obj) {
            commit('TOGGLE_LAYER_VISIBILITY', obj);
        },
        setAlarmPms({ commit }, sysmbol) {
            commit('SET_ALARM_PMS', sysmbol);
        },
        setAlarmLayer({ commit }, layer) {
            commit('SET_ALARM_LAYER', layer);
        },
        resetAlarmLayer({ commit }) {
            commit('RESET_ALARM_LAYER');
        },
        setPatrolLayers({ commit }, layers) {
            commit('SET_PATROL_LAYERS', layers);
        },
        setComplainLayers({ commit }, layers) {
            commit('SET_COMPLAIN_LAYERS', layers);
        },
        setInvokeLayer({ commit }, layer) {
            commit('SET_INVOKE_LAYER', layer);
        },
        setMapConfig({ commit }, config) {
            commit('SET_MAP_CONFIG', config);
        },
        setBizLayerType({ commit }, type) {
            commit('SET_BIZ_LAYER_TYPE', type);
        }
    }
}

export default store