
export function getDocumentRoleDatas(params){
	return unfetch({
		url:'/document/role/list',
		method: 'get',
		params
	});
}
export function saveDocumentRole(params){
	return unfetch({
		url:'/document/role',
		method: 'post',
		data: params
	});
}
export function getDocumentRole(params){
	return unfetch({
		url:'/document/role',
		method: 'get',
		params
	});
}
export function updateDocumentRole(params){
	return unfetch({
		url:'/document/role',
		method: 'put',
		params
	});
}
export function deleteDocumentRole(params){
	return unfetch({
		url:'/document/role',
		params: params,
		method: 'delete'
	});
}


// 查询文件夹树形数据
export function getFolderTreeList(params){
	return unfetch({
		url:'/document/role/document/folder/relation',
		method: 'get',
		params
	});
}
// 批量修改角色文件夹关联数据
export function batchUpdateRoleDocument(params){
	return unfetch({
		url:'/document/role/document/batch/update',
		method: 'post',
		data: params
	});
}
// 批量修改角色人员关联数据
export function batchUpdateRoleUser(params){
	return unfetch({
		url:'/role/user/batch/update',
		method: 'post',
		data: params
	});
}
// 根据角色ID查询拥有该角色的人员
export function getUsersByRoleId(params){
	return unfetch({
		url:'/role/user/get/user/by/role',
		method: 'get',
		params
	});
}


// 查询角色拥有的操作权限数据
export function getOperateList(params){
	return unfetch({
		url:'/role/operate/get/operate/by/role',
		method: 'get',
		params
	});
}



