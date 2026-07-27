import { TEAM } from '../data/site'
import Reveal from './Reveal'
import SmartImage from './SmartImage'
import { SectionHeading } from './ui'

export default function Team() {
  return (
    <section className="border-y border-white/6 bg-ink-2/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="El equipo"
          title="Quién te va a atender"
          subtitle="Tres barberos, tres especialidades. Elige con quién quieres sentarte."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, index) => (
            <Reveal
              key={member.name}
              delay={index * 110}
              className="group relative overflow-hidden rounded-2xl border border-white/8 transition-[border-color,transform] duration-400 hover:-translate-y-1.5 hover:border-gold/40"
            >
              <SmartImage
                src={member.image}
                alt={`${member.name}, ${member.role.toLowerCase()} en Barbería Royal`}
                className="aspect-4/5 w-full"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
              />

              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(7,6,5,0.92)_72%)]"
              />

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
                <h3 className="font-display text-2xl text-bone">{member.name}</h3>
                <p className="text-[0.82rem] text-gold">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
