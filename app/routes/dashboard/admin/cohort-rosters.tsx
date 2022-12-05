import { json, LinksFunction, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import React from 'react';
import DataTable from 'react-data-table-component';
import { match } from 'ts-pattern';
import staticStyles from '~/styles/layouts/static.css';
import { H2, H3, P } from '~/library/components/Typography';
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
  user_fk?: string;
  email: string;
  tier: number;
  discord_username: string;
  how_heard_about: string;
  when_available: string;
  would_like_to_improve: string;
  way_to_contact: string;
}

interface LoaderSuccessResponse {
  type: 'success';
  applicants: {
    data: ApplicantResponse[];
  };
}

interface LoaderFailureResponse {
  type: 'error';
  message: string;
}

type LoaderData = LoaderSuccessResponse | LoaderFailureResponse;

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
    return {
      type: 'error',
      message: 'Unable to find future Cohort',
    };
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
  const loaderData = useLoaderData<LoaderData>();
  return (
    <div style={{ margin: '1rem 0' }}>
      <H2>Cohort Rosters</H2>
      <P>View Cohort roster information. Select a Cohort to view its registered participants</P>
      {match(loaderData)
        .with({ type: 'error' }, ({ message }) => (
          <>
            <H3>Unable to find Cohort Roster</H3>
            <P italic>{message}</P>
          </>
        ))
        .with({ type: 'success' }, ({ applicants }) => (
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
            data={applicants.data}
            expandableRows
            expandableRowsComponent={RosterExpanded}
          />
        ))
        .exhaustive()}
    </div>
  );
}

export default CohortRoster;
