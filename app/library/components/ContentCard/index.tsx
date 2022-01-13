import * as React from 'react';
import Divider from '../Divider';
import { H1, P } from '../Typography';

interface ContentCardProps {
  title: string;
  description: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description }) => (
  <div
    style={{
      width: '300px',
      padding: '1rem',
      borderRadius: '5px',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
    }}
  >
    <H1 style={{ color: '#006400' }}>{title}</H1>
    <Divider />
    <P>{description}</P>
  </div>
);

export default ContentCard;
