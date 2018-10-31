//获取地图参数
export function getMapParas() {
    return unfetch({
        url: '/gis/map/params/getInitialMapParams',
        method: 'get'
    });
}
//获取电子底图信息
export function getSubjectVectorBaseInfo() {
    return unfetch({
        url: '/gis/maplayer/getSubjectVectorBaseInfo',
        method: 'get'
    });
}
//获取影像底图信息
export function getSubjectImageBaseInfo() {
    return unfetch({
        url: '/gis/maplayer/getSubjectImageBaseInfo',
        method: 'get'
    });
}