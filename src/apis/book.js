import fetch from './../utils/fetch';
// 引入公共常量

/**
 * 查看当天情书
 */

export function bookInfo(data) {
  return fetch({
    url:  'book/findBook',
    method: 'post',
    data
  });
}
/**
 * 修改当天情书
 */
export function addBook(data) {
  return fetch({
    url:  'book/addBook',
    method: 'post',
    data
  });
}
