export function CreateHeatMapLayer(heatLayerId, mapInstance) {
    let layerDefinition = {
        "geometryType": "esriGeometryPoint",
        "fields": [{
                "name": "X",
                "type": "esriFieldTypeDouble",
                "alias": "X"
            },
            {
                "name": "Y",
                "type": "esriFieldTypeDouble",
                "alias": "Y"
            }
        ]
    };

    let featureCollection = {
        layerDefinition: layerDefinition,
        featureSet: null
    };

    let hFeatureLayer = new esri.layers.FeatureLayer(featureCollection, {
        id: heatLayerId,
        mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
        opacity: 1
    });
    mapInstance.addLayer(hFeatureLayer);

    let heatmapRenderer = new esri.renderer.HeatmapRenderer({
        // colors: ["rgba(173, 175, 245, 0)", "rgb(230, 235, 208)", "rgb(238, 219, 78)", "rgb(205, 116, 122)"],//原型色带
        // colors: ["rgba(255, 0, 0,0)", "rgb(255, 255, 0)", "rgb(0, 128, 0)", "rgb(0, 0, 255)"], //百度地图色带
        // colors: ["rgba(0, 0, 255,0)", "rgb(0, 128, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 0)"], //百度地图色带
        colors: ["rgba(0, 0, 225,0)", "rgb(117, 211, 248)", "rgb(0, 255, 0)", "rgb(255, 234, 0)", "rgb(255, 0, 0)"], //高德地图色带
        blurRadius: 40,
        maxPixelIntensity: 230,
        minPixelIntensity: 8
    });
    hFeatureLayer.setRenderer(heatmapRenderer);
    return hFeatureLayer;
};

export let Config = {
    // COMPLAIN_HEAT_LAYER_ID: 'complainHeatLayer',
    COMPLAIN_HEAT_LAYER_ID: '投诉热力图',
    COMPLAIN_DISTRIBUTE_LAYER_ID: 'distribute-layer',
    COMPLAIN_POI_LAYER_ID: '投诉点位',
};

export function CheckCoordinateExtent(x, y) {
    // let xmin = 113.132744,
    //     xmax = 113.377361,
    //     ymin = 22.772541,
    //     ymax = 22.916500;
    let xmin = 113.1,
        xmax = 113.4,
        ymin = 22.7,
        ymax = 23.0;

    if (x > xmin && x < xmax && y > ymin && y < ymax) {
        return true;
    } else {
        return false;
    }
}

//格式化时间格式
//源格式：2018-07-30 14:43:05
//目标格式:07-30 14:43
export function formatDateTime(srcDT) {
    return srcDT.substring(5, 16);
}

//格式化时间(保留至分钟)
//源格式：2018-07-30 14:43:05
//目标格式:2018-07-30 14:43
export function formatDateTimeM(srcDT) {
    return srcDT.substring(0, 16);
}

//格式化时间(仅保留年月日)
//源格式：2018-07-30 14:43:05
//目标格式:2018-07-30
export function formatDate(srcDT) {
    return srcDT.substring(0, 10);
}

//获取当前日期，格式YYYY-MM-DD
export function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//获取当前时间，格式yyyy-MM-dd HH:MM:SS
export function getNowFormatTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    var hour = date.getHours();
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }

    var minute = date.getMinutes();
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }

    var second = date.getSeconds();
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + minute + seperator2 + second;
    return currentdate;
}