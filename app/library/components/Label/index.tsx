import * as React from "react";

export interface LabelProps {
  label: string;
}

const Label: React.FC<LabelProps> = ({ label, children }) => (
  <label style={{ marginBottom: ".5rem" }}>
    <div className="fccd-label-text">{label}</div>
    {children}
  </label>
);

export default Label;
