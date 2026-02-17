'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/map', label: 'Map', icon: '🗺️' },
    { href: '/properties', label: 'Properties', icon: '🏠' },
    { href: '/list', label: 'List Property', icon: '➕' },
  ]

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'white',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #1a3a5c, #2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
            }}>🏛️</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 17, color: '#0f172a', letterSpacing: '-0.02em' }}>Praedex</div>
              <div style={{ fontSize: 10, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: -2 }}>Holdings</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="desktop-nav">
            {links.slice(0, 2).map(({ href, label }) => (
              <Link key={href} href={href} style={{
                textDecoration: 'none', padding: '8px 16px', borderRadius: 8,
                fontSize: 14, fontWeight: 500,
                color: pathname === href ? '#2563eb' : '#374151',
                background: pathname === href ? '#eff6ff' : 'transparent',
                transition: 'all 0.2s',
              }}>
                {label}
              </Link>
            ))}
            <Link href="/list" style={{
              textDecoration: 'none', padding: '9px 20px', borderRadius: 8,
              fontSize: 14, fontWeight: 600, color: 'white',
              background: 'linear-gradient(135deg, #1a3a5c, #2563eb)',
              boxShadow: '0 2px 8px rgba(37,99,235,0.3)', marginLeft: 8,
            }}>
              List Property
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <div style={{ width: 22, height: 2, background: '#374151', marginBottom: 5, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <div style={{ width: 22, height: 2, background: '#374151', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'all 0.2s' }} />
            <div style={{ width: 22, height: 2, background: '#374151', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div style={{ borderTop: '1px solid #e5e7eb', background: 'white', padding: '12px 24px 20px' }}>
            {links.map(({ href, label, icon }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 0', borderBottom: '1px solid #f1f5f9',
                color: pathname === href ? '#2563eb' : '#374151', fontWeight: 500, fontSize: 15,
              }}>
                <span style={{ fontSize: 18 }}>{icon}</span>{label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <div className="mobile-bottom-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid #e5e7eb', display: 'flex',
        padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}>
        {[{ href: '/', label: 'Home', icon: '🏛️' }, ...links].map(({ href, label, icon }) => (
          <Link key={href} href={href} style={{
            flex: 1, textDecoration: 'none', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4, padding: '4px 8px',
            color: pathname === href ? '#2563eb' : '#94a3b8',
          }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600 }}>{label}</span>
          </Link>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        .mobile-bottom-nav { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-bottom-nav { display: flex !important; }
          body { padding-bottom: 70px; }
        }
      `}</style>
    </>
  )
}
