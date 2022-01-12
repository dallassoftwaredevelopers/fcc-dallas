import * as React from "react";
import { Link } from "remix";
import HamburgerMenu from "../HamburgerMenu";

const Links = () => (
  <ul className="header-links">
    <li>
      <Link to="/" prefetch="intent">
        home
      </Link>
    </li>
    <li>
      <Link to="/get-started" prefetch="intent">
        get started
      </Link>
    </li>
    <li>
      <Link to="/blog" prefetch="intent">
        blog
      </Link>
    </li>
    <li>
      <Link to="/cohorts" prefetch="intent">
        cohorts
      </Link>
    </li>
  </ul>
);

const Header = () => {
  return (
    <header className="header-wrap">
      <Link to="/" prefetch="intent">
        <img className="header-logo" src="/img/fcc-logo.png" alt="fcc logo" />
      </Link>
      <HamburgerMenu>
        <Links />
      </HamburgerMenu>
      <div className="desktop-only">
        <Links />
      </div>
    </header>
  );
};

export default Header;
