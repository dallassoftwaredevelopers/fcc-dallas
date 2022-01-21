import * as React from 'react';
import { LinksFunction, MetaFunction } from 'remix';
import { H1, H2, P } from '~/library/components/Typography';
import homeStyles from '~/styles/pages/dashboard/home.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: homeStyles }];

export const meta: MetaFunction = () => ({
  title: 'Dashboard Home',
  description: 'freeCodeCamp Dashboard Home',
});

const Home: React.FC = () => (
  <div style={{ maxWidth: '875px', margin: 'auto' }}>
    <H1>Welcome to the freeCodeCamp Dallas Dashboard</H1>
    <H2>We've got big plans for you!</H2>
    <P>
      freeCodeCamp Dallas is here for you throughout your development journey. If you're new, we're
      here to help! If you've been with us a while and need help with more difficult topics, we've
      got many engineers willing to help.
    </P>
    <P>
      Maybe most importantly, when you reach your goals, we hope you'll pay it forward and help us
      grow fcc Dallas. We're a place where you can continue to build your career through networking,
      continued mentorship, and a supportive community.
    </P>
    <img src="/img/dashboard/lighthouse.svg" alt="welcome!" className="home-lighthouse" />
  </div>
);

export default Home;
