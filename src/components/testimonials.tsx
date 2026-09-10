import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Testimonial = { quote: string; author: string; image: string; alt?: string };

const CELL = 140;
const GAP = 12;
const STEP = 3 * (CELL + GAP);
const EXIT_MS = 240;
const SLIDE_MS = 800;
const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-2xl border border-brand-light/30 bg-surface-sec opacity-40 blur-[1px]"
      style={{ width: CELL, height: CELL }}
    />
  );
}

function Featured({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-2xl border border-brand-light shadow-xl"
      style={{ width: CELL, height: CELL }}
    >
      <img
        src={src}
        alt={alt ?? "Foto de paciente"}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply pointer-events-none" />
    </div>
  );
}

function Chars({ text, startIndex, staggerMs }: { text: string; startIndex: number; staggerMs: number }) {
  let idx = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span key={ci} className="scroll-reel-char" style={{ animationDelay: `${delay}ms` }}>
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t('testimonials.list', { returnObjects: true }) as Testimonial[];
  const charStaggerMs = 8;

  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const animating = useRef(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const count = testimonials.length;

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => {
      cancelAnimationFrame(raf);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const paginate = useCallback((dir: 1 | -1) => {
    if (animating.current) return;
    const next = index + dir;
    if (next < 0 || next >= count) return;
    animating.current = true;
    setIndex(next);
    setExiting(true);

    timeouts.current.push(setTimeout(() => {
      setDisplayIndex(next);
      setExiting(false);
    }, EXIT_MS));
    timeouts.current.push(setTimeout(() => {
      animating.current = false;
    }, SLIDE_MS));
  }, [index, count]);

  const middleItems = useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    testimonials.forEach((_, i) => {
      items.push({ type: "featured", i });
      if (i < count - 1) items.push({ type: "cell" }, { type: "cell" });
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [testimonials, count]);

  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY;
  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });
  const current = testimonials[displayIndex];

  return (
    <section id="resultados" className="py-24 md:py-32 bg-surface-main overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-brand-primary"></span>
            <span className="font-subtitle text-brand-primary tracking-widest uppercase text-xs font-semibold">
              {t('testimonials.label')}
            </span>
            <span className="w-8 h-[1px] bg-brand-primary"></span>
          </div>
          <h2 className="font-title text-4xl md:text-5xl text-brand-dark max-w-2xl">
            {t('testimonials.title')}
          </h2>
        </motion.div>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-12 lg:flex-row lg:gap-20">
          <div 
            className="relative h-64 w-full shrink-0 overflow-hidden lg:h-[450px] lg:w-[450px]"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center gap-4">
              <div className="hidden lg:flex shrink-0 flex-col gap-3" style={colStyle(sideY)}>
                {Array.from({ length: 4 + 2 * count }).map((_, i) => <Cell key={i} />)}
              </div>
              <div className="flex shrink-0 flex-col gap-3" style={colStyle(middleY)}>
                {middleItems.map((item, i) => item.type === "featured" ? (
                  <Featured key={i} src={testimonials[item.i].image} />
                ) : <Cell key={i} />)}
              </div>
              <div className="hidden lg:flex shrink-0 flex-col gap-3" style={colStyle(sideY)}>
                {Array.from({ length: 4 + 2 * count }).map((_, i) => <Cell key={i} />)}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full max-w-lg justify-center relative">
            <Quote className="h-10 w-10 text-brand-primary/20 mb-6" fill="currentColor" />            
            <div className="relative min-h-[180px] w-full" aria-live="polite">
              <div aria-hidden="true" className="invisible flex flex-col gap-6">
                <p className="font-title text-2xl md:text-3xl leading-relaxed">{current.quote}</p>
                <p className="font-text text-sm uppercase tracking-widest">{current.author}</p>
              </div>
              <div key={displayIndex} className={cn("absolute inset-0 flex flex-col gap-6", exiting && "scroll-reel-exit")}>
                <p className="font-title text-2xl md:text-3xl text-brand-dark leading-relaxed">
                  <Chars text={current.quote} startIndex={0} staggerMs={charStaggerMs} />
                </p>
                <p className="font-text text-sm uppercase tracking-widest text-ink-muted">
                  <Chars text={current.author} startIndex={current.quote.length} staggerMs={charStaggerMs} />
                </p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-brand-light/30 pt-6">
              <button
                onClick={() => paginate(-1)}
                disabled={index === 0}
                className="p-3 rounded-full border border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-primary transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => paginate(1)}
                disabled={index === count - 1}
                className="p-3 rounded-full border border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-primary transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}