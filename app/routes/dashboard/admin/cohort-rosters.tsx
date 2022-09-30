import { json, LinksFunction, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import React from 'react';
import staticStyles from '~/styles/layouts/static.css';
import { H2, P } from '~/library/components/Typography';
import { getRole } from '~/utils/auth';
import { supabase } from '~/db/supabase.server';

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
    </div>
  );
}

export default CohortRoster;
