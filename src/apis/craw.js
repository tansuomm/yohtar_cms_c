import fetch from './../utils/fetch';


/**
 * 添加采集信息
 */
export function addCraw(data) {
  return fetch({
    url:  'craw/addCraw',
    method: 'post',
    data
  });
}

/**
 * 查看采集列表
 */
export function crawList(data) {
  return fetch({
    url:  'craw/findCraws',
    method: 'post',
    data
  });
}

/**
 * 采集保存信息
 */
export function crawModify(data) {
  return fetch({
    url:  'craw/modify',
    method: 'post',
    data
  });
}

/**
 * 执行采集操作
 */
export function crawExec(data) {
  return fetch({
    url:  'craw/execCraw',
    method: 'post',
    data
  });
}

/**
 * 删除某一采集
 */
export function crawDelete(data) {
  return fetch({
    url:  'craw/deleteCraw',
    method: 'post',
    data
  });
}
