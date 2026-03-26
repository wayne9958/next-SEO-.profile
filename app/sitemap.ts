// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wei9958-portfolio.vercel.app'; // 你的 Vercel 網址

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // 如果未來有其他頁面（例如 /projects），再加在下面
  ]
}