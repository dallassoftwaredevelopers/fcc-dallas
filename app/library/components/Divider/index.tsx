import * as React from 'react';
import { Palette } from '~/library/tokens/palette';

interface DividerProps {
  className?: string;
  style?: React.CSSProperties;
  white?: boolean;
}

const Divider: React.FC<DividerProps> = ({ style, className = '', white }) => (
  <hr
    className={className}
    style={{
      height: '2px',
      backgroundColor: white ? 'white' : Palette.PRIMARY_DARK,
      width: '100%',
      margin: '1rem 0',
      border: 0,
      ...style,
    }}
  />
);

export default Divider;
