import * as React from 'react';
import { match } from 'ts-pattern';

interface TypographyProps {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  center?: boolean;
  noMargin?: boolean;
  style?: React.CSSProperties;
  className?: string;
  bold?: boolean;
  italic?: boolean;
}

// we'll do more with this as we go
const Typography: React.FC<TypographyProps> = ({
  children,
  type,
  center,
  className,
  noMargin,
  bold,
  italic,
  style = {},
}) => {
  const internalStyle = { ...style };

  if (center) {
    internalStyle.textAlign = 'center';
  }
  if (bold) {
    internalStyle.fontWeight = '700';
  }
  if (italic) {
    internalStyle.fontStyle = 'italic';
  }
  if (noMargin) {
    internalStyle.margin = '0';
  }

  const sharedProps = { className, style: internalStyle };

  return match(type)
    .with('h1', () => <h1 {...sharedProps}>{children}</h1>)
    .with('h2', () => <h2 {...sharedProps}>{children}</h2>)
    .with('h3', () => <h3 {...sharedProps}>{children}</h3>)
    .with('h4', () => <h4 {...sharedProps}>{children}</h4>)
    .with('h5', () => <h5 {...sharedProps}>{children}</h5>)
    .with('h6', () => <h6 {...sharedProps}>{children}</h6>)
    .with('p', () => <p {...sharedProps}>{children}</p>)
    .exhaustive();
};

type H1Props = Omit<TypographyProps, 'type'>;
const H1: React.FC<H1Props> = (props) => <Typography type="h1" {...props} />;

type H2Props = Omit<TypographyProps, 'type'>;
const H2: React.FC<H2Props> = (props) => <Typography type="h2" {...props} />;

type H3Props = Omit<TypographyProps, 'type'>;
const H3: React.FC<H3Props> = (props) => <Typography type="h3" {...props} />;

type H4Props = Omit<TypographyProps, 'type'>;
const H4: React.FC<H4Props> = (props) => <Typography type="h4" {...props} />;

type H5Props = Omit<TypographyProps, 'type'>;
const H5: React.FC<H5Props> = (props) => <Typography type="h5" {...props} />;

type H6Props = Omit<TypographyProps, 'type'>;
const H6: React.FC<H6Props> = (props) => <Typography type="h6" {...props} />;

type PProps = Omit<TypographyProps, 'type'>;
const P: React.FC<PProps> = (props) => <Typography type="p" {...props} />;

export { H1, H2, H3, H4, H5, H6, P };
