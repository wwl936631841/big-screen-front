// 查询选项值
export function selectOptionByFileType(params) {
	return unfetch({
		url: '/file/type/data/select/by/file/type',
		method: 'get',
		params
	});
}

// 查询指定大类的文件列表
export function selectByFileType(params) {
	return unfetch({
		//url:'/file/select/by/file/type',
		url: '/fileWithftp/select/by/file/type',
		method: 'get',
		params
	});
}

// 删除文件
export function FileDelete(params) {
	//return unfetch.delete('/file', {
	return unfetch({
		url: '/fileWithftp',
		method: 'delete',
		params: params
	});
}

// 文件预览
export function FileView(params) {
	return unfetch({
		//url: '/file/view',
		url: '/fileWithftp/view',
		params
	});
}

// 文件上传
export function FileUpload(params) {
	return unfetch({
		url: '/fileWithftp/upload',
		method: 'post',
		params
	});
}

// 文件上传成功后调用
export function FileAdd(fileInfo) {
	return unfetch({
		//url: '/file',
		url: '/fileWithftp',
		method: 'post',
		data: {
			files: JSON.stringify(fileInfo)
		}
	});
}

