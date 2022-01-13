/* eslint-disable react/button-has-type */
import * as React from 'react';
import { match } from 'ts-pattern';

interface ButtonProps {
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  size?: 's' | 'm' | 'l' | 'xl';
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  onClick,
  type = 'button',
  size = 's',
}) => (
  <button
    type={type}
    className="fccd-button"
    onClick={onClick}
    style={{
      ...style,
      fontSize: match(size)
        .with('s', () => 14)
        .with('m', () => 16)
        .with('l', () => 18)
        .with('xl', () => 20)
        .exhaustive(),
    }}
  >
    {children}
  </button>
);

export default Button;
