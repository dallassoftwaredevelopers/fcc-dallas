import * as React from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';

const StaticLayout: React.FC = ({ children }) => (
  <>
    <div className="footer-at-bottom">
      <Header />
      <main style={{ margin: '2rem 0' }}>{children}</main>
    </div>
    <Footer />
  </>
);

export default StaticLayout;
