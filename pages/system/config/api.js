// 系统配置
export function getConfigDatas(params) {
  return unfetch({
    url: '/config/list',
    method: 'get',
    params
  });
}

export function saveConfig(params) {
  return unfetch({
    url: '/config',
    method: 'post',
    data: params
  });
}

export function batchSaveConfig(params) {
  return unfetch({
    url: '/config/batch',
    method: 'post',
    data: params
  });
}

export function validConfigKey(params) {
  return unfetch({
    url: '/config/valid',
    method: 'get',
    params
  });
}

export function updateConfig(params) {
  return unfetch({
    url: '/config',
    method: 'put',
    params
  });
}