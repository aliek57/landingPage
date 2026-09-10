import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/5518981801473?text=Oii!%20Gostaria%20de%20agendar%20uma%20consulta.";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socials = [
    { name: 'Instagram', url: 'https://www.instagram.com/nutrirenatalemos' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@nutrirenatalemos' },
    { name: 'WhatsApp', url: WHATSAPP_LINK },
  ];

  return (
    <footer className="bg-brand-dark text-surface-main py-16 border-t border-brand-light/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          <div className="flex flex-col items-start">
            <h4 className="font-subtitle text-brand-primary tracking-widest uppercase text-xs font-semibold mb-4">
              {t('footer.contactLabel')}
            </h4>
            <a 
              href="mailto:renatafabrislemos@gmail.com" 
              className="font-text text-base hover:text-brand-primary transition-colors duration-300 mb-1"
            >
              {t('footer.email')}
            </a>
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-text text-base hover:text-brand-primary transition-colors duration-300 flex items-center gap-1.5 group"
            >
              {t('footer.phone')}
              <ArrowUpRight size={14} className="text-brand-primary/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="font-subtitle text-brand-primary tracking-widest uppercase text-xs font-semibold mb-4">
              {t('footer.addressLabel')}
            </h4>
            <p className="font-text text-base text-brand-light/80 leading-relaxed whitespace-pre-line">
              {t('footer.address')}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="font-subtitle text-brand-primary tracking-widest uppercase text-xs font-semibold mb-4">
              {t('footer.socialsLabel')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {socials.map((social) => (
                <li key={social.name}>
                  <a 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-text text-base text-surface-main hover:text-brand-primary transition-colors duration-300 flex items-center gap-1.5 group"
                  >
                    {social.name}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 text-brand-primary group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-brand-light/10 font-text text-xs text-brand-light/40">
          <p>
            {t('footer.rights', { year: currentYear})}
          </p>
          
          <p className="flex items-center gap-1">
            {t('footer.credits')}
          </p>
        </div>
      </div>
    </footer>
  );
}