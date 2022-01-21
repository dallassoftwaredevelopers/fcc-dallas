import * as React from 'react';

interface RadioButtonProps
  extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
  > {
  label: string;
}
// a lot more can be done on this component.. would be nice to style this nicely
// and give it more features
const RadioButton: React.FC<RadioButtonProps> = ({ label, ...props }) => (
  <label htmlFor={props.id ?? ''}>
    <input type="radio" {...props} />
    {` ${label}`}
  </label>
);

export default RadioButton;
