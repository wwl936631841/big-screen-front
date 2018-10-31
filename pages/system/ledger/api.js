// 选项卡
export function getLedgerDatas(params){
	return unfetch({
		url:'/ledger/list',
		method: 'get',
		params
	});
}
export function validLedger(params) {
	return unfetch({
	  url: '/ledger/valid',
	  method: 'get',
	  params
	})
  }

export function saveLedger(params){
	return unfetch({
		url:'/ledger',
		method: 'post',
		data: params
	});
}
export function updateLedger(params){
	return unfetch({
		url:'/ledger',
		method: 'put',
		params
	});
}
export function deleteLedger(params){
	return unfetch({
		url:'/ledger',
		params: params,
		method: 'delete'
	});
}


// 动态台账菜单
export function getLedgerMenuDatas(params){
	return unfetch({
		url:'/ledger/menus',
		method: 'get',
		params
	});
}
export function saveLedgerMenu(params){
	return unfetch({
		url:'/ledger/menu',
		method: 'post',
		data: params
	});
}
export function updateLedgerMenu(params){
	return unfetch({
		url:'/ledger/menu',
		method: 'put',
		params
	});
}
export function deleteLedgerMenu(params){
	return unfetch({
		url:'/ledger/menu',
		params: params,
		method: 'delete'
	});
}
export function deleteParentMenu(params){
	return unfetch({
		url:'/ledger/parentMenu',
		params: params,
		method: 'delete'
	});
}

export function validLedgerMenuSort(params) {
	return unfetch({
	  url: '/ledger/menu/valid/sort',
	  method: 'get',
	  params
	})
}


//查询父级菜单下拉列表
export function getParentsMenu(params){
	return unfetch({
		url:'/ledger/parent/menus',
		method: 'get',
		params
	});
}
