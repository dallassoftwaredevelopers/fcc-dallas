import * as React from 'react';

interface DashboardViewLayoutProps {
  children: React.ReactElement[];
}

const DashboardViewLayout = ({ children }: DashboardViewLayoutProps) => (
  <div style={{ maxWidth: '875px', margin: 'auto' }}>{children}</div>
);

export default DashboardViewLayout;
