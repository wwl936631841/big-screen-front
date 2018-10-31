

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