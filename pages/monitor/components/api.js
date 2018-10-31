//实时水质
export function getQualityRealtime(params) {
  return unfetch({
    url: '/monitor/quality/realtime',
    params: params
  });
}

//河涌水质月分析
export function getQualityMonth(params) {
  return unfetch({
    url: '/monitor/quality/month',
    params: params
  });
}

//站点分布
export function getQualitySites(params) {
  return unfetch({
    url: '/monitor/sites',
    params: params
  });
}

//报警分布
export function getQualityAlarm(params) {
  return unfetch({
    url: '/monitor/alarm/distribution',
    params: params
  });
}

//实时水情
export function getQualityWater(params) {
  return unfetch({
    url: '/monitor/realtime/water',
      });
}
// 水质目标达标率
export function getTargetStandardRate() {
    return unfetch({
      url: '/monitor/quality/rate'
    });
  }

// 水质级别季度占比
export function getQualityQuarterRate() {
  return unfetch({
    url: '/monitor/quality/level'
  });
}
// 水质级别季度占比
export function getQualityQuarterProject() {
  return unfetch({
    url: '/monitor/quality/project'
  });
}

// 河涌水质达标分析
export function getRiverQualityTrend() {
  return unfetch({
    url: '/monitor/quality/trend'
  });
}