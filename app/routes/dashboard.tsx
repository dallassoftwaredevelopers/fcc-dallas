import * as React from 'react';
import { LinksFunction, LoaderFunction, Outlet, redirect } from 'remix';
import Row from '~/library/components/Row';
import DashboardSide from '~/page-components/dashboard/DashboardSide';
import { isAuthenticated } from '~/utils/auth';
import dashboardStyles from '~/styles/dashboard.css';
import Logo from '~/page-components/dashboard/Logo';
import { H1 } from '~/library/components/Typography';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: dashboardStyles },
];

export const loader: LoaderFunction = async () => {
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    return redirect('/login');
  }
  return null;
};

const Dashboard = () => (
  <Row flexWrap="nowrap">
    <DashboardSide />
    <div className="dashboard-content-wrap">
      <Row justifyContent="space-between" alignItems="center">
        <H1>Page Title</H1>
        <Logo />
      </Row>
      <Outlet />
    </div>
  </Row>
);

export default Dashboard;
