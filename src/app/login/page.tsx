import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2] text-[#1f1a1a]">
      <NavbarShell />
      <main className="mx-auto max-w-lg px-4 py-20 sm:py-24">
        <div className="rounded-2xl border border-[#e8e0d6] bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e0004d]">Sign-in</p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">This site does not offer public accounts</h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            {`${SITE_CONFIG.name} is a guest post catalog. Browsing the media library and reading posts never requires a login.`}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex justify-center rounded-md border border-[#e8e0d6] bg-[#f9f7f2] px-5 py-2.5 text-sm font-semibold transition hover:border-[#4a0e0e]/30"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex justify-center rounded-md bg-[#e0004d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c40043]"
            >
              Contact editorial
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
