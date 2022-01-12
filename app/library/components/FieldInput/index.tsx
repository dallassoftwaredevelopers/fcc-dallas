import * as React from "react";
import ErrorMsg from "../ErrorMsg";
import Input, { InputProps } from "../Input";
import Label, { LabelProps } from "../Label";

type FieldIinputProps = InputProps & LabelProps;

const FieldInput: React.FC<FieldIinputProps> = React.forwardRef(
  (props, ref) => (
    <>
      <Label {...props}>
        <Input ref={ref} {...props} />
      </Label>
      {!!props.errorMsg && <ErrorMsg>{props.errorMsg}</ErrorMsg>}
    </>
  )
);

export default FieldInput;
