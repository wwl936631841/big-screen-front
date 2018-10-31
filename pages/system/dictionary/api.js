// 字典表
export function getDictionaries(params) {
  return unfetch({
    url: '/dictionary/list',
    method: 'get',
    params
  })
}

export function updateDictionary(params) {
  return unfetch({
    url: '/dictionary',
    method: 'put',
    params
  })
}

export function deleteDictionary(params) {
  return unfetch({
    url: '/dictionary',
    params,
    method: 'delete'
  })
}

export function validDictionary(params) {
  return unfetch({
    url: '/dictionary/valid',
    method: 'get',
    params
  })
}

export function saveDictionary(params) {
  return unfetch({
    url: '/dictionary',
    method: 'post',
    data: params
  })
}
export function savePortalRole(params) {
  return unfetch({
    url: '/roles/insertRole',
    method: 'post',
    data: params
  })
}


export function getDictionaryDatas(params) {
  return unfetch({
    url: '/dictionary/datas',
    method: 'get',
    params
  })
}
export function getPortalRoleDatas(params) {
  return unfetch({ 
    url: '/roles/selectList',
    method: 'get',
    params
  })
}
export function getRoleList(params) {
  return unfetch({ 
    url: '/roles/getRoles',
    method: 'get',
    params
  })
}

export function validDictionaryData(params) {
  return unfetch({
    url: '/dictionary/data/valid',
    method: 'get',
    params
  })
}

export function validDictionaryDataSort(params) {
  return unfetch({
    url: '/dictionary/data/valid/sort',
    method: 'get',
    params
  })
}

export function getDictionaryDataByCode(params) {
  return unfetch({
    url: '/dictionary/code',
    method: 'get',
    params
  })
}

export function saveDictionaryData(params) {
  return unfetch({
    url: '/dictionary/data',
    method: 'post',
    data: params
  })
}

export function updateDictionaryData(params) {
  return unfetch({
    url: '/dictionary/data',
    method: 'put',
    params
  })
}

export function deleteDictionaryData(params) {
  return unfetch({
    url: '/dictionary/data',
    params,
    method: 'delete'
  })
}