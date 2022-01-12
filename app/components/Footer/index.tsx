import * as React from "react";
import { Link } from "remix";
import Row from "~/library/components/Row";
import { P } from "~/library/components/Typography";

const Footer = () => (
  <footer className="footer">
    <Row justifyContent="center">
      <Link to="/about-us" prefetch="intent">
        About Us
      </Link>
      <Link to="/useful-links" prefetch="intent">
        Useful Links
      </Link>
    </Row>
    <Row justifyContent="center">
      <P>Copyright © 2022 freeCodeCamp Dallas</P>
    </Row>
  </footer>
);

export default Footer;
