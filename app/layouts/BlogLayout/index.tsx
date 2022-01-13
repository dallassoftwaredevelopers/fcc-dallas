import * as React from 'react';
import { H1, P } from '~/library/components/Typography';
import ContentMarginsLayout from '../ContentMarginsLayout';

interface BlogLayoutProps {
  title: string;
  author: string;
  img: string;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({
  title,
  author,
  img,
  children,
}) => (
  <ContentMarginsLayout>
    <H1>{title}</H1>
    <P style={{ fontWeight: '600' }}>{author}</P>
    <img
      alt={title}
      src={img}
      style={{ margin: '1rem auto', display: 'block', maxWidth: '100%' }}
    />
    {children}
  </ContentMarginsLayout>
);

export default BlogLayout;
