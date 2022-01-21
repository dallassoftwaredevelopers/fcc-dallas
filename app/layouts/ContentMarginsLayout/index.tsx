import * as React from 'react';

export interface ContentMarginsProps {
  wide?: boolean;
}

const ContentMarginsLayout: React.FC<ContentMarginsProps> = ({ children, wide = false }) => (
  <div
    style={{ padding: '0 1rem', margin: 'auto', maxWidth: wide ? 1440 : 900 }}
    className="content-margins"
  >
    {children}
  </div>
);

export default ContentMarginsLayout;
