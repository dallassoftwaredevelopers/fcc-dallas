import * as React from "react";
import { Link } from "remix";
import { H3, P } from "~/library/components/Typography";
import { BlogAttributes } from "~/routes/blogs";

type BlogCardProps = BlogAttributes;

const BlogCard: React.FC<BlogCardProps> = ({ img, meta, author, slug }) => (
  <div className="blog-card">
    <Link to={slug} prefetch="intent">
      {img && <img style={{ maxWidth: "100%" }} src={img} alt={meta.title} />}
    </Link>
    <div className="blog-card-body">
      <Link to={slug} prefetch="intent">
        <H3>{meta.title}</H3>
      </Link>
      <P style={{ fontWeight: "700" }}>{author}</P>
      {meta.description ? <P>{meta.description}</P> : null}
    </div>
  </div>
);

export default BlogCard;
