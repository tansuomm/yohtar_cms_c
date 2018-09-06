import fetch from './../utils/fetch';
// 引入公共常量

/**
 * 用户登录
 */

export function login(data) {
  return fetch({
    url:  'admin/login',
    method: 'post',
    data
  });
}
/**
 * 用户密码
 */
export function modify(data) {
  return fetch({
    url:  'admin/modifyPwd',
    method: 'post',
    data
  });
}

/**
 * 查看常量信息
 */
export function common(data) {
  return fetch({
    url:  'admin/common',
    method: 'post',
    data
  });
}
