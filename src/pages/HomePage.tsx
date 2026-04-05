import type { LucideIcon } from 'lucide-react';
import {
  Presentation,
  Users,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Target,
  Compass,
  BookOpen,
  Lightbulb,
  GraduationCap,
  Building2,
  CheckCircle2,
  CalendarDays,
} from 'lucide-react';
import { useNav } from '../App';
import SectionTitle from '../components/SectionTitle';
import contentData from '@/data/loadContent';

const iconMap: Record<string, LucideIcon> = {
  Target,
  Compass,
  BookOpen,
  Lightbulb,
  GraduationCap,
  Building2,
};

const P = 'clamp(1rem, 4vw, 5rem)';

export default function HomePage() {
  const { navigate } = useNav();
  const h = contentData.home;

  return (
    <div className="fade-in">

      {/* ── Hero ── */}
      <section
        className="hero-gradient relative overflow-hidden"
        style={{ paddingTop: 'clamp(2rem, 5vw, 4rem)', paddingBottom: 'clamp(2rem, 5vw, 4rem)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-black/5 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-[400px] h-[200px] bg-black/4 rounded-full blur-3xl" />
        </div>

        <div className="w-full relative z-10" style={{ paddingLeft: P, paddingRight: P }}>
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">

            {/* Left — title + buttons */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full text-gray-600 mb-6 border border-black/10 self-start" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}>
                <Star size={13} className="text-[#912F2C]" />
                {h.hero_badge}
              </div>

              <h1
                className="font-black text-[#1a237e] leading-tight mb-8"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                }}
              >
                {h.hero_title_line1}<span className="text-[#912F2C]">{h.hero_title_accent}</span>
                <br />
                {h.hero_title_line2}
              </h1>

              {/* Buttons */}
              <div className="flex flex-col gap-4 mt-2">
                <button
                  onClick={() => navigate('office')}
                  className="inline-flex items-center justify-center gap-3 bg-[#912F2C] hover:bg-[#7a2520] text-white font-bold rounded-2xl shadow-xl shadow-[#912F2C]/30 hover:shadow-2xl hover:shadow-[#912F2C]/40 transition-all duration-200 cursor-pointer border-2 border-[#7a2520] w-full"
                  style={{ padding: 'clamp(0.75rem, 1.5vw, 1.25rem) clamp(1.5rem, 3vw, 3rem)', fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)' }}
                >
                  <Target size={22} />
                  <span>{h.primary_cta}</span>
                  <ArrowRight size={20} />
                </button>

                <button
                  onClick={() => navigate('events')}
                  className="inline-flex items-center justify-center gap-3 bg-white/60 hover:bg-white/80 text-[#1a237e] font-bold rounded-2xl border-2 border-black/10 hover:border-black/20 transition-all duration-200 cursor-pointer w-full"
                  style={{ padding: 'clamp(0.75rem, 1.5vw, 1.25rem) clamp(1.5rem, 3vw, 3rem)', fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)' }}
                >
                  <CalendarDays size={22} />
                  <span>{h.secondary_cta}</span>
                </button>
              </div>
            </div>

            {/* Right — description block */}
            <div
              className="bg-white/70 backdrop-blur border border-black/8 rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg"
              style={{ maxWidth: '72%', marginLeft: 'auto' }}
            >
              <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1rem, 2vw, 1.5rem) clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2.5rem)' }}>
                <div className="w-11 h-11 rounded-xl bg-[#912F2C]/10 border border-[#912F2C]/30 flex items-center justify-center mb-5 shrink-0">
                  <Star size={22} className="text-[#912F2C]" />
                </div>
                <p className="text-[#1a237e] font-bold leading-snug mb-5" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}>
                  {h.description_title}
                </p>
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}>
                  {h.description_text}
                </p>
              </div>
              <div
                className="border-t border-black/8 flex items-center gap-3"
                style={{ padding: 'clamp(0.6rem, 1vw, 0.9rem) clamp(1rem, 2vw, 1.5rem) clamp(0.6rem, 1vw, 0.9rem) clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#912F2C] animate-pulse shrink-0" />
                <span className="text-gray-500 font-medium" style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.875rem)' }}>
                  {h.program_status}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-b-2 border-red-100">
        <div
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{ paddingLeft: P, paddingRight: P, paddingTop: 'clamp(1rem, 2vw, 2rem)', paddingBottom: 'clamp(1rem, 2vw, 2rem)' }}
        >
          {h.stats.map((s) => (
            <div key={s.label} className="text-center py-2">
              <div className={`font-black ${s.color} mb-1`} style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>{s.number}</div>
              <div className="text-gray-500 font-medium" style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Presentation ── */}
      <section id="presentation" className="bg-gray-50" style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>
        <div className="w-full" style={{ paddingLeft: P, paddingRight: P }}>
          <SectionTitle
            title={h.presentation_title}
            subtitle={h.presentation_subtitle}
          />
          <div className="grid-auto-fit">
            {h.features.map((f) => {
              const Icon = iconMap[f.icon] ?? Target;
              return (
                <div key={f.title} className="bg-white rounded-2xl card-hover shadow-sm border border-gray-100 group" style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                  <div className={`rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`} style={{ width: 'clamp(44px, 4vw, 56px)', height: 'clamp(44px, 4vw, 56px)' }}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#1a237e] mb-2 group-hover:text-[#912F2C] transition-colors" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}>{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed" style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)' }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About + Key Directions ── */}
      <section className="bg-white" style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>
        <div className="w-full" style={{ paddingLeft: P, paddingRight: P }}>
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* About text */}
            <div>
              <SectionTitle title={h.about_title} />
              <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(0.8rem, 1vw, 0.95rem)' }}>
                {h.about_paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Key directions card */}
            <div
              className="bg-gradient-to-br from-[#1a237e] to-[#3949ab] rounded-3xl text-white shadow-2xl overflow-hidden flex flex-col"
              style={{ maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto' }}
            >
              <div
                className="flex items-center gap-4 border-b border-white/10 bg-white/5 shrink-0"
                style={{ padding: 'clamp(0.9rem, 1.5vw, 1.25rem) clamp(1rem, 2vw, 1.5rem)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#912F2C] flex items-center justify-center shrink-0 shadow-lg">
                  <Star size={20} className="text-white" />
                </div>
                <h3 className="font-bold tracking-wide" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}>{h.directions_card_title}</h3>
              </div>
              <ul
                className="flex-1"
                style={{ padding: 'clamp(0.9rem, 1.5vw, 1.25rem) clamp(1rem, 2vw, 1.5rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 0.8vw, 0.7rem)' }}
              >
                {h.directions.map((item) => (
                  <li key={item} className="flex items-start gap-3 bg-white/8 rounded-xl" style={{ padding: 'clamp(0.5rem, 0.8vw, 0.75rem)' }}>
                    <CheckCircle2 size={16} className="text-[#912F2C] shrink-0 mt-0.5" />
                    <span className="font-medium leading-snug text-white/90" style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div
                className="border-t border-white/10 bg-black/10 shrink-0"
                style={{ padding: 'clamp(0.6rem, 1vw, 1rem) clamp(1rem, 2vw, 1.5rem)' }}
              >
                <p className="text-white/50" style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)' }}>{h.directions_footer}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Burgundy accent band ── */}
      <section
        className="bg-[#912F2C]"
        style={{ paddingTop: 'clamp(0.75rem, 1.5vw, 1.25rem)', paddingBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)', marginTop: 'clamp(1.5rem, 3vw, 3rem)', marginBottom: 'clamp(1.5rem, 3vw, 3rem)' }}
      >
        <div
          className="w-full flex flex-col md:flex-row items-center gap-5"
          style={{ paddingLeft: P, paddingRight: P }}
        >
          <div className="flex-1">
            <h2
              className="text-white font-black mb-1"
              style={{ fontFamily: 'Montserrat', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}
            >
              {h.cta_title}
            </h2>
            <p className="text-white/80" style={{ fontSize: 'clamp(0.75rem, 1vw, 0.9rem)' }}>
              {h.cta_subtitle}
            </p>
          </div>
          <button
            onClick={() => navigate('office')}
            className="shrink-0 bg-white text-[#912F2C] hover:bg-red-50 font-bold rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap"
            style={{ padding: '0.6rem 1.75rem', fontSize: 'clamp(0.8rem, 1vw, 0.95rem)', marginRight: '2rem' }}
          >
            {h.cta_button}
          </button>
        </div>
      </section>

      {/* ── Tutors ── */}
      <section id="tutors" className="bg-gray-50" style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>
        <div className="w-full" style={{ paddingLeft: P, paddingRight: P }}>
          <SectionTitle
            title={h.tutors_section_title}
            subtitle={h.tutors_section_subtitle}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {h.tutors.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden card-hover shadow-sm border border-gray-100">
                <div className="bg-gradient-to-br from-[#1a237e] to-[#5c6bc0] flex flex-col items-center justify-center gap-2 relative" style={{ height: 'clamp(140px, 15vw, 180px)' }}>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#912F2C] flex items-center justify-center">
                    <Users size={14} className="text-white" />
                  </div>
                  <Users size={44} className="text-white/20" />
                  <span className="text-white/40" style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)' }}>фото тьютора</span>
                </div>
                <div style={{ padding: 'clamp(0.75rem, 1.2vw, 1.25rem)' }}>
                  <p className="text-gray-400 italic mb-1" style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' }}>Имя и фамилия</p>
                  <p className="text-gray-600 mb-3" style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' }}>{t.role}</p>
                  <span className="inline-block bg-red-50 text-[#912F2C] px-3 py-1 rounded-full font-semibold border border-red-100" style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)' }}>
                    {t.area}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacts & Location ── */}
      <section id="contacts" className="bg-white" style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>
        <div className="w-full" style={{ paddingLeft: P, paddingRight: P }}>
          <SectionTitle title={h.contacts_section_title} subtitle={h.contacts_section_subtitle} />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { icon: MapPin, label: contentData.contacts[0]?.type ?? '', value: contentData.contacts[0]?.value ?? '', sub: contentData.contacts[0]?.sub ?? '', italic: false },
                { icon: Phone, label: contentData.contacts[1]?.type ?? '', value: contentData.contacts[1]?.value ?? '', sub: contentData.contacts[1]?.sub ?? '', italic: true },
                { icon: Presentation, label: contentData.contacts[2]?.type ?? '', value: contentData.contacts[2]?.value ?? '', sub: contentData.contacts[2]?.sub ?? '', italic: true },
              ].map(({ icon: Icon, label, value, sub, italic }) => (
                <div key={label} className="flex items-start gap-4 bg-gray-50 rounded-2xl border border-gray-100" style={{ padding: 'clamp(0.875rem, 1.5vw, 1.25rem)' }}>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#912F2C] to-[#7a2520] flex items-center justify-center shrink-0 shadow-md">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a237e] mb-0.5" style={{ fontSize: 'clamp(0.8rem, 1vw, 0.9rem)' }}>{label}</h4>
                    <p className={`${italic ? 'italic text-gray-400' : 'text-gray-700'}`} style={{ fontSize: 'clamp(0.8rem, 1vw, 0.9rem)' }}>{value}</p>
                    <p className="text-gray-400 mt-0.5" style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center border border-gray-200" style={{ minHeight: 'clamp(200px, 20vw, 300px)' }}>
              <div className="text-center" style={{ padding: 'clamp(1.5rem, 3vw, 3rem)' }}>
                <div className="w-16 h-16 rounded-full bg-[#1a237e]/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin size={32} className="text-[#1a237e]/40" />
                </div>
                <p className="text-gray-500 font-medium" style={{ fontSize: 'clamp(0.8rem, 1vw, 0.9rem)' }}>{h.map_placeholder_title}</p>
                <p className="text-gray-400 mt-1" style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' }}>{h.map_placeholder_subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Location in school ── */}
      <section id="location" className="hero-gradient relative overflow-hidden" style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-3xl" />
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-black/4 rounded-full blur-3xl" />
        </div>
        <div className="w-full relative z-10" style={{ paddingLeft: P, paddingRight: P }}>
          <SectionTitle
            title={h.location_section_title}
            subtitle={h.location_section_subtitle}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {h.rooms.map((room, idx) => (
              <div
                key={room.name}
                className="bg-white/70 backdrop-blur border border-black/8 rounded-2xl hover:bg-white/90 transition-all hover:border-[#912F2C]/30 shadow-sm group"
                style={{ padding: 'clamp(0.875rem, 1.5vw, 1.5rem)' }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#912F2C] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white font-black" style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)' }}>{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-[#1a237e] font-bold mb-0.5" style={{ fontSize: 'clamp(0.8rem, 1vw, 0.9rem)' }}>{room.name}</h4>
                    <p className="text-[#912F2C] font-semibold mb-1" style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' }}>{room.loc}</p>
                    <p className="text-gray-500 leading-relaxed" style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)' }}>{room.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {contentData.text_blocks.length > 0 && (
        <section className="bg-gray-50" style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>
          <div className="w-full" style={{ paddingLeft: P, paddingRight: P }}>
            {contentData.text_blocks.map((block) => (
              <div key={block.heading} className="mb-10 last:mb-0">
                <SectionTitle title={block.heading} />
                <div className="prose prose-sm max-w-none text-gray-600 mx-auto" style={{ fontSize: 'clamp(0.85rem, 1vw, 1rem)' }}>
                  {block.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}