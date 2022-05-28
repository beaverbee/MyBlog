import { marked } from "marked";
import xss from "xss";
import hljs from 'highlight.js'

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
 * @returns 数组分组后的新数组
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


export function getAnchorList(str) {
  const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g; //正则匹配 h1-h6 作为锚点标题
  const list = [];
  function pushItem(arr, item) {
    const len = arr.length;
    const matchItem = arr[len - 1];
    if (matchItem && matchItem.tag !== item.tag) {
      pushItem(matchItem.children, item);
    } else {
      arr.push(item);
      // debugger
    }
  }
  let newStr = str.replace(pattern, ($0, $1) => {
    const endIndex = $0.indexOf("</");
    const startIndex = $0
      .substring(0, endIndex === -1 ? undefined : endIndex)
      .lastIndexOf(">");
    const title = `${$0.substring(
      startIndex + 1,
      endIndex === -1 ? undefined : endIndex
    )}`;
    const href = `#${title}`;
    const currentItem = {
      tag: $1, // 标签类型
      title,
      href,
      children: [],
    };
    pushItem(list, currentItem);
    return `<${$1 + " id='" + title + "'" + $0.substring(3)}`;
  });
  return [list, newStr];
}