import * as React from 'react';
import { Link } from 'remix';
import Row from '~/library/components/Row';
import { P } from '~/library/components/Typography';

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <footer className="footer">
      <Row justifyContent="center">
        <Link to="/useful-links" prefetch="intent">
          Useful Links
        </Link>
      </Row>
      <Row justifyContent="center">
        <P>Copyright © {year} freeCodeCamp Dallas</P>
      </Row>
    </footer>
  );
}

export default Footer;
