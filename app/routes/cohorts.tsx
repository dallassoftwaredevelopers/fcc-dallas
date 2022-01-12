import { HeadersFunction, LinksFunction, MetaFunction } from "remix";
import ExternalLink from "~/components/ExternalLink";
import { SocialMediaLinks } from "~/constants/external-links";
import StaticContentLayout from "~/layouts/StaticContentLayout";
import Divider from "~/library/components/Divider";
import { H1, H2, H3, P } from "~/library/components/Typography";
import staticStyles from "~/styles/layouts/static.css";
import cohortsStyles from "~/styles/pages/cohorts.css";

export const headers: HeadersFunction = () => ({
  "cache-control":
    "public, max-age=1800, s-maxage=86400, stale-while-revalidate=31536000",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: staticStyles },
  { rel: "stylesheet", href: cohortsStyles },
];

export const meta: MetaFunction = () => ({
  title: "Cohorts",
  description: "Cohorts are for campers to build projects together",
});

const Cohorts = () => {
  return (
    <StaticContentLayout>
      <H1 center>Cohorts</H1>
      <H2 center>Collaborate on a Project</H2>
      <img className="cohorts-img" src="/img/cohort-team.svg" />
      <Divider />
      <H3>What are Cohorts?</H3>
      <P>
        The Cohorts program places learners on teams with others that have a
        similar skill level to build a project. The duration of each cohort is
        generally 1.5 - 2 months. During this time, teams learn to build on a
        team. This includes learning to effectively use GitHub, follow patterns
        established by a team, and to organize around a shared vision. Each team
        has access to a mentor who generally works professionally as a software
        developer or is at least farther along than the skill level of the team.
        Mentors provide guidance and ensure everyone grows as a result of the
        experience.
      </P>
      <H3>Learn through Building</H3>
      <P>
        Cohorts exist because the best way to get better at coding is to build
        projects -- and the best way to build projects is with a team. Not only
        do you learn by tackling challenges that you face personally as you
        contribute to your project, you'll also be exposed to how your teammates
        think and solve problems. Cohorts are especially suited for those who
        are trying to get their first web development job as it will quickly
        accelerate your job readiness.
      </P>
      <img className="cohorts-img" src="/img/cohorts-1.jpeg" />
      <H3 style={{ marginTop: "2rem" }}>What you'll learn</H3>
      <P>
        No matter what level you're at, you will almost always learn something
        new when you participate in Cohorts. It's difficult to list specifically
        what you'll learn because there's a wide range of skills you'll
        encounter, but to name a few:
      </P>
      <ul className="cohorts-list">
        <li>Working on a team</li>
        <li>Exposure to how others solve problems</li>
        <li>Feedback and training from a mentor</li>
        <li>Access to a deeper knowledge of your preferred tech stack</li>
      </ul>
      <H3>How to Join</H3>
      <P>
        To join the next available cohort, just on{" "}
        <ExternalLink href={SocialMediaLinks.DISCORD}>Discord</ExternalLink> and
        join the cohorts channel. Once there, introduce yourself and let us know
        technologies you're currently working on so we can place you on a team.
      </P>
      <Divider />
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/octopocto" title="Octopocto">
          Octopocto
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </StaticContentLayout>
  );
};

export default Cohorts;
