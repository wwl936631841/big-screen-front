export function getPatrolStatisticsData(params) {
  return unfetch({
    url: '/manage/patrol/statistics',
    params: params
  });
}

export function getMaterialsCostData(params) {
  return unfetch({
    url: '/manage/materials/cost',
    params: params
  });
}

export function getPatrolAnalsisData(params) {
  return unfetch({
    url: '/manage/patrol/analsis',
    params: params
  });
}

export function getEvaluateStatisticsData(params) {
  return unfetch({
    url: '/manage/evaluate/statistics',
    params: params
  });
}

export function getComplainStatisticsData(params) {
  return unfetch({
    url: '/manage/complain/statistics',
    params: params
  });
}

export function getEmergencyStatisticsData(params) {
  return unfetch({
    url: '/manage/emergency/statistics',
    params: params
  });
}

export function getPipeDefectData(params) {
  return unfetch({
    url: '/manage/pipe/defect',
    params: params
  });
}



