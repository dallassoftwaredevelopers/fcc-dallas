import * as React from 'react';

// we can create props to customize this as we go
interface RowProps {
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  flexDirection?: React.CSSProperties['flexDirection'];
  flexWrap?: React.CSSProperties['flexWrap'];
  gap?: React.CSSProperties['gap'];
}

const Row: React.FC<RowProps> = ({
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  flexDirection = 'row',
  flexWrap = 'wrap',
  gap = '1rem',
  children,
}) => (
  <div
    style={{
      display: 'flex',
      flexWrap,
      gap,
      justifyContent,
      alignItems,
      flexDirection,
    }}
  >
    {children}
  </div>
);

export default Row;
