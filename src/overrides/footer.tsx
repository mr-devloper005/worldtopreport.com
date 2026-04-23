import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const footerNav = [
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
]

export function FooterOverride() {
  return (
    <footer className="border-t border-[#4a0e0e]/20 bg-[#4a0e0e] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-start lg:justify-between lg:gap-12 lg:px-8 lg:py-14">
        <div className="max-w-md">
          <p className="text-lg font-semibold tracking-tight">{SITE_CONFIG.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{SITE_CONFIG.description}</p>
        </div>
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
