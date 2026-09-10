import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatPhone } from '../utils/formatters';
import { useMutation } from '@tanstack/react-query';

const formUrl = 'https://formspree.io/f/mwlkylpb';

async function sendContactEmail(formData: { name: string; phone: string; email: string; message: string }) {
  const response = await fetch(formUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Comunication with server failed.');
  }

  return response.json();
}

export function Contact() {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    message: false,
  });

  const isNameValid = name.trim().length >= 3;
  const isPhoneValid = phone.replace(/\D/g, '').length >= 10;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isMessageValid = message.trim().length >= 3;

  const isFormValid = isNameValid && isPhoneValid && isEmailValid && isMessageValid;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleBlur = (field: 'name' | 'phone' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const mutation = useMutation({
    mutationFn: sendContactEmail,
    onSuccess: () => {
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setTouched({ name: false, phone: false, email: false, message: false });
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      const timer = setTimeout(() => {
        mutation.reset();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [mutation.isSuccess, mutation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || mutation.isPending) return;

    mutation.mutate({ name, phone, email, message });
  };

  return (
    <section id="contato" className="py-24 md:py-32 bg-surface-sec">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">       
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">       
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-brand-primary"></span>
              <span className="font-subtitle text-brand-primary tracking-widest uppercase text-xs font-semibold">
                {t('contact.label')}
              </span>
            </div>           
            <h2 className="font-title text-5xl md:text-6xl text-brand-dark leading-[1.1] mb-6">
              {t('contact.title')}
            </h2>           
            <p className="font-text text-ink-muted text-lg leading-relaxed max-w-md">
              {t('contact.subtitle')}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-surface-main p-8 md:p-12 rounded-2xl shadow-sm border border-brand-light/40"
          >
            <form onSubmit={handleSubmit} action={formUrl} className="flex flex-col gap-8" noValidate>
              <div className="relative flex flex-col gap-1.5">
                <input 
                  type="text" 
                  id="name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder={t('contact.form.name')}
                  className={`w-full bg-surface-sec/50 border-b-2 py-3 px-4 font-text text-ink-main placeholder:text-ink-muted/50 focus:outline-none transition-colors rounded-t-md ${
                    touched.name && !isNameValid 
                      ? 'border-red-400 bg-red-50/30' 
                      : 'border-brand-light/60 focus:border-brand-primary focus:bg-surface-sec'
                  }`}
                />
                {touched.name && !isNameValid && (
                  <span className="text-xs text-red-500 font-text">
                    {t('contact.form.errors.name')}
                  </span>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative flex flex-col gap-1.5">
                  <input 
                    type="tel" 
                    id="phone"
                    value={phone}
                    name="phone"
                    onChange={handlePhoneChange}
                    onBlur={() => handleBlur('phone')}
                    placeholder={t('contact.form.phone')}
                    maxLength={15}
                    className={`w-full bg-surface-sec/50 border-b-2 py-3 px-4 font-text text-ink-main placeholder:text-ink-muted/50 focus:outline-none transition-colors rounded-t-md ${
                      touched.phone && !isPhoneValid 
                        ? 'border-red-400 bg-red-50/30' 
                        : 'border-brand-light/60 focus:border-brand-primary focus:bg-surface-sec'
                    }`}
                  />
                  {touched.phone && !isPhoneValid && (
                    <span className="text-xs text-red-500 font-text">
                      {t('contact.form.errors.phone')}
                    </span>
                  )}
                </div>              
                <div className="relative flex flex-col gap-1.5">
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder={t('contact.form.email')}
                    className={`w-full bg-surface-sec/50 border-b-2 py-3 px-4 font-text text-ink-main placeholder:text-ink-muted/50 focus:outline-none transition-colors rounded-t-md ${
                      touched.email && !isEmailValid 
                        ? 'border-red-400 bg-red-50/30' 
                        : 'border-brand-light/60 focus:border-brand-primary focus:bg-surface-sec'
                    }`}
                  />
                  {touched.email && !isEmailValid && (
                    <span className="text-xs text-red-500 font-text">
                      {t('contact.form.errors.email')}
                    </span>
                  )}
                </div>
              </div>
              <div className="relative flex flex-col gap-1.5">
                <textarea 
                  id="message"
                  value={message}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => handleBlur('message')}
                  rows={3}
                  placeholder={t('contact.form.message')}
                  className={`w-full bg-surface-sec/50 border-b-2 py-3 px-4 font-text text-ink-main placeholder:text-ink-muted/50 focus:outline-none transition-colors resize-none rounded-t-md ${
                    touched.message && !isMessageValid 
                      ? 'border-red-400 bg-red-50/30' 
                      : 'border-brand-light/60 focus:border-brand-primary focus:bg-surface-sec'
                  }`}
                ></textarea>
                {touched.message && !isMessageValid && (
                  <span className="text-xs text-red-500 font-text">
                    {t('contact.form.errors.message')}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-col gap-4">
                <button 
                  type="submit"
                  disabled={!isFormValid || mutation.isPending || mutation.isSuccess}
                  className="group flex items-center justify-center gap-3 bg-brand-dark text-surface-main px-8 py-4 rounded-full font-text text-sm uppercase tracking-wide hover:bg-brand-primary transition-colors duration-300 w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
                >
                  {mutation.isPending ? (
                    <span className="animate-pulse">{t('contact.form.loading')}</span>
                  ) : mutation.isSuccess ? (
                    <>
                      {t('contact.form.sent')} <CheckCircle2 size={16} className="text-surface-main" />
                    </>
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                {mutation.isSuccess && (
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-text text-sm text-brand-primary font-medium"
                  >
                    {t('contact.form.success')}
                  </motion.p>
                )}
                {mutation.isError && (
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-text text-sm text-red-500 font-medium flex items-center gap-1.5"
                  >
                    <AlertCircle size={16} />
                    {t('contact.form.failed')}
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}