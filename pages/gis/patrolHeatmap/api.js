//热力图数据查询
export function GetHeatMapData(params) {
    return unfetch({
        url: '/gis/patrolsubject/heating',
        method: 'get',
        params
    });
}