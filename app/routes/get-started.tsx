import { HeadersFunction, Link, LinksFunction, MetaFunction } from 'remix';
import ExternalLink from '~/components/ExternalLink';
import { EducationalLinks, Repos, SocialMediaLinks } from '~/constants/external-links';
import ContentMarginsLayout from '~/layouts/ContentMarginsLayout';
import StaticContentLayout from '~/layouts/StaticContentLayout';
import Divider from '~/library/components/Divider';
import { P } from '~/library/components/Typography';
import Activity from '~/page-components/get-started/Activity';
import staticStyles from '~/styles/layouts/static.css';
import getStartedStyles from '~/styles/pages/get-started.css';

export const headers: HeadersFunction = () => ({
  'cache-control': 'public, max-age=1800, s-maxage=86400, stale-while-revalidate=31536000',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: staticStyles },
  { rel: 'stylesheet', href: getStartedStyles },
];

export const meta: MetaFunction = () => ({
  title: 'Get Started',
  description: 'Learn how to get started with freeCodeCamp Dallas',
});

function GetStarted() {
  return (
    <StaticContentLayout title="Get Started" showConnectWith wide>
      <ContentMarginsLayout>
        <Activity name="Learn to Code" img="/img/learning_1.svg">
          <P>
            To get started learning to code, we suggest starting with the{' '}
            <ExternalLink href={EducationalLinks.FREECODECAMP}>freeCodeCamp website</ExternalLink>{' '}
            and working through their interactive curriculum. When you're ready, join us on{' '}
            <ExternalLink href={SocialMediaLinks.DISCORD}>Discord.</ExternalLink>
          </P>
          <P>
            When you first start learning to code, remember to be patient and don't be afraid to
            reach out for help. There will be times you feel overwhelmed and it's important to
            remember that it's normal to feel this way. Connecting with fellow learners can help you
            break down barriers.
          </P>
        </Activity>
        <Divider />
        <Activity name="Attend a Meetup" img="/img/meetup.svg" isLeft>
          <P>
            To attend a meetup, sign up to our next event on{' '}
            <ExternalLink href={SocialMediaLinks.MEET_UP}>Meetup.</ExternalLink> Meetups are a great
            way to learn something new. We generally give updates about programs in freeCodeCamp
            Dallas and have a speaker each event who will give a lesson on a code related topic.
          </P>
          <P>
            In the future, we intend to introduce workshops. These workshops will be targeted for
            different skill levels and will be a great way to push yourself in a workshop targeted
            for learners at your level.
          </P>
        </Activity>
        <Divider />
        <Activity name="Get and Give Feedback" img="/img/feedback.svg">
          <P>
            Both getting and giving feedback are an important part of the learning process. To start
            getting feedback on your work, join us on{' '}
            <ExternalLink href={SocialMediaLinks.DISCORD}>Discord</ExternalLink> or{' '}
            <ExternalLink href={SocialMediaLinks.FACEBOOK}>Facebook.</ExternalLink>
          </P>
          <P>
            If you're further along, you may enjoy mentoring others who are trying to learn. Giving
            feedback is a great way to provide coaching. Whether you're brand new or a seasoned
            engineer, we hope you'll join us in building one another's skills.
          </P>
        </Activity>
        <Divider />
        <Activity name="Join a Cohort" img="/img/team.svg" isLeft>
          <P>
            Cohorts is a program that connects you with other campers at your skill level to build
            projects together. Read more about <Link to="/cohorts">cohorts here.</Link> To get
            started, join us on <ExternalLink href={SocialMediaLinks.DISCORD}>Discord</ExternalLink>
            , join the cohorts channel, and ask about join cohorts.
          </P>
          <P>
            We recommend that everyone give our cohorts program a shot. Building with others is a
            sure way to accelerate your growth once you're far enough along to begin building
            projects.
          </P>
        </Activity>
        <Divider />
        <Activity name="Contribute to our Site" img="/img/pair-programming.svg">
          <P>
            This website is an open source project. Click{' '}
            <a href={Repos.FCC_DALLAS} target="_blank" rel="noreferrer">
              here
            </a>{' '}
            for the repo. You can read more about the reasons for writing this site{' '}
            <Link to="/blogs/website-rewrite">here.</Link> Contribution to this site will have
            opportunities for many skill levels, but all code submissions will go through a round of
            code review. The code review is a great way to get feedback and to interact with our
            team.
          </P>
        </Activity>
      </ContentMarginsLayout>
    </StaticContentLayout>
  );
}

export default GetStarted;
