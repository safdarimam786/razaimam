import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Contact', href: '#contact' }
];

function scrollToSection(event, href) {
  event.preventDefault();
  const target = document.querySelector(href);
  if (!target) return;

  if (window.lenis) {
    window.lenis.scrollTo(target);
    return;
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (event, href) => {
    scrollToSection(event, href);
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-3 sm:px-8 lg:px-16">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between">
        <a
          href="#hero"
          className="nav-logo-mark liquid-nav-glass"
          onClick={(event) => scrollToSection(event, '#hero')}
          aria-label="Go to home"
        >
          RI
        </a>

        <div className="liquid-nav-glass nav-center-pill hidden items-center px-1.5 py-1.5 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-center-link px-3 py-2 text-sm font-medium text-white/90"
              onClick={(event) => scrollToSection(event, item.href)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-claim-button ml-1 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
            onClick={(event) => scrollToSection(event, '#contact')}
          >
            Claim a Spot
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>
        </div>

        <button
          className="nav-hamburger liquid-nav-glass md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden w-12 shrink-0 md:block" aria-hidden="true" />
      </nav>

      {menuOpen && (
        <div className="nav-mobile-menu liquid-nav-glass mx-auto mt-3 max-w-7xl md:hidden">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-mobile-link"
              onClick={(event) => handleNavClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-claim-button-mobile"
            onClick={(event) => handleNavClick(event, '#contact')}
          >
            Claim a Spot
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>
        </div>
      )}
    </header>
  );
}
