import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Link, useLocation } from 'remix';
import Row from '~/library/components/Row';
import { H3 } from '~/library/components/Typography';
import { applyIfTrue } from '~/utils';

interface DashboardSideOptionProps {
  to?: string;
  onClick?: () => void;
  icon?: IconDefinition;
}

const DashboardSideOption: React.FC<DashboardSideOptionProps> = ({
  children,
  to,
  onClick,
  icon,
}) => {
  const location = useLocation();
  const isSelected = to ? location.pathname.includes(to) : false;
  return (
    <Row
      alignItems="center"
      className={`dashboard-side-option ${applyIfTrue(
        isSelected,
        'dashboard-side-option--selected'
      )}`}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {to && (
        <Link to={to} prefetch="intent">
          <H3 noMargin>{children}</H3>
        </Link>
      )}
      {onClick && (
        <div role="link" tabIndex={-1} onKeyDown={onClick} onClick={onClick}>
          <H3>{children}</H3>
        </div>
      )}
    </Row>
  );
};
export default DashboardSideOption;
