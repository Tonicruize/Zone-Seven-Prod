import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import logo from '@assets/new_z7_logo_1785000827821.png';
import { MagneticButton } from './MagneticButton';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Anchor links go to home page anchors; page links use wouter
  const navLinks = [
    { name: 'WORK', href: isHome ? '#work' : '/#work', isAnchor: true },
    { name: 'SERVICES', href: isHome ? '#services' : '/#services', isAnchor: true },
    { name: 'BEATS', href: '/beats', isAnchor: false },
    { name: 'ABOUT', href: '/about', isAnchor: false },
    { name: 'CONTACT', href: '/book', isAnchor: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out px-6 md:px-12 flex items-center justify-between ${
        scrolled ? 'bg-background/80 backdrop-blur-md py-4' : 'bg-transparent py-8'
      }`}
    >
      <Link href="/" className="interactive outline-none" data-testid="link-logo">
        <img src={logo} alt="Zone7 Logo" className="h-8 object-contain" />
      </Link>

      <div className="hidden md:flex items-center gap-10 text-display text-sm tracking-[0.2em] text-foreground">
        {navLinks.map((link) =>
          link.isAnchor ? (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-primary transition-colors duration-300"
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-primary transition-colors duration-300 ${
                location === link.href ? 'text-primary' : ''
              }`}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </Link>
          )
        )}
      </div>

      <MagneticButton
        href="/book"
        className="interactive block border border-primary text-foreground bg-transparent px-8 py-3 text-display text-xs tracking-[0.2em] uppercase hover:bg-primary/10 transition-colors duration-300"
      >
        <motion.span
          animate={{
            textShadow: [
              '0 0 0px rgba(212, 180, 131, 0)',
              '0 0 10px rgba(212, 180, 131, 0.5)',
              '0 0 0px rgba(212, 180, 131, 0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          BOOK
        </motion.span>
      </MagneticButton>
    </motion.nav>
  );
}
