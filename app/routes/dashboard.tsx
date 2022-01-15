import * as React from 'react';
import { LinksFunction, LoaderFunction, Outlet, redirect } from 'remix';
import Row from '~/library/components/Row';
import { H2 } from '~/library/components/Typography';
import DashboardSide from '~/page-components/dashboard/DashboardSide';
import dashboardStyles from '~/styles/dashboard.css';
import { isAuthenticated } from '~/utils/auth';

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
      <Row
        justifyContent="flex-end"
        alignItems="center"
        style={{
          borderBottom: '2px dashed var(--primary)',
          padding: '2rem',
          marginBottom: '1rem',
        }}
      >
        <H2 noMargin style={{ color: 'var(--primary)' }}>
          freeCodeCamp Dallas
        </H2>
      </Row>
      <Outlet />
    </div>
  </Row>
);

export default Dashboard;
