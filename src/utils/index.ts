/**
 * 存储数据
 *
 * @param name
 * @param data
 */
export function setLocalData(name: string, data: any) {
  localStorage.setItem(name, JSON.stringify(data));
}

/**
 * 获取数据
 *
 * @param name
 */
export function getLocalData(name: string) {
  return JSON.parse(localStorage.getItem(name)!);
}

/**
 * 比较函数
 *
 * @param prop 排序属性
 * @param type asc-升序 desc-降序
 */
export function compare(prop: string, type = "asc") {
  return function (m: any, n: any) {
    const a = m[prop];
    const b = n[prop];
    return type === "desc" ? b - a : a - b;
  };
}

/**
 * 判断新增对象是否已存在
 *
 * @param list 当前数组
 * @param item 新增对象
 */
export function isExist(list: Array<any>, item: any) {
  return list.some((v) => v.name === item.name);
}
