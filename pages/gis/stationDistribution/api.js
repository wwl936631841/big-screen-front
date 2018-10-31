//查询站点信息(搜索功能使用)
export function GetStationInfo(params) {
    return unfetch({
        url: '/gis/home/station/name',
        method: 'get',
        params
    });
}
//查询在线监控报警站点信息
export function GetMonitorAlarmStation(params) {
    return unfetch({
        url: '/gis/monitor/alarm/station',
        method: 'get',
        params
    });
}