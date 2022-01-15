import * as React from 'react';
import { useNavigate } from 'remix';
import { supabaseClient } from '~/db/supabase-client';
import Row from '~/library/components/Row';
import DashboardSideOption from '../DashboardSideOption';

const DashboardSide = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await supabaseClient?.auth?.signOut();
    await fetch('/api/logout', {
      method: 'POST',
    });
    navigate('/login');
  };

  return (
    <Row
      flexDirection="column"
      justifyContent="space-between"
      style={{
        minHeight: '100vh',
        width: '300px',
        padding: '1rem',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)s',
      }}
    >
      <Row flexDirection="column" style={{ width: '100%' }}>
        <DashboardSideOption to="/dashboard/overview">
          Overview
        </DashboardSideOption>
        <DashboardSideOption to="/dashboard/mentors">
          Mentors
        </DashboardSideOption>
        <DashboardSideOption to="/dashboard/project-wall">
          My Projects Wall
        </DashboardSideOption>
        <DashboardSideOption to="/dashboard/cohorts">
          Cohorts
        </DashboardSideOption>
        <DashboardSideOption to="/dashboard/mock-interviews">
          Mock Interviews
        </DashboardSideOption>
      </Row>
      <Row flexDirection="column" style={{ width: '100%' }}>
        <DashboardSideOption onClick={logout}>Logout</DashboardSideOption>
      </Row>
    </Row>
  );
};

export default DashboardSide;
