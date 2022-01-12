import * as React from "react";

interface ExternalLinkProps {
  href: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

export default ExternalLink;
