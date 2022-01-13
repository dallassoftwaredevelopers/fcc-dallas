import anime from 'animejs';
import * as React from 'react';
import ContentMarginsLayout from '~/layouts/ContentMarginsLayout';
import StaticLayout from '~/layouts/StaticLayout';
import Divider from '~/library/components/Divider';
import { H1, H2, P } from '~/library/components/Typography';
import RocketSvg from '~/svgs/RocketSvg';
import staticStyles from '~/styles/layouts/static.css';
import indexStyles from '~/styles/pages/index.css';
import ContentCard from '~/library/components/ContentCard';
import Row from '~/library/components/Row';

// 30 min cache in browser
// 1 day cache in cdn
// 1 year to provide content while validating
export const headers = () => ({
  'cache-control':
    'public, max-age=1800, s-maxage=86400, stale-while-revalidate=31536000',
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
          freeCodeCamp Dallas is a local community of learners helping one
          another accomplish programming goals. Join us on Discord or Facebook
          to find out more.
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
    </StaticLayout>
  );
}
