/**
 * @param {String} key
 * 读取localStorage
 **/

export const get = (key) => {
  const value = localStorage.getItem(key);
  if (value) {
    return value.indexOf("{") === 0 || value.indexOf("[") === 0
      ? JSON.parse(value)
      : value;
  }
  return null;
};

/**
 * @param {String} key
 * @param {any}  value
 * 写入localStorage
 **/

export const save = (key, value) => {
  const data = typeof value === "object" ? JSON.stringify(value) : value;
  localStorage.setItem(key, data);
};

/**
 * @param {String} key
 * 删除ocalStorage
 **/

export const remove = (key) => {
  localStorage.removeItem(key);
};
