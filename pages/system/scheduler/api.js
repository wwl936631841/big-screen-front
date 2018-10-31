
export function getSchedulerDatas(params){
	return unfetch({
		url:'/platform/scheduler/list',
		method: 'get',
		params
	});
}
export function saveScheduler(params){
	return unfetch({
		url:'/platform/scheduler',
		method: 'post',
		data: params
	});
}
export function getScheduler(params){
	return unfetch({
		url:'/platform/scheduler',
		method: 'get',
		params
	});
}
export function updateScheduler(params){
	return unfetch({
		url:'/platform/scheduler',
		method: 'put',
		params
	});
}
export function deleteScheduler(params){
	return unfetch({
		url:'/platform/scheduler',
		params: params,
		method: 'delete'
	});
}
export function runOnceScheduler(params){
	return unfetch({
		url:'/platform/scheduler/run/once',
		method: 'post',
		data: params
	});
}
export function pauseScheduler(params){
	return unfetch({
		url:'/platform/scheduler/pause',
		method: 'put',
		params
	});
}

export function resumeScheduler(params){
	return unfetch({
		url:'/platform/scheduler/resume',
		method: 'put',
		params
	});
}

