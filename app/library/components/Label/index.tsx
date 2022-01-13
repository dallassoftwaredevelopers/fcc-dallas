import * as React from 'react';

export interface LabelProps {
  label: string;
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ label, children, htmlFor }) => (
  <label htmlFor={htmlFor} style={{ marginBottom: '.5rem' }}>
    <div className="fccd-label-text">{label}</div>
    {children}
  </label>
);

export default Label;
