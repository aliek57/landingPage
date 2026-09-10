import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Minus, Sparkles } from 'lucide-react';

type ServiceData = {
  title: string;
  p1: string;
  p2: string;
  p3: string;
  benefitsTitle: string;
  benefits: string[];
  footer: string;
};

function ServiceAccordion({ 
  number, 
  data, 
  isOpen, 
  onClick 
}: { 
  number: string, 
  data: ServiceData, 
  isOpen: boolean, 
  onClick: () => void 
}) {
  return (
    <div className="border-b border-brand-light/40">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-8 group text-left cursor-pointer"
      >
        <div className="flex items-baseline gap-6 md:gap-12">
          <span className="font-text text-brand-primary/50 text-sm md:text-lg">
            {number}
          </span>
          <h3 className="font-title text-3xl md:text-5xl text-brand-dark group-hover:text-brand-primary transition-colors duration-300">
            {data.title}
          </h3>
        </div>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-brand-dark bg-brand-light/20 p-3 rounded-full group-hover:bg-brand-light/50 transition-colors"
        >
          {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-12 pt-4 grid lg:grid-cols-2 gap-12 lg:gap-24">
              <div className="space-y-6 font-text text-ink-muted leading-relaxed">
                <p>{data.p1}</p>
                <p>{data.p2}</p>
                <p>{data.p3}</p>
                <p className="font-medium text-brand-primary italic pt-4 border-t border-brand-light/30">
                  {data.footer}
                </p>
              </div>
              <div className="bg-surface-main p-8 md:p-10 border border-brand-light/50 shadow-sm">
                <h4 className="font-subtitle text-brand-dark tracking-wide uppercase text-sm mb-8">
                  {data.benefitsTitle}
                </h4>
                <ul className="space-y-4">
                  {data.benefits.map((benefit, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="flex items-start gap-4 font-text text-ink-main text-sm md:text-base leading-relaxed"
                    >
                      <Sparkles className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Services() {
  const { t } = useTranslation();

  const [openSection, setOpenSection] = useState<string | null>(null);
  const presentialData = t('services.presential', { returnObjects: true }) as ServiceData;
  const onlineData = t('services.online', { returnObjects: true }) as ServiceData;

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <section id="metodo" className="py-24 md:py-32 bg-surface-sec">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-brand-primary"></span>
            <span className="font-subtitle text-brand-primary tracking-widest uppercase text-xs font-semibold">
              {t('services.label')}
            </span>
          </div>
          <h2 className="font-title text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-tight max-w-2xl">
            {t('services.title')}
          </h2>
        </motion.div>
        <div className="border-t border-brand-light/40">
          <ServiceAccordion 
            number="01" 
            data={presentialData} 
            isOpen={openSection === 'presential'} 
            onClick={() => toggleSection('presential')} 
          />
          <ServiceAccordion 
            number="02" 
            data={onlineData} 
            isOpen={openSection === 'online'} 
            onClick={() => toggleSection('online')} 
          />
        </div>
      </div>
    </section>
  );
}