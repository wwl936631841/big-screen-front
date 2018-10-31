// 字典表
export function getFileTypeList(params) {
  return unfetch({
    url: '/file/type/list',
    method: 'get',
    params
  })
}

export function updateFileType(params) {
  return unfetch({
    url: '/file/type',
    method: 'put',
    params
  })
}

export function deleteFileType(params) {
  return unfetch({
    url: '/file/type',
    params,
    method: 'delete'
  })
}

export function validFileType(params) {
  return unfetch({
    url: '/file/type/valid',
    method: 'get',
    params
  })
}

export function saveFileType(params) {
  return unfetch({
    url: '/file/type',
    method: 'post',
    data: params
  })
}
// export function savePortalRole(params) {
//   return unfetch({
//     url: '/roles/insertRole',
//     method: 'post',
//     data: params
//   })
// }


// export function getDictionaryDatas(params) {
//   return unfetch({
//     url: '/dictionary/datas',
//     method: 'get',
//     params
//   })
// }
// export function getPortalRoleDatas(params) {
//   return unfetch({ 
//     url: '/roles/selectList',
//     method: 'get',
//     params
//   })
// }
// export function getRoleList(params) {
//   return unfetch({ 
//     url: '/roles/getRoles',
//     method: 'get',
//     params
//   })
// }

// export function validDictionaryData(params) {
//   return unfetch({
//     url: '/dictionary/data/valid',
//     method: 'get',
//     params
//   })
// }

// export function validDictionaryDataSort(params) {
//   return unfetch({
//     url: '/dictionary/data/valid/sort',
//     method: 'get',
//     params
//   })
// }

// export function getDictionaryDataByCode(params) {
//   return unfetch({
//     url: '/dictionary/code',
//     method: 'get',
//     params
//   })
// }

// export function saveDictionaryData(params) {
//   return unfetch({
//     url: '/dictionary/data',
//     method: 'post',
//     data: params
//   })
// }

// export function updateDictionaryData(params) {
//   return unfetch({
//     url: '/dictionary/data',
//     method: 'put',
//     params
//   })
// }

// export function deleteFileTypeData(params) {
//   return unfetch({
//     url: '/dictionary/data',
//     params,
//     method: 'delete'
//   })
// }


//====================



export function getFileTypeDatas(params) {
  return unfetch({
    url: '/file/type/data/datas',
    method: 'get',
    params
  })
}

export function validFileTypeData(params) {
  return unfetch({
    url: '/file/type/data/valid',
    method: 'get',
    params
  })
}

export function validFileTypeDataSort(params) {
  return unfetch({
    url: '/file/type/data/valid/sort',
    method: 'get',
    params
  })
}


export function saveFileTypeData(params) {
  return unfetch({
    url: '/file/type/data/data',
    method: 'post',
    data: params
  })
}

export function updateFileTypeData(params) {
  return unfetch({
    url: '/file/type/data/data',
    method: 'put',
    params
  })
}

export function deleteFileTypeData(params) {
  return unfetch({
    url: '/file/type/data/data',
    params,
    method: 'delete'
  })
}