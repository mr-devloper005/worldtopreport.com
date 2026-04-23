import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full piece on the post page.'
  return value.length > 200 ? value.slice(0, 197).trimEnd() + '…' : value
}

export async function TaskListPageOverride(_: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts('mediaDistribution', 24, { fresh: true })
  const featured = posts[0]
  const gridPosts = posts.slice(1)
  const recent = posts.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#f9f7f2] text-[#1f1a1a]">
      <NavbarShell />

      <section className="relative overflow-hidden bg-[#4a0e0e] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_0%,rgba(224,0,77,0.2),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/70">Guest post catalog</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">Media</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Browse published guest posts and partner media. Each piece is formatted for reading and syndication-style
            sharing—no accounts required.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#e0004d] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#c40043]"
            >
              Submit a pitch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#platform"
              className="inline-flex rounded-md border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Why publish here
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {featured ? (
          <Link
            href={`/updates/${featured.slug}`}
            className="group mb-14 block overflow-hidden rounded-2xl border border-[#e8e0d6] bg-white shadow-[0_20px_60px_rgba(74,14,14,0.08)] transition hover:border-[#e0004d]/35 hover:shadow-[0_24px_70px_rgba(74,14,14,0.12)]"
          >
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <span className="w-fit rounded-full bg-[#e0004d] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                Featured guest post
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#e0004d]">
                {String((featured.content as Record<string, unknown>)?.category || 'Media')}
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#1f1a1a] sm:text-3xl lg:text-[2rem]">
                {featured.title}
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f9f7f2] px-2.5 py-1 text-xs font-medium text-neutral-700 ring-1 ring-[#e8e0d6]">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {new Date(featured.publishedAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>{featured.authorName || 'Guest author'}</span>
              </div>
              <p className="mt-5 line-clamp-4 text-base leading-relaxed text-neutral-600">{excerpt(featured.summary)}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#e0004d]">
                Read full post
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ) : null}

        {gridPosts.length ? (
          <>
            <div className="mb-8 flex flex-col gap-2 border-b border-[#e8e0d6] pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#1f1a1a] sm:text-3xl">More media</h2>
                <p className="mt-2 max-w-xl text-sm text-neutral-600">Newest placements first. Open any card for the complete guest post.</p>
              </div>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/updates/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e8e0d6] bg-white shadow-sm transition hover:border-[#e0004d]/40 hover:shadow-md"
                  >
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e0004d]">
                        {String((post.content as Record<string, unknown>)?.category || 'Guest post')}
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#1f1a1a] group-hover:text-[#e0004d]">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">{excerpt(post.summary)}</p>
                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#f0ebe3] pt-4 text-xs text-neutral-500">
                        <span>{post.authorName || 'Guest author'}</span>
                        <span className="tabular-nums">
                          {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : featured ? null : (
          <p className="rounded-xl border border-dashed border-[#e8e0d6] bg-white px-6 py-12 text-center text-neutral-600">
            No guest posts yet. Check back soon.
          </p>
        )}

        <aside className="mx-auto mt-16 max-w-3xl lg:max-w-none">
          <div className="rounded-2xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-8 lg:flex lg:items-stretch lg:gap-10">
            <div className="lg:w-2/5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e0004d]">Recently added</p>
              <p className="mt-2 text-sm text-neutral-600">Quick jumps to the latest guest posts.</p>
            </div>
            <ul className="mt-6 space-y-3 border-t border-[#f0ebe3] pt-6 lg:mt-0 lg:flex-1 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {recent.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/updates/${post.slug}`}
                    className="flex items-start justify-between gap-4 rounded-lg py-2 text-sm transition hover:bg-[#f9f7f2]"
                  >
                    <span className="font-medium leading-snug text-neutral-900 hover:text-[#e0004d]">{post.title}</span>
                    <span className="shrink-0 text-xs tabular-nums text-neutral-500">
                      {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  )
}
