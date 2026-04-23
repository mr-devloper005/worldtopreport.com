import Link from 'next/link'
import { ArrowRight, Clock, FileText, Mail, MessageSquare, PenLine, Shield } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const topics = [
  {
    icon: PenLine,
    title: 'Guest post pitches',
    body: 'Share your topic, target audience, and timeline. Editorial will confirm fit and next steps by email.',
  },
  {
    icon: Shield,
    title: 'Corrections & updates',
    body: 'Flag factual errors, outdated figures, or broken links in a published piece. Include the URL and what should change.',
  },
  {
    icon: MessageSquare,
    title: 'Syndication & media',
    body: 'Questions about republishing, attribution, or partner placements for content that appears in our media catalog.',
  },
]

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#f9f7f2] text-[#1f1a1a]">
      <NavbarShell />

      <section className="relative overflow-hidden bg-[#4a0e0e] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_0%,rgba(224,0,77,0.18),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/70">Contact</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Talk to the {SITE_CONFIG.name} desk
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Guest posts, corrections, and media enquiries go straight to editorial—clear subject lines help us reply
            faster.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/75">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-[#ffb3c9]" aria-hidden />
              Typical reply within 2–3 business days
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e0004d]">How we can help</h2>
            <p className="mt-3 max-w-md text-lg font-semibold tracking-tight text-[#1f1a1a]">
              Pick the lane that best matches your message so it lands with the right reader on our side.
            </p>
            <ul className="mt-10 space-y-5">
              {topics.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm transition hover:border-[#e0004d]/25 hover:shadow-md"
                >
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#e8e0d6] bg-[#f9f7f2] text-[#e0004d]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold text-[#1f1a1a]">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-xl border border-dashed border-[#e8e0d6] bg-white/80 px-5 py-4 text-sm text-neutral-600">
              <FileText className="mb-2 inline h-4 w-4 text-[#4a0e0e]" aria-hidden />
              <p>
                For pitches, include a working headline, 2–3 sentence summary, and any disclosure (affiliate, client, or
                sponsored context). We do not accept anonymous guest posts.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:editor@example.com"
                className="group rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm transition hover:border-[#e0004d]/35 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e0004d]">Editorial</span>
                  <Mail className="h-4 w-4 text-neutral-400 transition group-hover:text-[#e0004d]" aria-hidden />
                </div>
                <p className="mt-4 break-all text-lg font-semibold text-[#1f1a1a] group-hover:text-[#e0004d]">
                  editor@example.com
                </p>
                <p className="mt-2 text-xs text-neutral-500">Stories, pitches, corrections</p>
              </a>
              <a
                href="mailto:contact@example.com"
                className="group rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm transition hover:border-[#e0004d]/35 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e0004d]">General</span>
                  <Mail className="h-4 w-4 text-neutral-400 transition group-hover:text-[#e0004d]" aria-hidden />
                </div>
                <p className="mt-4 break-all text-lg font-semibold text-[#1f1a1a] group-hover:text-[#e0004d]">
                  contact@example.com
                </p>
                <p className="mt-2 text-xs text-neutral-500">Billing, legal, other enquiries</p>
              </a>
            </div>

            <div className="rounded-2xl border border-[#e8e0d6] bg-white p-6 shadow-[0_20px_60px_rgba(74,14,14,0.06)] sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-[#1f1a1a]">Send a message</h2>
              <p className="mt-2 text-sm text-neutral-600">
                This form is for convenience; you can also email us directly using the addresses above.
              </p>
              <form className="mt-8 grid gap-5" action="#" method="post">
                <div className="grid gap-2">
                  <Label htmlFor="contact-name" className="text-sm font-medium text-[#1f1a1a]">
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Your full name"
                    className="h-11 rounded-md border-[#e8e0d6] bg-[#f9f7f2] px-3 text-sm focus-visible:border-[#4a0e0e]/40 focus-visible:ring-[#e0004d]/20"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email" className="text-sm font-medium text-[#1f1a1a]">
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className="h-11 rounded-md border-[#e8e0d6] bg-[#f9f7f2] px-3 text-sm focus-visible:border-[#4a0e0e]/40 focus-visible:ring-[#e0004d]/20"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-subject" className="text-sm font-medium text-[#1f1a1a]">
                    Topic
                  </Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    placeholder="e.g. Guest post pitch — Q2 retail trends"
                    className="h-11 rounded-md border-[#e8e0d6] bg-[#f9f7f2] px-3 text-sm focus-visible:border-[#4a0e0e]/40 focus-visible:ring-[#e0004d]/20"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-body" className="text-sm font-medium text-[#1f1a1a]">
                    Message
                  </Label>
                  <Textarea
                    id="contact-body"
                    name="message"
                    placeholder="Context, links to drafts or published URLs, and your preferred follow-up window."
                    rows={6}
                    className="resize-y rounded-md border-[#e8e0d6] bg-[#f9f7f2] px-3 py-3 text-sm focus-visible:border-[#4a0e0e]/40 focus-visible:ring-[#e0004d]/20"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <Button
                    type="submit"
                    className="rounded-md bg-[#e0004d] px-6 font-semibold text-white shadow-sm hover:bg-[#c40043]"
                  >
                    Send message
                  </Button>
                  <Link
                    href="/updates"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#4a0e0e] hover:text-[#e0004d]"
                  >
                    Browse media
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
