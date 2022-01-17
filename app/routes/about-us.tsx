import { HeadersFunction, Link, LinksFunction, MetaFunction } from 'remix';
import ExternalLink from '~/components/ExternalLink';
import { EducationalLinks } from '~/constants/external-links';
import ContentMarginsLayout from '~/layouts/ContentMarginsLayout';
import StaticContentLayout from '~/layouts/StaticContentLayout';
import { H3, P } from '~/library/components/Typography';
import staticStyles from '~/styles/layouts/static.css';
import aboutUsStyles from '~/styles/pages/about-us.css';

export const headers: HeadersFunction = () => ({
  'cache-control':
    'public, max-age=1800, s-maxage=86400, stale-while-revalidate=31536000',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: staticStyles },
  { rel: 'stylesheet', href: aboutUsStyles },
];

export const meta: MetaFunction = () => ({
  title: 'About us',
  description: 'Learn about freeCodeCamp Dallas',
});

function AboutUs() {
  return (
    <StaticContentLayout title="About Us" wide showConnectWith>
      <ContentMarginsLayout>
        <H3>What is freeCodeCamp Dallas?</H3>
        <P>
          We are the Dallas study group for{' '}
          <ExternalLink href={EducationalLinks.FREECODECAMP}>
            freeCodeCamp.
          </ExternalLink>{' '}
          freeCodeCamp is a non profit that offers free, online, interactive
          coding courses. As a study group, we are a community of learners
          dedicated to helping one another achieve our code related goals. Many
          campers who study in freeCodeCamp Dallas will become professional
          software engineers. This is because the best way to learn to code is
          with others. Having access to others who know how to help you learn
          what you need is the most effective way to "self teach."
        </P>
        <P>
          Our study group is comprised of learners at many levels. Whether
          you're completely new or a seasoned professional who enjoys connecting
          and helping others, there's a place for you in freeCodeCamp Dallas.
        </P>
        <img
          className="white-board"
          src="/img/whiteboard.svg"
          alt="whiteboarding"
        />
        <H3 style={{ marginTop: '1rem' }}>What we do</H3>
        <P>
          Check out our <Link to="/get-started">get started page</Link> to learn
          more about how to get involved with freeCodeCamp Dallas. Our goal is
          to provide value to learners at all levels. A challenge in finding a
          good study group is finding one that can help you from beginning to
          end. Many are either geared toward absolute beginners or leave
          beginners in the dust. The goal for our study group is to offer help
          from the time you begin and continue to add value to your journey even
          after your entry into the world of professional software engineering.
        </P>
      </ContentMarginsLayout>
    </StaticContentLayout>
  );
}

export default AboutUs;
