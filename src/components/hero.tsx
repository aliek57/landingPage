import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const elem = document.getElementById('contato');
    if (elem) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elem.getBoundingClientRect().top;
      window.scrollTo({ top: (elementRect - bodyRect) - offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden bg-surface-main">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-brand-primary"></span>
            <span className="font-subtitle text-brand-primary tracking-widest uppercase text-xs font-semibold">
              {t('hero.label')}
            </span>
          </div>
          <h1 className="font-title text-5xl md:text-6xl lg:text-7xl text-brand-dark font-medium leading-[1.1] mb-6">
            {t('hero.title_1')} <br className="hidden md:block" />
            <span className="italic text-brand-primary">{t('hero.title_highlight')}</span>
            <br className="hidden md:block" />
            {t('hero.title_2')}
          </h1>
          <p className="font-text text-ink-muted text-lg leading-relaxed max-w-md mb-10">
            {t('hero.subtitle')}
          </p>
          <motion.button 
            onClick={scrollToContact}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 bg-brand-primary text-surface-main px-8 py-4 rounded-full font-text text-sm uppercase tracking-wide hover:bg-brand-dark transition-colors duration-300 shadow-lg shadow-brand-primary/20 cursor-pointer"
          >
            {t('hero.cta')}
            <span className="bg-surface-main/20 p-1.5 rounded-full transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </motion.button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative h-[50vh] md:h-[65vh] w-full"
        >
          <div className="absolute inset-0 rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              className="object-cover w-full h-full object-top"
            />
            <div className="absolute inset-0 bg-brand-dark/10 mix-blend-multiply"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}