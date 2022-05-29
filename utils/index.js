import { marked } from "marked";
import xss from "xss";
import hljs from "highlight.js";


/**
 * @param {string} path
 * @returns {Boolean}
 * 判断是否外部外部有效连接
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|http:)/.test(path);
}

/**
 * 对数组进行分组
 * @param {Array} arr - 分组对象
 * @param {Function} f
 * @returns 数组分组后的新数组,并且按时间顺序排列
 */
export const groupBy = (arr, f) => {
  const groups = {};
  arr.forEach((item) => {
    const group = JSON.stringify(f(item));
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  const res = Object.keys(groups).map((group) => groups[group]);
  res.sort((a, b) => {
    if (b[0].time >= a[0].time) {
      return 1;
    } else {
      return -1;
    }
  });
  for (const year of res) {
    year.sort((a, b) => {
      if (b.time > a.time) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  return res;
};

/**
 * 用于对列表数据进行解析
 * 将传参转换为对象
 * @param any
 * @returns {Object}
 */
export function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const translateMarkdown = (plainText, isGuardXss = false) => {
  return marked(isGuardXss ? xss(plainText) : plainText, {
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: function (code) {
      /*eslint no-undef: "off"*/
      return hljs.highlightAuto(code).value;
    },
  });
};

