import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const FOOTER_OVERRIDE_ENABLED = true


const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}


const footerNav = [
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
]

export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

  return (
    <footer className="border-t border-[#4a0e0e]/20 bg-[#4a0e0e] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-start lg:justify-between lg:gap-12 lg:px-8 lg:py-14">
        <div className="max-w-md">
          <p className="text-lg font-semibold tracking-tight">{SITE_CONFIG.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{SITE_CONFIG.description}</p>
        </div>

        {categories.length ? (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Categories</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/updates?category=${category.slug}`}
                  className="opacity-80 underline-offset-4 transition hover:opacity-100 hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-3 text-sm lg:mt-0">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-white/80 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-white/45">Guest posts &amp; media distribution.</p>
        </div>
      </div>
    </footer>
  )
}
