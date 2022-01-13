import * as React from 'react';
import ErrorMsg from '../ErrorMsg';
import Input, { InputProps } from '../Input';
import Label, { LabelProps } from '../Label';

type FieldInputProps = InputProps & Omit<LabelProps, 'htmlFor'>;

// todo fix this ts error
// @ts-ignore
const FieldInput: React.FC<FieldInputProps> = React.forwardRef((props, ref) => (
  <>
    <Label htmlFor={props.id} {...props}>
      <Input ref={ref} {...props} />
    </Label>
    {!!props.errorMsg && <ErrorMsg>{props.errorMsg}</ErrorMsg>}
  </>
));

export default FieldInput;
