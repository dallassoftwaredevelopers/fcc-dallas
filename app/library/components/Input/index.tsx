import * as React from 'react';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  fullWidth?: boolean;
  errorMsg?: string;
  id: string; // required for label accessibility
}

// todo fix this ts error
// @ts-ignore
const Input: React.FC<InputProps> = React.forwardRef(
  ({ fullWidth, errorMsg, id, ...props }, ref) => (
    <input
      id={id}
      ref={ref}
      style={{
        width: fullWidth ? '100%' : 'auto',
        outline: errorMsg ? 'red' : 'inherit',
        ...props.style,
      }}
      className={`fccd-input${props.className ? ` ${props.className}` : ''}`}
      {...props}
    />
  )
);

export default Input;
