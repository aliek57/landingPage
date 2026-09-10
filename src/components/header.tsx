import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WHATSAPP_LINK = "https://wa.me/5518981801473?text=Oii!%20Gostaria%20de%20agendar%20uma%20consulta.";

export function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('header.about'), href: '#sobre' },
    { name: t('header.method'), href: '#metodo' },
    { name: t('header.results'), href: '#resultados' },
    { name: t('header.contact'), href: '#contato' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elem.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 pointer-events-none mt-4 md:mt-6">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ${
            scrolled 
              ? "w-full max-w-5xl bg-surface-main/85 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-brand-light/50 py-3 px-6 md:px-8 rounded-full"
              : "w-full max-w-[1440px] bg-transparent py-4 px-2 md:px-8 lg:px-12 rounded-none border-transparent"
          }`}
        >
          <a 
            href="#" 
            onClick={(e) => handleSmoothScroll(e, '#')}
            className="flex items-center gap-1 group"
          >
            <span className="font-title text-2xl text-brand-dark tracking-tight transition-colors group-hover:text-brand-primary">
              {t('header.logo')}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-3 transition-transform group-hover:scale-150"></span>
          </a>         
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="relative text-sm font-text text-ink-muted hover:text-brand-dark transition-colors py-2 group cursor-pointer"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-1/2 w-1 h-1 bg-brand-primary rounded-full opacity-0 -translate-x-1/2 transition-all group-hover:opacity-100 group-hover:bottom-0"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:block">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-brand-dark text-surface-main px-6 py-2.5 rounded-full font-text text-sm hover:bg-brand-primary transition-colors duration-300"
            >
              {t('header.button')}
              <ArrowRight size={16} />
            </a>
          </div>         
          <button 
            className="md:hidden text-brand-dark p-2 -mr-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </motion.header>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-ink-main/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-surface-main z-[70] p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-surface-sec rounded-full text-ink-muted hover:text-brand-dark cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-2xl font-title text-ink-main hover:text-brand-primary transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center gap-2 bg-brand-dark text-surface-main px-6 py-4 rounded-full font-text hover:bg-brand-primary transition-colors"
                >
                  {t('header.button')}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}