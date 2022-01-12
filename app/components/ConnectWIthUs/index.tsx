import * as React from "react";
import { SocialMediaLinks } from "~/constants/external-links";
import Button from "~/library/components/Button";
import Row from "~/library/components/Row";
import { H3 } from "~/library/components/Typography";
import ExternalLink from "../ExternalLink";

const ConnectWithUs = () => {
  return (
    <Row alignItems="center">
      <H3 style={{ margin: 0 }}>Connect with us</H3>
      {/* Extra row for collapsing gracefully on mobile */}
      <Row>
        <ExternalLink href={SocialMediaLinks.DISCORD}>
          <Button>DISCORD</Button>
        </ExternalLink>
        <ExternalLink href={SocialMediaLinks.FACEBOOK}>
          <Button>FACEBOOK</Button>
        </ExternalLink>
      </Row>
    </Row>
  );
};

export default ConnectWithUs;
