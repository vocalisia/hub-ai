'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

type Testimonial = {
  key: string
  initials: string
  rating: number
}

const T: readonly Testimonial[] = [
  { key: 't1', initials: 'AM', rating: 5 },
  { key: 't2', initials: 'JR', rating: 5 },
  { key: 't3', initials: 'KS', rating: 5 },
  { key: 't4', initials: 'PB', rating: 5 },
] as const

export default function SwarmTestimonials() {
  const t = useTranslations('swarm.testimonials')

  return (
    <section className="relative py-16 sm:py-20 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(201,165,114,0.03), transparent)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="eyebrow mb-4">{t('kicker')}</div>
          <h2 className="text-[clamp(26px,3.8vw,42px)] font-extrabold leading-[1.15] mb-4">
            {t('title')}{' '}
            <span className="gradient-text-luxury">{t('title_em')}</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-base">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {T.map((testimonial, i) => (
            <motion.figure
              key={testimonial.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative p-5 sm:p-7 md:p-8 rounded-3xl"
              style={{
                border: '1px solid rgba(201,165,114,0.2)',
                background: 'linear-gradient(135deg, rgba(201,165,114,0.04), rgba(10,15,46,0.6))',
              }}
            >
              <svg
                aria-hidden
                className="absolute -top-3 left-7 w-10 h-10 text-gold opacity-60"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9.4 8.4H6.6c-.4 0-.6-.3-.6-.6V5c0-.4.3-.6.6-.6h2.8c.4 0 .6.3.6.6v2.8c0 .4-.3.6-.6.6zm9 0h-2.8c-.4 0-.6-.3-.6-.6V5c0-.4.3-.6.6-.6h2.8c.4 0 .6.3.6.6v2.8c0 .4-.3.6-.6.6zM6 19.6c4.4 0 6-3 6-6.4V8.6c0-.4-.3-.6-.6-.6H7.6c-.4 0-.6.3-.6.6v1.2c0 .4.3.6.6.6h.6c.6 0 .8.3.8.8 0 1.2-.6 1.6-2 1.8-.4 0-.6.3-.6.6V19c0 .4.3.6.6.6zm10 0c4.4 0 6-3 6-6.4V8.6c0-.4-.3-.6-.6-.6h-3.8c-.4 0-.6.3-.6.6v1.2c0 .4.3.6.6.6h.6c.6 0 .8.3.8.8 0 1.2-.6 1.6-2 1.8-.4 0-.6.3-.6.6V19c0 .4.3.6.6.6z" />
              </svg>

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3 7h7l-5.5 4.5 2 7.5L12 17l-6.5 4 2-7.5L2 9h7z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-[14px] sm:text-[15px] md:text-base text-white/85 leading-[1.65] mb-5 sm:mb-6 font-light italic">
                &ldquo;{t(`${testimonial.key}_quote`)}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[#0a0f2e] text-sm"
                  style={{ background: 'linear-gradient(135deg, #C9A572, #AD7D4E)' }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t(`${testimonial.key}_name`)}</div>
                  <div className="text-[12px] text-gold">{t(`${testimonial.key}_role`)}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
