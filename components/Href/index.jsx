import { isExternal } from "../../utils";

export default function Href({ children, href, ...params }) {
  let url = href;
  if(!isExternal(url)){
      url=`http://${url}`
  }
  return <a target='_blank' rel="noreferrer noopener" {...params}>
      {children}
  </a>
}
