import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2] text-[#1f1a1a]">
      <NavbarShell />
      <main className="mx-auto max-w-lg px-4 py-20 sm:py-24">
        <div className="rounded-2xl border border-[#e8e0d6] bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e0004d]">Create account</p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Public registration is not available</h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            Guest posts are coordinated directly with the editorial team. Use contact to share a pitch or ask about
            placement—not a self-serve signup.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/updates"
              className="inline-flex justify-center rounded-md border border-[#e8e0d6] bg-[#f9f7f2] px-5 py-2.5 text-sm font-semibold transition hover:border-[#4a0e0e]/30"
            >
              Browse media
            </Link>
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-md bg-[#e0004d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c40043]"
            >
              Pitch a guest post
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
