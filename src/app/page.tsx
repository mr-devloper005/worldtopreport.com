import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  BookOpen,
  Building2,
  Compass,
  FileText,
  Globe2,
  Image as ImageIcon,
  LayoutGrid,
  MapPin,
  Share2,
  ShieldCheck,
  Sparkles,
  Tag,
  User,
  Users,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { getHomeEditorialMockPosts, mergeEditorialPostsForHome } from '@/lib/home-editorial-mock'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  mediaDistribution: FileText,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (
    value === 'listing' ||
    value === 'classified' ||
    value === 'article' ||
    value === 'image' ||
    value === 'profile' ||
    value === 'sbm' ||
    value === 'mediaDistribution'
  )
    return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone(brandPack: string) {
  if (brandPack === 'market-utility') {
    return {
      shell: 'bg-[#f5f7f1] text-[#1f2617]',
      hero: 'bg-[linear-gradient(180deg,#eef4e4_0%,#f8faf4_100%)]',
      panel: 'border border-[#d5ddc8] bg-white shadow-[0_24px_64px_rgba(64,76,34,0.08)]',
      soft: 'border border-[#d5ddc8] bg-[#eff3e7]',
      muted: 'text-[#5b664c]',
      title: 'text-[#1f2617]',
      badge: 'bg-[#1f2617] text-[#edf5dc]',
      action: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
      actionAlt: 'border border-[#d5ddc8] bg-white text-[#1f2617] hover:bg-[#eef3e7]',
    }
  }
  return {
    shell: 'bg-[#f8fbff] text-slate-950',
    hero: 'bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)]',
    panel: 'border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
    soft: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
    action: 'bg-slate-950 text-white hover:bg-slate-800',
    actionAlt: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-100',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main>
      <section className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <Compass className="h-3.5 w-3.5" />
                Local discovery product
              </span>
              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
                Search businesses, compare options, and act fast without digging through generic feeds.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>

              <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto]`}>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">What do you need today?</div>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">Choose area or city</div>
                <Link href={primaryTask?.route || '/listings'} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Browse now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Verified businesses', `${featuredListings.length || 3}+ highlighted surfaces`],
                  ['Fast scan rhythm', 'More utility, less filler'],
                  ['Action first', 'Call, visit, shortlist, compare'],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-[1.4rem] p-4 ${tone.soft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${tone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary lane</p>
                    <h2 className="mt-2 text-3xl font-semibold">{primaryTask?.label || 'Listings'}</h2>
                  </div>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>{primaryTask?.description || 'Structured discovery for services, offers, and business surfaces.'}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                      <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured businesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Strong listings with clearer trust cues.</h2>
          </div>
          <Link href="/listings" className="text-sm font-semibold text-primary hover:opacity-80">Open listings</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What makes this different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Built like a business directory, not a recolored content site.</h2>
            <ul className={`mt-6 space-y-3 text-sm leading-7 ${tone.muted}`}>
              <li>Search-first hero instead of a magazine headline.</li>
              <li>Action-oriented listing cards with trust metadata.</li>
              <li>Support lanes for offers, businesses, and profiles.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskKey = resolveTaskKey((post as { task?: unknown }).task, profilePosts.length ? 'profile' : 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.8rem] ${tone.panel}`}>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{meta.category || String((post as { task?: unknown }).task || 'Profile')}</p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Quick access to local information and related surfaces.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function splitIntoTwoParagraphs(text: string) {
  const t = text.trim()
  if (!t) return ['', '']
  const splitAt = t.search(/\.\s+[A-Z]/)
  if (splitAt > 80) {
    return [t.slice(0, splitAt + 1).trim(), t.slice(splitAt + 1).trim()]
  }
  const half = Math.floor(t.length / 2)
  const space = t.lastIndexOf(' ', half + 40)
  if (space > 40) return [t.slice(0, space).trim(), t.slice(space).trim()]
  return [t, '']
}

