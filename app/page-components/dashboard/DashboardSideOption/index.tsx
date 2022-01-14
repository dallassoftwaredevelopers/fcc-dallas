import * as React from 'react';
import { Link, useLocation } from 'remix';
import { H3 } from '~/library/components/Typography';
import { applyIfTrue } from '~/utils';

interface DashboardSideOptionProps {
  to?: string;
  onClick?: () => void;
}

const DashboardSideOption: React.FC<DashboardSideOptionProps> = ({
  children,
  to,
  onClick,
}) => {
  const location = useLocation();
  const isSelected = to ? location.pathname.includes(to) : false;
  return (
    <div
      className={`dashboard-side-option ${applyIfTrue(
        isSelected,
        'dashboard-side-option--selected'
      )}`}
    >
      {to && (
        <Link to={to} prefetch="intent">
          <H3>{children}</H3>
        </Link>
      )}
      {onClick && (
        <div role="link" tabIndex={-1} onKeyDown={onClick} onClick={onClick}>
          <H3>{children}</H3>
        </div>
      )}
    </div>
  );
};
export default DashboardSideOption;
