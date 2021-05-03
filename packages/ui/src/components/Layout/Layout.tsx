import * as React from "react";
import "./reset.css";
import "./Layout.css";
import { Logo } from "../";

const menu = [
  {
    to: "/post",
    title: "post",
    description: "post a public message to jwije.com",
  },
  {
    to: "/drop",
    title: "drop",
    description: "drop me a message or a file securely",
  },
  {
    to: "/info",
    title: "info",
  },
];

export const Layout = (props) => {
  return (
    <div>
      <header>
        <Logo />
        <ul className="menu">
          {menu.map((item, i) => (
            <li key={`menu-${i}`}>
              <div className="menu-line">
                <a href={item.to}>{item.title}</a>
                {item.description && <span>{item.description}</span>}
              </div>
            </li>
          ))}
        </ul>
      </header>
      <article>{props.children}</article>
      <footer>
        <span>Copyright © Jason Wijegooneratne {new Date().toISOString()}</span>
      </footer>
    </div>
  );
};