function getPostCategoryLabel(post: SitePost): string {
  const content =
    post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const cat = content.category
  if (typeof cat === 'string' && cat.trim()) return cat.trim()
  const tag = post.tags?.find((t) => typeof t === 'string' && t !== 'mediaDistribution' && t !== 'article')
  if (typeof tag === 'string') return tag
  return 'Update'
}

function EditorialHome({
  primaryTask,
  posts,
  supportTasks,
}: {
  primaryTask?: EnabledTask
  posts: SitePost[]
  supportTasks: EnabledTask[]
}) {
  const defaultEditorialTask: TaskKey =
    primaryTask?.key === 'mediaDistribution' || primaryTask?.key === 'article'
      ? primaryTask.key
      : 'article'

  const postHref = (post: SitePost) =>
    getTaskHref(resolveTaskKey((post as { task?: unknown }).task, defaultEditorialTask), post.slug)

  const lead = posts[0]
  const spotlightPosts = posts.slice(1, 4)
  const deckPosts = posts.slice(10, 16)
  const featuredSecondary = posts[1]

  const headline = lead?.title || SITE_CONFIG.name
  const summarySource = lead?.summary || SITE_CONFIG.description
  const [bodyA, bodyB] = splitIntoTwoParagraphs(summarySource)
  const secondParagraph = bodyB || SITE_CONFIG.tagline

  const primaryRoute = primaryTask?.route || '/updates'
  const partnerMarks = ['Northline Media', 'Harbor Press', 'Atlas Syndicate', 'Meridian Wire', 'Summit Review']

  return (
    <main className="bg-[#f9f7f2] text-[#1f1a1a]">
      {/* Hero — continues header burgundy */}
      <section className="relative overflow-hidden bg-[#4a0e0e] pb-20 pt-10 text-white sm:pb-24 sm:pt-14 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(224,0,77,0.22),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">Guest post distribution</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.25rem]">
              The smartest way to publish and distribute your stories.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              A public catalog of guest posts and partner media—syndication-friendly pages, clear presentation, and a
              simple path for readers to discover your next byline.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={primaryRoute}
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#e0004d] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#c40043] hover:shadow-lg"
              >
                Browse media
              </Link>
              <Link
                href="/#platform"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/80 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View demo
              </Link>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="relative mx-auto mt-14 max-w-5xl lg:mt-16">
            <div className="absolute -left-4 top-1/4 z-10 hidden w-48 rounded-lg border border-white/20 bg-white/95 p-3 text-[#1f1a1a] shadow-xl backdrop-blur sm:block lg:-left-8">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#e0004d]">Article reach</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">+48%</p>
              <p className="text-xs text-neutral-500">vs. last 30 days</p>
            </div>
            <div className="absolute -right-4 top-1/3 z-10 hidden w-44 rounded-lg border border-white/20 bg-[#1a1212] p-3 text-white shadow-xl sm:block lg:-right-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Avg. read time</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">5m</p>
              <p className="text-xs text-white/55">Across top posts</p>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-medium text-neutral-500">Distribution dashboard</span>
              </div>
              <div className="grid gap-0 bg-white text-[#1f1a1a] md:grid-cols-[220px_1fr]">
                <aside className="hidden border-r border-neutral-100 bg-[#faf9f7] p-4 text-xs text-neutral-600 md:block">
                  <p className="font-semibold text-neutral-900">Pipeline</p>
                  <ul className="mt-3 space-y-2">
                    <li className="rounded bg-white px-2 py-1.5 font-medium text-[#4a0e0e] shadow-sm">Drafts</li>
                    <li className="px-2 py-1">Scheduled</li>
                    <li className="px-2 py-1">Live</li>
                    <li className="px-2 py-1">Syndication</li>
                  </ul>
                </aside>
                <div className="p-5 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#e0004d]">Editor</p>
                      <p className="mt-1 text-lg font-semibold text-neutral-900 line-clamp-2">
                        {lead?.title || 'Your next headline appears here'}
                      </p>
                    </div>
                    <span className="rounded-md bg-[#4a0e0e] px-3 py-1.5 text-[11px] font-semibold text-white">Ready to send</span>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4">
                      <BarChart3 className="h-5 w-5 text-[#e0004d]" />
                      <p className="mt-3 text-2xl font-bold tabular-nums">12.4k</p>
                      <p className="text-xs text-neutral-500">Opens this week</p>
                    </div>
                    <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4">
                      <Share2 className="h-5 w-5 text-[#e0004d]" />
                      <p className="mt-3 text-2xl font-bold tabular-nums">38</p>
                      <p className="text-xs text-neutral-500">Partner pickups</p>
                    </div>
                    <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4">
                      <BookOpen className="h-5 w-5 text-[#e0004d]" />
                      <p className="mt-3 text-2xl font-bold tabular-nums">92%</p>
                      <p className="text-xs text-neutral-500">Scroll depth</p>
                    </div>
                  </div>
                  <div className="mt-6 rounded-lg border border-dashed border-neutral-200 bg-[#f9f7f2] p-4 text-sm leading-relaxed text-neutral-600">
                    {bodyA ? <span>{bodyA}</span> : <span>{SITE_CONFIG.description}</span>}
                    {secondParagraph ? <span className="mt-2 block text-neutral-500">{secondParagraph}</span> : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-4 flex max-w-md justify-center rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-center text-sm text-white/90 backdrop-blur sm:hidden">
              <span className="font-semibold text-[#ffb3c9]">Article reach +48%</span>
              <span className="mx-2 text-white/40">·</span>
              <span>Avg. read 5m</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-b border-[#e8e0d6] bg-[#f9f7f2] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[#e0004d]">
            Trusted by leading publishers
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-60 grayscale">
            {partnerMarks.map((name) => (
              <span key={name} className="text-sm font-semibold tracking-wide text-neutral-700">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Platform value */}
      <section id="platform" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e0004d]">Why teams choose us</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1f1a1a] sm:text-4xl">
              Empower your writers with powerful distribution tools.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
              From draft to syndication, keep every article on-brand, measurable, and easy to repurpose. Editors stay in
              control; growth teams get the signals they need.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={primaryRoute}
                className="inline-flex rounded-md bg-[#e0004d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c40043] hover:shadow-md"
              >
                View media
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-[#4a0e0e] underline-offset-4 hover:underline">
                Talk to editorial →
              </Link>
            </div>
            <ul className="mt-10 space-y-4">
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#e8e0d6] bg-white text-[#e0004d]">
                  <Globe2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-[#1f1a1a]">Instant global reach</p>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    Publish once, distribute everywhere your readers already are.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#e8e0d6] bg-white text-[#e0004d]">
                  <BarChart3 className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-[#1f1a1a]">Advanced content analytics</p>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    Completion, engagement, and pickup trends without leaving the story.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative flex min-h-[320px] items-center justify-center">
            <div className="relative h-[300px] w-[300px] sm:h-[340px] sm:w-[340px]">
              <div className="absolute inset-0 rounded-full border border-[#e8e0d6] bg-white shadow-[0_20px_60px_rgba(74,14,14,0.08)]" />
              <div className="absolute left-1/2 top-1/2 flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e0004d] text-white shadow-lg">
                <Sparkles className="h-9 w-9" />
              </div>
              {(
                [
                  { label: 'Write', angle: -90 },
                  { label: 'Optimize', angle: 0 },
                  { label: 'Distribute', angle: 90 },
                  { label: 'Analyze', angle: 180 },
                ] as const
              ).map(({ label, angle }) => {
                const rad = (angle * Math.PI) / 180
                const r = 118
                const x = Math.cos(rad) * r
                const y = Math.sin(rad) * r
                return (
                  <div
                    key={label}
                    className="absolute flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#4a0e0e]/25 bg-[#f9f7f2] text-center text-[11px] font-semibold uppercase tracking-wide text-[#4a0e0e]"
                    style={{
                      left: `calc(50% + ${x}px - 32px)`,
                      top: `calc(50% + ${y}px - 32px)`,
                    }}
                  >
                    {label}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Feature rows — use live posts when available */}
      <section id="resources" className="scroll-mt-24 border-t border-[#e8e0d6] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:space-y-28 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <span className="text-5xl font-bold tabular-nums text-[#e0004d]/25">01</span>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0004d]">Build your network</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Turn every article into a distribution moment.</h3>
              <p className="mt-4 text-neutral-600">
                Syndication-friendly layouts, clean metadata, and reader-first typography help partners pick up your
                stories faster—without extra formatting work.
              </p>
              <Link href={primaryRoute} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#e0004d] hover:underline">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-[#4a0e0e] shadow-xl">
              <div className="aspect-[4/3] bg-[linear-gradient(145deg,#5c1515_0%,#2a0707_100%)]" />
              <div className="absolute inset-0 flex items-end p-6">
                <div className="w-full rounded-lg border border-white/15 bg-black/40 p-4 text-white backdrop-blur-md">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Engagement</p>
                  <p className="mt-1 text-xl font-bold">15% lift</p>
                  <p className="text-xs text-white/70">On syndicated pickups this quarter</p>
                </div>
              </div>
              {spotlightPosts[0] ? (
                <Link
                  href={postHref(spotlightPosts[0])}
                  className="absolute right-4 top-4 max-w-[200px] rounded-lg border border-white/20 bg-white/95 p-3 text-left text-xs text-neutral-800 shadow-lg transition hover:shadow-xl"
                >
                  <span className="font-semibold text-[#4a0e0e]">{getPostCategoryLabel(spotlightPosts[0])}</span>
                  <span className="mt-1 block font-medium leading-snug text-neutral-900">{spotlightPosts[0].title}</span>
                </Link>
              ) : null}
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-xl border border-[#e8e0d6] bg-[#f9f7f2] shadow-lg">
                <div className="aspect-[4/3] bg-[linear-gradient(180deg,#ece8e1_0%,#d8d0c6_100%)]" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {['Technology', 'Business', 'Policy'].map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#4a0e0e] shadow">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-md">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#e0004d]">Recommended</p>
                  <p className="mt-1 text-sm font-semibold text-neutral-900">
                    {featuredSecondary?.title || headline}
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-5xl font-bold tabular-nums text-[#e0004d]/25">02</span>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0004d]">Personalize the read</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Deliver the right story to the right reader.</h3>
              <p className="mt-4 text-neutral-600">
                Sections, tags, and modular layouts make it easy to merchandise articles for different audiences—without
                rebuilding pages from scratch.
              </p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#e0004d] hover:underline">
                See a walkthrough <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <span className="text-5xl font-bold tabular-nums text-[#e0004d]/25">03</span>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0004d]">Engage your audience</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Keep the conversation close to the story.</h3>
              <p className="mt-4 text-neutral-600">
                Comments, calls-to-action, and follow-on reading paths stay visually aligned with your editorial brand—so
                engagement feels intentional, not bolted on.
              </p>
              <Link href={primaryRoute} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#e0004d] hover:underline">
                Browse media <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-[#1f1a1a] bg-[#1a1212] shadow-xl">
              <div className="aspect-[4/3] bg-[linear-gradient(160deg,#2d1818_0%,#0f0a0a_100%)]" />
              <div className="absolute inset-6 flex flex-col rounded-lg border border-white/10 bg-black/50 p-4 text-sm text-white/90 backdrop-blur">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Users className="h-4 w-4 text-[#e0004d]" />
                  <span className="font-semibold">Reader voices</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/70">
                  “Clear structure, fast load, and the article reads beautifully on mobile.”
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-white/45">Syndication partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser + desk grid */}
      <section id="pricing" className="scroll-mt-24 border-t border-[#e8e0d6] bg-[#f9f7f2] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-[#e8e0d6] bg-white p-8 shadow-sm sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e0004d]">Plans</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Guest post placements, explained simply.</h3>
              <p className="mt-3 text-neutral-600">
                Share your topic, audience, and timeline—we reply with availability and next steps. No accounts required to
                browse the public media catalog.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
              <Link
                href="/contact"
                className="inline-flex rounded-md bg-[#e0004d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c40043]"
              >
                Request a placement
              </Link>
              <Link
                href={primaryRoute}
                className="inline-flex rounded-md border border-[#e8e0d6] bg-[#f9f7f2] px-5 py-2.5 text-sm font-semibold text-[#1f1a1a] transition hover:border-[#4a0e0e]/30"
              >
                View media
              </Link>
            </div>
          </div>

          {deckPosts.length ? (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold tracking-tight text-[#1f1a1a] sm:text-3xl">From the desk</h2>
              <p className="mt-2 max-w-2xl text-sm text-neutral-600">
                Latest guest posts and media from {SITE_CONFIG.name}. Open any card for the full read.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {deckPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={postHref(post)}
                    className="group flex h-full flex-col rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm transition hover:border-[#e0004d]/40 hover:shadow-md"
                  >
                    <span className="w-fit rounded-full bg-[#e0004d]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e0004d]">
                      {getPostCategoryLabel(post)}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold leading-snug text-[#1f1a1a] group-hover:text-[#e0004d]">
                      {post.title}
                    </h3>
                    {post.summary ? (
                      <p className="mt-3 line-clamp-4 grow text-sm leading-relaxed text-neutral-600">{post.summary}</p>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#4a0e0e]">
                      Read post <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {supportTasks.length ? (
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {supportTasks.slice(0, 3).map((task) => (
                <Link
                  key={task.key}
                  href={task.route}
                  className="rounded-xl border border-[#e8e0d6] bg-white p-5 transition hover:border-[#4a0e0e]/25 hover:shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-[#1f1a1a]">{task.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{task.description}</p>
                </Link>
              ))}
            </div>
          ) : null}

          {/* Spotlight list */}
          {spotlightPosts.length ? (
            <div className="mt-16 border-t border-[#e8e0d6] pt-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e0004d]">Spotlight</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {spotlightPosts.map((post, i) => (
                  <Link
                    key={post.id}
                    href={postHref(post)}
                    className="rounded-xl border border-[#e8e0d6] bg-white p-5 transition hover:border-[#e0004d]/35 hover:shadow-md"
                  >
                    <span className="text-xs font-bold tabular-nums text-[#e0004d]">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                      {getPostCategoryLabel(post)}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-[#1f1a1a]">{post.title}</h3>
                    {post.summary ? <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{post.summary}</p> : null}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey((post as { task?: unknown }).task, 'image'), post.slug)}
                className={
                  index === 0
                    ? `col-span-2 row-span-2 flex flex-col justify-between rounded-[2.4rem] border border-white/10 ${tone.panel} p-6 sm:p-8`
                    : `flex flex-col justify-between rounded-[1.8rem] border border-white/10 ${tone.soft} p-4 sm:p-5`
                }
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">Visual</p>
                  <h3 className={index === 0 ? 'mt-2 text-2xl font-semibold leading-tight' : 'mt-2 text-base font-semibold leading-snug'}>
                    {post.title}
                  </h3>
                </div>
                {post.summary ? (
                  <p className={`mt-4 text-sm leading-relaxed ${tone.muted} ${index === 0 ? 'line-clamp-6' : 'line-clamp-3'}`}>{post.summary}</p>
                ) : null}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey((post as { task?: unknown }).task, 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 6, { allowMockFallback: false, fresh: false, revalidate: 120 }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const mediaDistributionPosts =
    taskFeed.find(({ task }) => task.key === 'mediaDistribution')?.posts || []
  const editorialRaw = articlePosts.length ? articlePosts : mediaDistributionPosts
  const editorialPosts =
    editorialRaw.length > 0
      ? editorialRaw.slice(0, 16)
      : mergeEditorialPostsForHome(editorialRaw, getHomeEditorialMockPosts(), 16)
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} posts={editorialPosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
