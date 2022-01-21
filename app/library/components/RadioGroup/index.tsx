import * as React from 'react';
import ErrorMsg from '../ErrorMsg';
import Label from '../Label';
import Row from '../Row';

interface RadioGroupProps {
  label: string;
  errorMsg?: string;
}

// a lot more can be done on this component
const RadioGroup: React.FC<RadioGroupProps> = ({ label, errorMsg, children }) => (
  <div style={{ marginBottom: '1rem' }}>
    <Label htmlFor={label} label={label}>
      <Row alignItems="center" gap="1rem">
        {children}
      </Row>
    </Label>
    {!!errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
  </div>
);

export default RadioGroup;
