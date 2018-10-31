//查询指定专题下的所有图层详细信息
export function getLayerDetailsInSubject(params) {
    return unfetch({
        url: '/gis/maplayer/getLayerDetailsInSubject',
        method: 'get',
        params
    });
}

//查询指定视图中所有数据
export function getViewData(params) {
    return unfetch({
        url: '/gis/views/getViewData',
        method: 'get',
        params
    });
}

//查询专题列表
export function getSubjectList(params) {
    return unfetch({
        url: '/map/subject/list',
        method: 'get',
        params
    });
}