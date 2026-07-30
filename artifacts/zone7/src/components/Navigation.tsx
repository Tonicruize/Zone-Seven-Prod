import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import logo from '@assets/ZONE_7_ellipse_nu_1785236361747.png';
import { MagneticButton } from './MagneticButton';

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z"/>
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/zone7rf',
    icon: <IconInstagram />,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@zone7_productions',
    icon: <IconTikTok />,
  },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { name: 'WORK',     href: '/work',   isAnchor: false },
    { name: 'SERVICES', href: isHome ? '#services' : '/#services', isAnchor: true  },
    { name: 'BEATS',    href: '/beats',   isAnchor: false },
    { name: 'ABOUT',    href: '/about',   isAnchor: false },
    { name: 'CONTACT',  href: '/book',    isAnchor: false },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out
          ${scrolled ? 'bg-background/85 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}
        `}
      >
        <div className="px-6 md:px-12 flex items-center justify-between h-[72px] md:h-[80px]">

          {/* Logo */}
          <Link href="/" className="interactive outline-none flex items-center" data-testid="link-logo">
            <img
              src={logo}
              alt="Zone7"
              className="h-20 md:h-24 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = !link.isAnchor && location === link.href;
              const cls = `relative text-display text-[10px] tracking-[0.25em] uppercase transition-colors duration-300
                ${isActive ? 'text-primary' : 'text-foreground/60 hover:text-foreground'}`;

              return link.isAnchor ? (
                <a key={link.name} href={link.href} className={cls}>
                  {link.name}
                  {isActive && <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />}
                </a>
              ) : (
                <Link key={link.name} href={link.href} className={cls}>
                  {link.name}
                  {isActive && <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />}
                </Link>
              );
            })}
          </div>

          {/* Right side: socials + cart + Book + hamburger */}
          <div className="flex items-center gap-3 md:gap-4">

            {/* Social icons — desktop only */}
            <div className="hidden md:flex items-center gap-3 mr-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="interactive flex items-center justify-center w-8 h-8
                    text-foreground/40 hover:text-primary transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
              {/* Cart icon — after socials, before divider */}
              <a
                href="https://zone7-fashion.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shop"
                className="interactive flex items-center justify-center w-8 h-8
                  text-foreground/40 hover:text-primary transition-colors duration-300"
              >
                <IconCart />
              </a>
              {/* Thin divider */}
              <div className="w-px h-4 bg-foreground/15 mx-1" />
            </div>

            {/* Cart icon — mobile, always visible */}
            <a
              href="https://zone7-fashion.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shop"
              className="md:hidden interactive flex items-center justify-center w-9 h-9
                text-foreground/40 hover:text-primary transition-colors duration-300"
            >
              <IconCart />
            </a>

            <MagneticButton
              href="/book"
              className="interactive hidden md:flex border border-primary/60 text-foreground/80 bg-transparent
                px-7 py-2.5 text-display text-[9px] tracking-[0.25em] uppercase
                hover:bg-primary/10 hover:border-primary hover:text-foreground
                transition-all duration-300"
            >
              <motion.span
                animate={{ textShadow: ['0 0 0px rgba(212,180,131,0)', '0 0 10px rgba(212,180,131,0.5)', '0 0 0px rgba(212,180,131,0)'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                BOOK
              </motion.span>
            </MagneticButton>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 interactive"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-5 h-px bg-foreground origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-px bg-foreground origin-center"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-5 h-px bg-foreground origin-center"
              />
            </button>
          </div>
        </div>

        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            style={{ originX: 0.5 }}
          />
        )}
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl flex flex-col pt-[88px] px-8 pb-12"
          >
            <nav className="flex flex-col gap-1 flex-1 justify-center -mt-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.isAnchor ? (
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 text-display text-4xl font-bold uppercase tracking-tight
                        text-foreground/50 hover:text-primary transition-colors duration-300 border-b border-white/5"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block py-4 text-display text-4xl font-bold uppercase tracking-tight
                        border-b border-white/5 transition-colors duration-300
                        ${location === link.href ? 'text-primary' : 'text-foreground/50 hover:text-primary'}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Bottom: socials + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-5"
            >
              {/* Social links */}
              <div className="flex items-center gap-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive flex items-center gap-2 text-foreground/40 hover:text-primary transition-colors duration-300"
                  >
                    {s.icon}
                    <span className="text-[9px] tracking-[0.3em] uppercase">{s.label}</span>
                  </a>
                ))}
              </div>

              <Link
                href="/book"
                className="block w-full text-center border border-primary text-foreground py-4
                  text-display text-xs tracking-[0.3em] uppercase hover:bg-primary/10 transition-colors duration-300"
              >
                BOOK A PROJECT
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
