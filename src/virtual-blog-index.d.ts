/** Provided by the `blog-index` plugin in vite.config.ts: blog.ts minus every post's `content`. */
declare module 'virtual:blog-index' {
  import type { BlogPostMeta } from './data/blog';
  export const blogIndex: BlogPostMeta[];
}
