import {
  HeadersFunction,
  json,
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  Outlet,
} from 'remix';
import DashboardViewLayout from '~/layouts/DashboardViewLayout';
import { Badge } from '~/library/components/Badge';
import Divider from '~/library/components/Divider';
import { H1, P } from '~/library/components/Typography';
import staticStyles from '~/styles/layouts/static.css';
import { getRole } from '~/utils/auth';

export const headers: HeadersFunction = () => ({
  'cache-control': 'public, max-age=1800, s-maxage=86400, stale-while-revalidate=31536000',
});

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: staticStyles }];

export const meta: MetaFunction = () => ({
  title: 'Admin',
  description: 'Administrative functions for fCC Dallas',
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
  return null;
};

function Admin() {
  return (
    <DashboardViewLayout>
      <H1>Admin</H1>
      <P>
        Perform administrative functions here. If you are here, it means you have administrative
        privileges. Please use your super powers responsibly.
      </P>
      <P>
        If you think you have access to this by mistake or no longer wish to be an admin, please let
        us know!
      </P>
      <P>Click a badge below to select an admin function</P>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/dashboard/admin/add-user" prefetch="intent">
          <Badge variant="info">Add User</Badge>
        </Link>
        <Link to="/dashboard/admin/create-cohort" prefetch="intent">
          <Badge variant="success">Add Cohort</Badge>
        </Link>
        <Link to="/dashboard/admin/cohort-rosters" prefetch="intent">
          <Badge variant="warn">Cohort Rosters</Badge>
        </Link>
      </div>
      <Divider />
      <Outlet />
    </DashboardViewLayout>
  );
}

export default Admin;
