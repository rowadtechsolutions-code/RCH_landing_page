import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * SEO files that need the site's absolute address. Set SITE_URL (e.g. in .env or the host's env) once the domain
 * is known: canonical/og:url/og:image become absolute and sitemap.xml is emitted. Without it, those tags are
 * dropped (rather than shipped with a made-up domain) and robots.txt simply allows everything.
 */
function seo(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '')
  return {
    name: 'rch-seo',
    transformIndexHtml(html) {
      if (base) return html.replaceAll('%SITE_URL%', base).replaceAll(' data-site-url', '')
      return html
        .split('\n')
        .filter((line) => !line.includes('data-site-url'))
        .join('\n')
        .replaceAll('%SITE_URL%', '')
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(base ? [`Sitemap: ${base}/sitemap.xml`] : [])].join('\n')
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots}\n` })
      if (!base) return
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        `  <url><loc>${base}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>`,
        '</urlset>',
      ].join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `${sitemap}\n` })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), seo(env.SITE_URL ?? '')],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: { port: 5180 },
  }
})
