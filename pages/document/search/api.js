
export function searchAttachment(params){
	return unfetch({
		url:'/document/tree/search/permission/pagination',
		method: 'get',
		params
	});
}

// 文件预览
export function FileView(FILE_ID) {
	return unfetch({
		//url: '/file/view',
		url: '/fileWithftp/view',
		params: FILE_ID
	});
}