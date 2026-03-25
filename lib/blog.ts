import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  geo: {
    city: string
    country: string
    lat: number
    lng: number
    continent: string
  }
  readTime: number
  excerpt: string
  content: string
}

export function getAllPosts(locale: string = 'fr'): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data, content } = matter(raw)

      // Titre selon locale
      const title = locale === 'en' ? (data.titleEN || data.title) :
                    locale === 'de' ? (data.titleDE || data.title) :
                    locale === 'it' ? (data.titleIT || data.title) :
                    data.title

      return {
        slug: data.slug,
        title,
        date: data.date,
        category: data.category,
        tags: data.tags || [],
        geo: data.geo,
        readTime: data.readTime || 5,
        excerpt: data.excerpt,
        content
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByGeo(continent: string): BlogPost[] {
  return getAllPosts().filter(post => post.geo?.continent === continent)
}

export function getPostsByCountry(country: string): BlogPost[] {
  return getAllPosts().filter(post => post.geo?.country === country)
}
