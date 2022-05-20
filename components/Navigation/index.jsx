import { Anchor } from "antd";
const { Link } = Anchor;



export default function Navigation({ list }) { 
  function renderLink({ href, title, children }) {
    return (
      <Link key={href} href={href} title={title}>
        {children.length > 0 && children.map((sub) => renderLink(sub))}
      </Link>
    );
  }
  return <Anchor offsetTop={60}>{list.map(renderLink)}</Anchor>;
}
