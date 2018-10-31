
//统计分析饼图（外圈）
export function getStatisticalPie(params){
	return unfetch({
		url:'/document/tree/get/statistical/pie',
		method: 'get',
		params
	});
}
//统计分析类型饼图（内圈）
export function getStatisticalPieType(params){
	return unfetch({
		url:'/document/tree/get/statistical/pie/type',
		method: 'get',
		params
	});
}
//统计分析树状图
export function getStatisticalBar(params){
	return unfetch({
		url:'/document/tree/get/statistical/bar',
		method: 'get',
		params
	});
}
//统计分析树状图
export function getStatisticalBar2(params){
	return unfetch({
		url:'/document/tree/get/statistical/bar2',
		method: 'get',
		params
	});
}



