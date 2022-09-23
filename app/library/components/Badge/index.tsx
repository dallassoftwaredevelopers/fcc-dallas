import { match } from 'ts-pattern';

interface BadgeProps {
  variant: 'success' | 'info' | 'warn' | 'error';
  children: string;
}

export const Badge = ({ children, variant }: BadgeProps) => (
  <div
    style={{
      backgroundColor: match(variant)
        .with('success', () => '#C2FF94')
        .with('info', () => '#94EDFF')
        .with('warn', () => '#FFFF94')
        .with('error', () => '#FF9494')
        .exhaustive(),
      color: '#333',
      padding: '.5rem 1rem',
      borderRadius: '40px',
      textDecoration: 'none',
      display: 'inline-block',
    }}
  >
    {children}
  </div>
);
