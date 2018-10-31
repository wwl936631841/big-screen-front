//查询投诉热力图数据
export function GetComplainHeatMap(params) {
    return unfetch({
        url: '/gis/complainsubject/heating',
        method: 'get',
        params
    });
}