import { useId, useState } from 'react'
import { FAQ } from '../data/site'
import Reveal from './Reveal'
import { ChevronIcon } from './icons'
import { SectionHeading } from './ui'

function FaqItem({ item, index, open, onToggle }) {
  const id = useId()

  return (
    <Reveal
      delay={index * 70}
      className="border-b border-white/8 first:border-t first:border-white/8"
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-gold"
        >
          <span
            className={`font-display text-lg transition-colors duration-300 sm:text-xl ${
              open ? 'text-gold' : 'text-bone'
            }`}
          >
            {item.question}
          </span>
          <ChevronIcon
            className={`h-5 w-5 shrink-0 text-gold transition-transform duration-400 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h3>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        hidden={!open}
        className="pb-6"
      >
        <p className="max-w-[62ch] text-[0.92rem] leading-relaxed text-muted">
          {item.answer}
        </p>
      </div>
    </Reveal>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading
        eyebrow="Dudas frecuentes"
        title="Lo que suelen preguntarnos"
        subtitle="Y si te queda alguna, escríbenos por WhatsApp: contestamos al momento."
      />

      <div className="mt-14">
        {FAQ.map((item, index) => (
          <FaqItem
            key={item.question}
            item={item}
            index={index}
            open={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  )
}
