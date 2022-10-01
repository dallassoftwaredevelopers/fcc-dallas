import { json, LinksFunction, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import React from 'react';
import DataTable from 'react-data-table-component';
import staticStyles from '~/styles/layouts/static.css';
import { H2, P } from '~/library/components/Typography';
import { getRole } from '~/utils/auth';
import { supabase } from '~/db/supabase.server';
import { RosterExpanded } from '~/page-components/dashboard/RosterExpanded';
import { CohortSignUpForm } from '~/routes/cohort-signup';

export interface ApplicantResponse {
  id: number;
  created_at: Date;
  first_name: string;
  last_name: string;
  preferred_stack: string;
  role: CohortSignUpForm['role'];
  leader: boolean;
  previously_participated: boolean;
  rejected: boolean;
  admin_action_by?: string;
  cohort_fk: string;
  user_fk?: any;
  email: string;
  tier: number;
  discord_username: string;
  how_heard_about: string;
  when_available: string;
  would_like_to_improve: string;
  way_to_contact: string;
}
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: staticStyles }];

export const meta: MetaFunction = () => ({
  title: 'Add User',
  description: 'Add a new user to fCC Dallas',
});

export const loader: LoaderFunction = async ({ request }) => {
  const role = await getRole(request);
  if (role !== 'ADMIN') {
    throw json(
      {
        message: 'Unauthorized',
      },
      401
    );
  }

  const futureCohorts = await supabase
    .from('cohort')
    .select('name, id, start_date')
    .gt('start_date', new Date().toISOString())
    .limit(1);
  if (!futureCohorts.body || !futureCohorts.body.length || !futureCohorts.body[0].name) {
    console.warn('No new cohorts found');
    throw json(
      {
        type: 'error',
        error: 'Unable to find future Cohort',
      },
      400
    );
  }
  const mostRecentCohortId = futureCohorts.body[0].id;
  const applicants = await supabase
    .from('cohort_application')
    .select()
    .eq('cohort_fk', mostRecentCohortId);
  return {
    type: 'success',
    applicants,
  };
};

function CohortRoster() {
  const loaderData = useLoaderData();
  React.useMemo(() => {
    console.table(loaderData.applicants.data);
  }, [loaderData]);

  return (
    <div style={{ margin: '1rem 0' }}>
      <H2>Cohort Rosters</H2>
      <P>View Cohort roster information. Select a Cohort to view its registered participants</P>
      <DataTable
        columns={[
          {
            name: 'First',
            selector: (row: ApplicantResponse) => row.first_name,
          },
          {
            name: 'Last',
            selector: (row: ApplicantResponse) => row.last_name,
          },
          {
            name: 'Discord Username',
            selector: (row: ApplicantResponse) => row.discord_username,
          },
        ]}
        data={loaderData.applicants.data}
        expandableRows
        expandableRowsComponent={RosterExpanded}
      />
    </div>
  );
}

export default CohortRoster;
