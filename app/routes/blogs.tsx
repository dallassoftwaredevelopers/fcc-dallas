import { HeadersFunction, Outlet } from 'remix';
import StaticContentLayout from '~/layouts/StaticContentLayout';
import staticStyles from '~/styles/layouts/static.css';
import blogsStyles from '~/styles/pages/blogs.css';

// this wraps our blogs mdx files

// full day cache due to low edits on blogs
export const headers: HeadersFunction = () => ({
  'cache-control':
    'public, max-age=86400, s-maxage=86400, stale-while-revalidate=31536000',
});

export interface BlogAttributes {
  meta: {
    title: string;
    description: string;
  };
  img?: string;
  author: string;
  slug: string;
}

export const links = () => [
  { rel: 'stylesheet', href: staticStyles },
  { rel: 'stylesheet', href: blogsStyles },
];

const AboutUs = () => (
  <StaticContentLayout>
    <div className="blogs-wrapper">
      <Outlet />
    </div>
  </StaticContentLayout>
);

export default AboutUs;
