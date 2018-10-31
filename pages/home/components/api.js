export function selectNoticeList(params) {
  return unfetch({
    url: '/platform/portal/notices',
    params: params
  });
}

export function taskProportionStatistics(params) {
  return unfetch({
    url: '/platform/portal/taskproportion',
    params: params
  });
}
export function taskCompletionStatistics(params) {
  return unfetch({
    url: '/platform/portal/taskcompletion',
    params: params
  });
}
export function warningStatistics(params) {
  return unfetch({
    url: '/platform/portal/warning',
    params: params
  });
}

export function taskTimeStatistics(params) {
  return unfetch({
    url: '/platform/portal/tasktime',
    params: params
  });
}
export function selectTaskTodes(params) {
  return unfetch({
    url: '/platform/portal/tasktodo',
    params: params
  });
}