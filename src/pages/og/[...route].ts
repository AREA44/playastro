import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'

const entries = await getCollection('docs')

const pages = Object.fromEntries(entries.map(({ data, id }) => [id, { data }]))

export const { getStaticPaths, GET } = OGImageRoute({
  pages,
  param: 'route',
  getImageOptions: (_path, page: (typeof pages)[number]) => {
    return {
      title: page.data.title,
      description: page.data.description,
      border: { width: 32, side: 'inline-start' },
      padding: 80,
      bgImage: {
        path: './src/pages/og/_background-image.png',
      },
    }
  },
})
