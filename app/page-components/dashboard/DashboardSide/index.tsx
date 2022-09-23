import { faHome, faTrophy, faAnchor } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { useNavigate } from 'remix';
import { supabaseClient } from '~/db/supabase-client';
import Row from '~/library/components/Row';
import { Role } from '~/utils/auth';
import DashboardSideOption from '../DashboardSideOption';

interface DashboardSideProps {
  userRole: Role;
}

const DashboardSide = ({ userRole }: DashboardSideProps) => {
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
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Row flexDirection="column" style={{ width: '100%' }}>
        <DashboardSideOption to="/dashboard/home" icon={faHome}>
          Home
        </DashboardSideOption>
        <DashboardSideOption to="/dashboard/cohorts" icon={faTrophy}>
          Cohorts
        </DashboardSideOption>
        {/* <DashboardSideOption to="/dashboard/mentors">
          Mentors
        </DashboardSideOption>
        <DashboardSideOption to="/dashboard/project-wall">
          My Projects Wall
        </DashboardSideOption>
        <DashboardSideOption to="/dashboard/mock-interviews">
          Mock Interviews
        </DashboardSideOption> */}
        {userRole === 'ADMIN' && (
          <DashboardSideOption to="/dashboard/admin" icon={faAnchor}>
            Admin
          </DashboardSideOption>
        )}
      </Row>
      <Row flexDirection="column" style={{ width: '100%' }}>
        <DashboardSideOption onClick={logout}>Logout</DashboardSideOption>
      </Row>
    </Row>
  );
};

export default DashboardSide;
