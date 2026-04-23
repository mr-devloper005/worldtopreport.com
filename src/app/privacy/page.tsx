import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const toc = [
  { id: 'overview', label: 'Overview' },
  { id: 'collect', label: 'What we collect' },
  { id: 'use', label: 'How we use data' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'sharing', label: 'Sharing' },
  { id: 'retention', label: 'Retention' },
  { id: 'rights', label: 'Your rights' },
  { id: 'children', label: 'Children' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact' },
] as const

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f9f7f2] text-[#1f1a1a]">
      <NavbarShell />

      <section className="relative overflow-hidden bg-[#4a0e0e] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(224,0,77,0.15),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/70">Legal</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">Privacy policy</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">
            How {SITE_CONFIG.name} handles information when you read our catalog, contact editorial, or use public pages
            on this site.
          </p>
          <p className="mt-6 text-sm text-white/60">Last updated: April 23, 2026</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <nav
          aria-label="Privacy policy sections"
          className="sticky top-[72px] z-10 -mx-1 mb-12 overflow-x-auto rounded-xl border border-[#e8e0d6] bg-white/95 px-3 py-3 shadow-sm backdrop-blur sm:px-4"
        >
          <ul className="flex min-w-max gap-1 sm:flex-wrap sm:gap-2">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex rounded-md px-3 py-1.5 text-xs font-medium text-neutral-600 transition hover:bg-[#f9f7f2] hover:text-[#e0004d] sm:text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-auto max-w-3xl space-y-10">
          <section id="overview" className="scroll-mt-28 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-[#1f1a1a]">Overview</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              This policy describes the kinds of information we may process when you visit {SITE_CONFIG.name}, read
              guest posts in our media catalog, or contact us by email. It is meant to be readable and practical—not a
              substitute for legal advice tailored to your situation.
            </p>
          </section>

          <section id="collect" className="scroll-mt-28 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-[#1f1a1a]">What we collect</h2>
            <ul className="mt-4 list-inside list-disc space-y-3 text-sm leading-relaxed text-neutral-600">
              <li>
                <span className="font-medium text-[#1f1a1a]">Technical data:</span> standard server and analytics signals
                such as approximate location (from IP), device type, browser, pages viewed, and timestamps—used to run
                and secure the site.
              </li>
              <li>
                <span className="font-medium text-[#1f1a1a]">Information you send us:</span> when you email editorial or
                use a contact form, we receive the contents of your message and your email address (and any other fields you
                choose to provide).
              </li>
              <li>
                <span className="font-medium text-[#1f1a1a]">Published content:</span> guest posts and media pages are
                public; do not include sensitive personal data in material you submit for publication unless necessary
                and lawful.
              </li>
            </ul>
          </section>

          <section id="use" className="scroll-mt-28 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-[#1f1a1a]">How we use data</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              We use the information above to operate and improve {SITE_CONFIG.name}, respond to enquiries, fix errors,
              detect abuse, and understand aggregate readership patterns. We do not sell your personal information as
              traditionally defined; where we use vendors (e.g. hosting or analytics), they process data on our
              instructions and for operational purposes.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-28 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-[#1f1a1a]">Cookies & similar technologies</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              We may use cookies or local storage for essential site functionality, preferences, and limited measurement.
              You can control cookies through your browser settings; disabling some cookies may affect how certain features
              behave.
            </p>
          </section>

          <section id="sharing" className="scroll-mt-28 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-[#1f1a1a]">Sharing</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              We may disclose information if required by law, to protect rights and safety, or in connection with a
              business transfer (such as a merger) where the successor is bound by appropriate confidentiality obligations.
              Public guest post pages are visible to anyone on the internet by design.
            </p>
          </section>

          <section id="retention" className="scroll-mt-28 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-[#1f1a1a]">Retention</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              We keep operational logs and correspondence for as long as needed for the purposes above, unless a longer
              period is required by law. Published articles may remain available in the public catalog unless removed
              for editorial or legal reasons.
            </p>
          </section>

          <section id="rights" className="scroll-mt-28 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-[#1f1a1a]">Your rights</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing
              of your personal data, or to object to processing. To exercise these rights, contact us using the details at
              the end of this page. We may need to verify your request.
            </p>
          </section>

          <section id="children" className="scroll-mt-28 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-[#1f1a1a]">Children</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {SITE_CONFIG.name} is not directed at children under 13 (or the minimum age in your jurisdiction). We do not
              knowingly collect personal information from children for marketing purposes.
            </p>
          </section>

          <section id="changes" className="scroll-mt-28 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-[#1f1a1a]">Changes to this policy</h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              We may update this page from time to time. The “Last updated” date at the top will change when we make
              material revisions. Continued use of the site after changes means you accept the updated policy.
            </p>
          </section>

          <section
            id="contact"
            className="scroll-mt-28 rounded-xl border border-[#4a0e0e]/20 bg-[#4a0e0e] p-6 text-white shadow-md sm:p-8"
          >
            <h2 className="text-lg font-semibold">Questions about privacy?</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Email the desk that handles your request (editorial vs general) from our contact page—we will route privacy
              questions appropriately.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-md bg-[#e0004d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c40043]"
            >
              Go to contact
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
