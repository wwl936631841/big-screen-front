//实时水质
export function getQualityRealtime(params) {
  return unfetch({
    url: '/monitor/quality/realtime',
    params: params
  });
}

//实时水情
export function getWaterRealtime(params) {
  return unfetch({
    url: '/monitor/realtimeWater',
    params: params
  });
}





