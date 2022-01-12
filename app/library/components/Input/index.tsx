import * as React from "react";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  fullWidth?: boolean;
  errorMsg?: string;
}

const Input: React.FC<InputProps> = React.forwardRef(
  ({ fullWidth, errorMsg, ...props }, ref) => {
    return (
      <input
        ref={ref}
        style={{
          width: fullWidth ? "100%" : "auto",
          outline: errorMsg ? "red" : "inherit",
          ...props.style,
        }}
        className={`fccd-input${props.className ? ` ${props.className}` : ""}`}
        {...props}
      />
    );
  }
);

export default Input;
