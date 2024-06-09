import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypeMermaid from 'rehype-mermaid'
import remarkMath from 'remark-math'

// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? 'https://area44.github.io' : 'http://localhost:4321',
  base: '/astro-supernova',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      rehypeKatex,
      rehypeMermaid,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener'],
          content: { type: 'text', value: ' ↗' },
        },
      ],
    ],
  },
  integrations: [
    starlight({
      title: 'Supernova',
      description: 'Play with Astro',
      customCss: [
        './src/styles/globals.css',
        './src/styles/headings.css',
        'katex/dist/katex.min.css',
        './src/styles/mermaid.css',
      ],
      components: {
        Head: './src/components/Head.astro',
      },
      social: {
        github: 'https://github.com/AREA44/astro-supernova',
      },
      editLink: {
        baseUrl: 'https://github.com/AREA44/astro-supernova/blob/main/',
      },
      sidebar: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
      ],
      lastUpdated: true,
      credits: true,
    }),
    tailwind({ applyBaseStyles: false }),
  ],
})
