import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const IMAGES = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
];

export function About() {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="sobre" className="relative w-full min-h-screen bg-brand-dark flex items-center overflow-hidden">
      <div className="absolute inset-0 md:left-1/3 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentImage}
            src={IMAGES[currentImage]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent pointer-events-none"></div>
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-24 md:py-32">
        <div className="max-w-2xl">         
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-subtitle text-brand-primary tracking-widest uppercase text-xs mb-4">
              {t('about.crn')}
            </p>
            <h2 className="font-title text-4xl md:text-5xl lg:text-6xl text-surface-main leading-tight mb-6">
              {t('about.title')}
            </h2>
            <p className="font-title text-xl md:text-2xl text-brand-light italic mb-10 border-l-2 border-brand-primary pl-4">
              {t('about.tagline')}
            </p>
            <div className="space-y-6 font-text text-brand-light/80 text-base md:text-lg leading-relaxed">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}