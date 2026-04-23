import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()
  const recent = (await fetchTaskPosts('mediaDistribution', 8, { fresh: true })).filter((item) => item.slug !== slug).slice(0, 5)
  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', 'Post body will appear here.')

  return (
    <div className="min-h-screen bg-[#f9f7f2] text-[#1f1a1a]">
      <NavbarShell />
      <section className="bg-[#4a0e0e] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Guest post</p>
          <h1 className="mx-auto mt-4 max-w-5xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="text-white/40">›</span>
            <Link href="/updates" className="hover:text-white">
              Media
            </Link>
            <span className="text-white/40">›</span>
            <span className="max-w-md truncate">{post.title}</span>
          </div>
        </div>
      </section>
      <main className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:py-14">
        <article className="rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[#e8e0d6] bg-[#f9f7f2] px-4 py-3 text-sm text-neutral-600">
            <span className="rounded-md bg-[#4a0e0e] px-3 py-1 text-xs font-medium text-white">
              {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>by {post.authorName || 'Editorial Desk'}</span>
          </div>
          <div className="prose prose-lg mt-10 max-w-none prose-headings:font-semibold prose-headings:text-[#1f1a1a] prose-a:text-[#e0004d]">
            <RichContent html={html} />
          </div>
          <div className="mt-12 grid gap-0 overflow-hidden rounded-xl border border-[#e8e0d6] md:grid-cols-2">
            {recent.slice(0, 2).map((item, index) => (
              <Link
                key={item.id}
                href={`/updates/${item.slug}`}
                className="border-[#e8e0d6] p-6 transition hover:bg-[#f9f7f2] md:border-r md:first:border-b-0 md:last:border-r-0"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e0004d]">
                  {index === 0 ? 'Previous post' : 'Next post'}
                </p>
                <p className="mt-3 text-lg font-medium leading-snug text-neutral-800">{item.title}</p>
              </Link>
            ))}
          </div>
        </article>
        <aside className="space-y-6">
          <div className="rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm">
            <div className="flex items-stretch gap-0 overflow-hidden rounded-md border border-[#e8e0d6]">
              <input
                className="h-12 min-w-0 flex-1 border-0 bg-[#f9f7f2] px-4 text-sm outline-none"
                placeholder="Search media"
                readOnly
                aria-label="Search media"
              />
              <button
                type="button"
                className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#4a0e0e] text-sm font-semibold text-white"
                aria-label="Search"
              >
                Go
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e0004d]">More to read</p>
            <div className="mt-4 space-y-4">
              {recent.map((item) => (
                <Link
                  key={item.id}
                  href={`/updates/${item.slug}`}
                  className="block border-b border-[#e8e0d6] pb-4 text-sm font-medium text-neutral-800 last:border-b-0 last:pb-0 hover:text-[#e0004d]"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  )
}
