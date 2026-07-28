import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import logo from '@assets/ZONE_7_ellipse_nu_1785236361747.png';
import { MagneticButton } from './MagneticButton';

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

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { name: 'WORK',     href: isHome ? '#work'     : '/#work',     isAnchor: true  },
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
              className="h-14 md:h-16 w-auto object-contain"
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
                <a key={link.name} href={link.href} className={cls}
                  data-testid={`link-nav-${link.name.toLowerCase()}`}>
                  {link.name}
                  {isActive && <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />}
                </a>
              ) : (
                <Link key={link.name} href={link.href} className={cls}
                  data-testid={`link-nav-${link.name.toLowerCase()}`}>
                  {link.name}
                  {isActive && <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />}
                </Link>
              );
            })}
          </div>

          {/* Right side: Book button + mobile hamburger */}
          <div className="flex items-center gap-4">
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

        {/* Gold accent line under scrolled nav */}
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

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
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
