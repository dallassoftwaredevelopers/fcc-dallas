import * as React from "react";
import ConnectWithUs from "~/components/ConnectWIthUs";
import Divider from "~/library/components/Divider";
import Row from "~/library/components/Row";
import { H1 } from "~/library/components/Typography";
import ContentMarginsLayout, {
  ContentMarginsProps,
} from "../ContentMarginsLayout";
import StaticLayout from "../StaticLayout";

interface StaticContentLayoutProps extends ContentMarginsProps {
  title?: string;
  showConnectWith?: boolean;
}

const StaticContentLayout: React.FC<StaticContentLayoutProps> = ({
  children,
  title,
  showConnectWith = false,
  wide = false,
}) => (
  <StaticLayout>
    <ContentMarginsLayout wide={wide}>
      {title && (
        <>
          <Row justifyContent="space-between" alignItems="center">
            <H1>{title}</H1>
            {showConnectWith && <ConnectWithUs />}
          </Row>
          <Divider />
        </>
      )}

      {children}
    </ContentMarginsLayout>
  </StaticLayout>
);

export default StaticContentLayout;
