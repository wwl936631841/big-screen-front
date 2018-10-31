// 选项卡
export function getTabDatas(params){
	return unfetch({
		url:'/tab/list',
		method: 'get',
		params
	});
}
export function validTab(params) {
	return unfetch({
	  url: '/tab/valid',
	  method: 'get',
	  params
	})
  }

export function saveTab(params){
	return unfetch({
		url:'/tab',
		method: 'post',
		data: params
	});
}
export function updateTab(params){
	return unfetch({
		url:'/tab',
		method: 'put',
		params
	});
}
export function deleteTab(params){
	return unfetch({
		url:'/tab',
		params: params,
		method: 'delete'
	});
}


// 选项卡菜单
export function getTabMenuDatas(params){
	return unfetch({
		url:'/tab/menus',
		method: 'get',
		params
	});
}
export function saveTabMenu(params){
	return unfetch({
		url:'/tab/menu',
		method: 'post',
		data: params
	});
}
export function updateTabMenu(params){
	return unfetch({
		url:'/tab/menu',
		method: 'put',
		params
	});
}
export function deleteTabMenu(params){
	return unfetch({
		url:'/tab/menu',
		params: params,
		method: 'delete'
	});
}

export function validTabMenuSort(params) {
	return unfetch({
	  url: '/tab/menu/valid/sort',
	  method: 'get',
	  params
	})
}