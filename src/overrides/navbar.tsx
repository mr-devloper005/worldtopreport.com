'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const NAVBAR_OVERRIDE_ENABLED = true

const navGroups = [
  { label: 'Features', href: '/#platform' },
  { label: 'Media', href: '/updates' },
  { label: 'Resources', href: '/#resources' },
]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#4a0e0e] text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-6 lg:flex-initial">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${SITE_CONFIG.name} home`}>
            <span
              className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/25 bg-white/10 shadow-sm ring-1 ring-black/10"
              aria-hidden
            >
              <Image
                src="/favicon.png"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="truncate text-lg font-semibold tracking-tight">{SITE_CONFIG.name}</span>
          </Link>
          <Link
            href="/contact"
            className="hidden text-[13px] text-white/75 underline-offset-4 hover:text-white hover:underline lg:inline"
          >
            Guest post enquiries
          </Link>
        </div>

        <nav className="hidden items-center gap-1 xl:flex">
          {navGroups.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
              <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-[#e0004d] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c40043] hover:shadow-md"
          >
            Pitch a guest post
          </Link>
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-white/90 hover:bg-white/10 xl:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#3a0b0b] px-4 py-4 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:px-2">
            <Link href="/contact" className="py-2 text-sm text-white/80" onClick={() => setOpen(false)}>
              Guest post enquiries
            </Link>
            {navGroups.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-md px-2 py-3 text-sm font-medium text-white hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
                <ChevronDown className="h-4 w-4 -rotate-90 opacity-50" aria-hidden />
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 rounded-md bg-[#e0004d] py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Pitch a guest post
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
