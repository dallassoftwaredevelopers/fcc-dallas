import * as React from 'react';
import { Link } from 'remix';
import { match } from 'ts-pattern';
import { H1, P } from '~/library/components/Typography';

interface ErrorProps {
  type: '401' | '404' | '500s';
}

const Error: React.FC<ErrorProps> = ({ type }) => (
  <>
    <H1 center style={{ margin: '2rem' }}>
      {match(type)
        .with('404', () => 'Page Not Found')
        .with('401', () => 'Not Authorized')
        .otherwise(() => 'Unexpected Error')}
    </H1>
    <Link prefetch="intent" to="/">
      <P center style={{ marginBottom: '2rem' }}>
        Go to Home Page
      </P>
    </Link>
    <img
      alt="error-img"
      style={{ margin: '2rem auto', display: 'block', maxWidth: '100%' }}
      src={match(type)
        .with('404', () => '/img/errors/404.svg')
        .with('401', () => '/img/errors/401.svg')
        .otherwise(() => '/img/errors/500s.svg')}
    />
  </>
);

type Error404Props = Omit<ErrorProps, 'type'>;
const Error404: React.FC<Error404Props> = (props: Error404Props) => (
  <Error {...props} type="404" />
);
type Error401Props = Omit<ErrorProps, 'type'>;
const Error401: React.FC<Error401Props> = (props: Error401Props) => (
  <Error {...props} type="401" />
);

type Error500sProps = Omit<ErrorProps, 'type'>;
const Error500s: React.FC<Error500sProps> = (props: Error500sProps) => (
  <Error {...props} type="500s" />
);

export { Error404, Error401, Error500s };
