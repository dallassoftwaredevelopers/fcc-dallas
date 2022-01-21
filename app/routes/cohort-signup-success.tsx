import * as React from 'react';
import { LinksFunction } from 'remix';
import ExternalLink from '~/components/ExternalLink';
import { SocialMediaLinks } from '~/constants/external-links';
import StaticContentLayout from '~/layouts/StaticContentLayout';
import Divider from '~/library/components/Divider';
import { H1, P } from '~/library/components/Typography';
import staticStyles from '~/styles/layouts/static.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: staticStyles }];

const CohortSignUpSuccess = () => (
  <StaticContentLayout>
    <H1 center>Application Received!</H1>
    <Divider />
    <P center>Thank you for Applying to fCC Dallas Cohorts. Expect an email from us soon!</P>
    <P center>
      Go ahead and join us on <ExternalLink href={SocialMediaLinks.DISCORD}>Discord</ExternalLink>.
      You'll need to be active there to get Cohort updates and to communicate with your team once
      the Cohort starts
    </P>
  </StaticContentLayout>
);

export default CohortSignUpSuccess;
