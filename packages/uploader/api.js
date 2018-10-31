export function getTreeDocuments(reqParams) {
  return unfetch({
    url: '/document/tree/documents',
    params: reqParams
  }).then((data = {}) => {
    const userName = nenv.raw.store.state.user.profile.userName
    data.data.list = data.data.list || []
    data.data.list.map(file => {
      file.permission = {
        rename: ['0', '3'].indexOf(file.FILE_STATUS) > -1 || file.IS_DIRECTORY === 'YES',
        download: true,
        delete: ['0', '3'].indexOf(file.FILE_STATUS) > -1 || file.IS_DIRECTORY === 'YES',
        move: ['0', '3'].indexOf(file.FILE_STATUS) > -1 && file.IS_DIRECTORY === 'NO',
        deliver: file.CREATE_USER === userName && file.IS_DIRECTORY === 'NO' && ['0','3'].indexOf(file.FILE_STATUS) > -1,
        review: file.IS_DIRECTORY === 'NO' && file.FILE_STATUS === '1' && file.RECIPIENT
      }
      file.isShowPopover = false
      return file
    })
    return Promise.resolve(data)
  })
}

// 文件重命名
export function FileRename(fileInfo) {
  return unfetch.put('/file/rename', fileInfo);
}
// 移动文件夹
export function moveFolder(reqParams) {
  return unfetch.put('/document/tree/move/directory', reqParams);
}

export function FileDelete(fileId) {
  return unfetch.delete('/fileWithftp', {
    params: {
      ID: fileId,
      isForceDelFile:true
    }
  });
}

//文件夹列表
export function getFolderList(){
  return unfetch({
    url: '/document/tree/folder'
  })
}

export function FileAdd(fileInfo) {
  return unfetch({
    url: '/file',
    method: 'post',
    data: {
      files: JSON.stringify(fileInfo)
    }
  });
}

export function FileDownload(fileId) {
  return unfetch.get('/file/download/compress', {
    params: {
      ID: fileId
    }
  })
}

// 新建文件夹
export function FileCreatedNewFolder(reqParams) {
  return unfetch.post('/document/tree/directory', reqParams)
}

// 文件夹重命名
export function FileRenameFolder(reqParams) {
  return unfetch.post('/document/tree/rename', reqParams)
}

// 删除文件夹
export function FileDeleteFolder(fileId) {
  return unfetch.delete('/document/tree/directory', {
    params: {
      ID: fileId
    }
  })
}

// 批量删除文件或者文件夹
export function deleteDirAndFiles(ids) {
  return unfetch.delete('/document/tree/batDelete', {
    params: {
      IDS: ids
    }
  });
}

// 文件预览
export function FileView(FILE_ID) {
  return unfetch({
    url: '/fileWithftp/view',
    params: FILE_ID
  });
}


// 查询当前登陆人拥有的操作权限数据
export function getOperatePermission(params){
	return unfetch({
		url:'/role/operate/get/operate/by/user',
		method: 'get',
		params
	});
}
//批量移交文档
export function batchSaveFileArchive(params) {
  return unfetch({
    url: '/file/archive/addBatch',
    method: 'post',
    data: params
  });
}
//单个移交文档
export function saveFileArchive(params) {
  return unfetch({
    url: '/file/archive/insert',
    method: 'post',
    data: params
  });
}
//审核文档
export function adoptSave(params) {
  return unfetch({
    url: '/file/archive/adopt/add',
    method: 'post',
    data: params
  });
}
//审核记录
export function getAdoptList(params){
	return unfetch({
		url:'/file/archive/adopt/list',
		method: 'get',
		params
	});
}
