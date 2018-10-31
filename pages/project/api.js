export function getTrail(pageParams) {
  return unfetch({
    url: '/demo/info/trails',
    params: pageParams
  });
}

export function getUserPermission(params) {
  return unfetch({
    url: '/user/permission',
    method: 'get',
    params
  });
}

// 计划详情api
export function getInfo(pageParams) {
  return unfetch({
    url: '/demo/info/infos',
    params: pageParams
  });
}

export function modifyInfo(modifyData) {
  return unfetch.put(
    '/demo/info/todo',
    modifyData
  );
}

export function deleteInfo(id) {
  return unfetch.delete(
    '/demo/info/infos', {
      params: {
        ID: id
      }
    }
  );
}
