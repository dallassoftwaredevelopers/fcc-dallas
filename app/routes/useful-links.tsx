import * as React from 'react';
import { LinksFunction } from 'remix';
import ExternalLink from '~/components/ExternalLink';
import { EducationalLinks, SocialMediaLinks } from '~/constants/external-links';
import StaticContentLayout from '~/layouts/StaticContentLayout';
import Divider from '~/library/components/Divider';
import Row from '~/library/components/Row';
import { H2 } from '~/library/components/Typography';
import staticStyles from '~/styles/layouts/static.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: staticStyles },
];

const Heading: React.FC = ({ children }) => (
  <H2 bold style={{ marginTop: '2rem' }}>
    {children}
  </H2>
);

function UsefulLinks() {
  return (
    <StaticContentLayout title="Useful Links" showConnectWith>
      <Row flexDirection="column">
        <Heading>Social</Heading>
        <ExternalLink href={SocialMediaLinks.DISCORD}>Discord</ExternalLink>
        <ExternalLink href={SocialMediaLinks.FACEBOOK}>Facebook</ExternalLink>
        <ExternalLink href={SocialMediaLinks.LINKED_IN}>LinkedIn</ExternalLink>
        <ExternalLink href={SocialMediaLinks.MEET_UP}>Meetup.com</ExternalLink>
        <ExternalLink href={SocialMediaLinks.YOUTUBE}>
          freeCodeCamp Dallas YouTube
        </ExternalLink>
        <Divider />
        <Heading>Educational</Heading>
        <ExternalLink href={EducationalLinks.FREECODECAMP}>
          Official freeCodeCamp Site
        </ExternalLink>
        <ExternalLink href={EducationalLinks.W3_SCHOOLS}>
          W3 Schools
        </ExternalLink>
        <ExternalLink href={EducationalLinks.MDN}>MDN Web Docs</ExternalLink>
      </Row>
    </StaticContentLayout>
  );
}

export default UsefulLinks;
