import anime from 'animejs';
import * as React from 'react';
import { Link } from 'remix';
import ExternalLink from '~/components/ExternalLink';
import { EducationalLinks } from '~/constants/external-links';
import ContentMarginsLayout from '~/layouts/ContentMarginsLayout';
import StaticLayout from '~/layouts/StaticLayout';
import ContentCard from '~/library/components/ContentCard';
import Divider from '~/library/components/Divider';
import Row from '~/library/components/Row';
import { H1, H2, P } from '~/library/components/Typography';
import staticStyles from '~/styles/layouts/static.css';
import indexStyles from '~/styles/pages/index.css';
import RocketSvg from '~/svgs/RocketSvg';

// 30 min cache in browser
// 1 day cache in cdn
// 1 year to provide content while validating
export const headers = () => ({
  'cache-control': 'public, max-age=1800, s-maxage=86400, stale-while-revalidate=31536000',
});

export const links = () => [
  { rel: 'stylesheet', href: staticStyles },
  { rel: 'stylesheet', href: indexStyles },
];

export default function Index() {
  React.useEffect(() => {
    // rocket
    anime({
      targets: 'path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'cubicBezier(.5, .05, .1, .3)',
      duration: 500,
      delay(_, i) {
        return i * 150;
      },
    });

    // divider
    anime({
      targets: '.heading-divider',
      width: ['0%', '100%'],
      easing: 'easeOutQuad',
    });
  }, []);
  return (
    <StaticLayout>
      <ContentMarginsLayout>
        <H1 className="main-heading" center>
          freeCodeCamp Dallas
        </H1>
        <H2 center>Learn to code with us</H2>
        <Divider className="heading-divider" />
        <P center style={{ marginBottom: 0 }}>
          freeCodeCamp Dallas is a local community of learners helping one another accomplish
          programming goals. Join us on Discord or Facebook to find out more.
        </P>
        <div className="rocket-wrap">
          <RocketSvg />
        </div>
      </ContentMarginsLayout>
      <ContentMarginsLayout wide>
        <Row justifyContent="center">
          <ContentCard
            title="Learn Code"
            description="The best way to learn to code is with a community of learners. Our members include learners at all levels to include people who 
            know almost nothing working alongside of professional software engineers trying to improve their craft and help others."
          />
          <ContentCard
            title="Try a Meetup"
            description="Our monthly online meet ups are a great way to learn and connect. Our talks are generally led by professional software engineers 
            that are passionate about passing their knowledge along."
          />
          <ContentCard
            title="Join Cohorts"
            description="Level up your skills by building a project with other learners. Mentors are readily available to help guide you as you build your project.
            Cohort teams generally last around 2 months at a time and showcase their projects at a monthly meetup."
          />
        </Row>
      </ContentMarginsLayout>
      <ContentMarginsLayout>
        <Divider style={{ margin: '4rem 0' }} />
        <H2>What is freeCodeCamp Dallas?</H2>
        <P>
          We are the Dallas study group for{' '}
          <ExternalLink href={EducationalLinks.FREECODECAMP}>freeCodeCamp.</ExternalLink>{' '}
          freeCodeCamp is a non profit that offers free, online, interactive coding courses. As a
          study group, we are a community of learners dedicated to helping one another achieve our
          code related goals. Many campers who study in freeCodeCamp Dallas will become professional
          software engineers. This is because the best way to learn to code is with others. Having
          access to others who know how to help you learn what you need is the most effective way to
          "self teach."
        </P>
        <P>
          Our study group is comprised of learners at many levels. Whether you're completely new or
          a seasoned professional who enjoys connecting and helping others, there's a place for you
          in freeCodeCamp Dallas.
        </P>
        <img className="white-board" src="/img/whiteboard.svg" alt="whiteboarding" />
        <H2 style={{ marginTop: '1rem' }}>What we do</H2>
        <P>
          Check out our <Link to="/get-started">get started page</Link> to learn more about how to
          get involved with freeCodeCamp Dallas. Our goal is to provide value to learners at all
          levels. A challenge in finding a good study group is finding one that can help you from
          beginning to end. Many are either geared toward absolute beginners or leave beginners in
          the dust. The goal for our study group is to offer help from the time you begin and
          continue to add value to your journey even after your entry into the world of professional
          software engineering.
        </P>
      </ContentMarginsLayout>
    </StaticLayout>
  );
}
