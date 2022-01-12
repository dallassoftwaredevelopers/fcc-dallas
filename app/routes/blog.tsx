import { HeadersFunction, LinksFunction, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import StaticContentLayout from '~/layouts/StaticContentLayout';
import BlogCard from '~/page-components/blog/BlogCard';
import staticStyles from '~/styles/layouts/static.css';
import blogStyles from '~/styles/pages/blog.css';
import { BlogAttributes } from './blogs';
// blogs go here
import * as websiteRewrite from './blogs/website-rewrite.mdx';

export const headers: HeadersFunction = () => ({
  'cache-control': 'public, max-age=1800, s-maxage=86400, stale-while-revalidate=31536000',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: staticStyles },
  { rel: 'stylesheet', href: blogStyles },
];

export const meta: MetaFunction = () => ({
  title: 'Blogs',
  description: 'Posts by our campers',
});

const postFromModule = (mod: typeof websiteRewrite) => {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ''),
    ...mod.attributes,
  };
};

export const loader: LoaderFunction = () => {
  return [postFromModule(websiteRewrite)];
};

const Blog = () => {
  const posts = useLoaderData<BlogAttributes[]>();

  return (
    <StaticContentLayout wide title="Blog" showConnectWith>
      <ul className="cards-layout">
        {posts.map((post) => (
          <>
            <li key={post.slug}>
              <BlogCard {...post} />
            </li>
          </>
        ))}
      </ul>
    </StaticContentLayout>
  );
};

export default Blog;
