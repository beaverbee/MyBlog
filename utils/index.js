
/**
 * @param {string} path
 * @returns {Boolean}
 * 判断是否外部外部有效连接
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|http:)/.test(path);
}



