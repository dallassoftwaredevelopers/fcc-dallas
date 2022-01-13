import * as React from 'react';
import Row from '~/library/components/Row';
import { H2 } from '~/library/components/Typography';
import { applyIfTrue } from '~/utils';

interface ActivityProps {
  name: string;
  img: string;
  isLeft?: boolean;
}

const Activity: React.FC<ActivityProps> = ({
  name,
  children,
  img,
  isLeft = false,
}) => (
  <div>
    <H2 bold className={applyIfTrue(!isLeft, 'activity-right')}>
      {name}
    </H2>
    <Row
      gap="5rem"
      justifyContent="space-between"
      flexDirection={isLeft ? 'row' : 'row-reverse'}
    >
      <div className="activity-txt">{children}</div>
      <img className="activity-img" src={img} alt={name} />
    </Row>
  </div>
);

export default Activity;
