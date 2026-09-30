import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import { blogPosts, type BlogPost } from './src/data/blog';

const BLOG_FILE = '/src/data/blog.ts';

/**
 * `virtual:blog-index` — blog.ts without the `content` arrays (≈2 KB instead of ≈150 KB).
 * List views (service-page resources, /blog) import it so they don't ship every post body;
 * only BlogPostPage imports the full data. Production builds read blog.ts once at config
 * time; the dev server re-reads it whenever the file changes.
 */
function blogIndexPlugin(): Plugin {
  const id = 'virtual:blog-index';
  const resolved = '\0' + id;
  let server: ViteDevServer | undefined;
  return {
    name: 'blog-index',
    configureServer(s) { server = s; },
    resolveId(source) { return source === id ? resolved : undefined; },
    async load(source) {
      if (source !== resolved) return;
      let posts = blogPosts;
      if (server) {
        this.addWatchFile(server.config.root + BLOG_FILE);
        posts = (await server.ssrLoadModule(BLOG_FILE)).blogPosts as BlogPost[];
      }
      const index = posts.map((p) => { const { content, ...meta } = p; void content; return meta; });
      return `export const blogIndex = ${JSON.stringify(index)};`;
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), blogIndexPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Dependencies are externalized in the SSR build, so chunking only applies to the client bundle.
        manualChunks: isSsrBuild ? undefined : {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
}));
