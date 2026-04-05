import { useState, useEffect } from 'react';
import { useNav } from '../App';
import { Mic, Users, BookA, Building2, ExternalLink } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import contentData from '@/data/loadContent';
import ModalContent from '@/components/ModalContent';
import type { ModalMediaItem } from '@/types/content';

const tabs = [
  { id: 'interviews', label: 'Интервью', icon: Mic },
  { id: 'dynasties', label: 'Семейные династии', icon: Users },
  { id: 'alphabet', label: 'Азбука профессий', icon: BookA },
  { id: 'enterprises', label: 'Предприятия СПб', icon: Building2 },
];

const ENTERPRISE_CARD_SLICE = [12, 18] as const;

export default function JournalPage() {
  const { activeTab: navTab } = useNav();
  const [activeTab, setActiveTab] = useState(navTab || 'interviews');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalType, setModalType] = useState<string>('text');
  const [modalMedia, setModalMedia] = useState<ModalMediaItem[]>([]);
  const [modalLink, setModalLink] = useState<string | undefined>();
  const j = contentData.journal;
  const enterpriseCards = contentData.cards.slice(ENTERPRISE_CARD_SLICE[0], ENTERPRISE_CARD_SLICE[1]);
  const jCompanies = contentData.journal_companies;
  const jInterviews = contentData.journal_interviews;

  useEffect(() => {
    if (navTab) setActiveTab(navTab);
  }, [navTab]);

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="hero-gradient" style={{ padding: '1.5rem clamp(2rem, 5vw, 6rem) 2rem' }}>
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-black text-[#1a237e] mb-4" style={{ fontFamily: 'Montserrat' }}>
            {j.hero_title}
          </h1>
          <p className="text-gray-600 text-base max-w-xl mb-6">
            {j.hero_subtitle}
          </p>
          {/* Latest editions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {j.editions.map((ed) => (
              <div key={ed.number} className="bg-white/70 backdrop-blur border border-black/8 rounded-xl hover:bg-white/90 transition-colors cursor-pointer shadow-sm" style={{ padding: '1.5rem' }}>
                <div className="text-3xl font-black text-[#912F2C]">{ed.number}</div>
                <div className="text-[#1a237e] text-sm font-semibold mt-2">{ed.title}</div>
                <div className="text-gray-400 text-xs mt-2">{ed.date} · {ed.pages} стр.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b sticky top-[120px] z-40">
        <div className="w-full px-12 lg:px-16">
          <div className="flex overflow-x-auto gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#912F2C] text-[#912F2C]'
                      : 'border-transparent text-gray-500 hover:text-[#1a237e]'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="w-full px-12 lg:px-16">
          {activeTab === 'interviews' && (
            <div className="fade-in">
              <SectionTitle title={j.interviews_section_title} subtitle={j.interviews_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {j.interviews.map((item, idx) => {
                  const ji = jInterviews[idx];
                  const title = ji?.title ?? item.profession;
                  const quote = ji?.preview ?? item.quote;
                  return (
                  <div key={idx} className="bg-white rounded-xl card-hover shadow-sm border border-gray-100" style={{ padding: '2.5rem' }}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a237e] to-[#5c6bc0] flex items-center justify-center mb-4 mx-auto overflow-hidden">
                      {ji?.media ? (
                        <img src={ji.media} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Mic size={24} className="text-white/50" />
                      )}
                    </div>
                    <div className="text-center mb-4">
                      <h4 className="font-bold text-gray-400 italic">Имя специалиста</h4>
                      <p className="text-xs text-[#912F2C] font-medium">{item.profession}</p>
                      <p className="text-xs text-gray-400">{item.field}</p>
                    </div>
                    <blockquote className="text-sm text-gray-600 italic text-center leading-relaxed border-t border-gray-100 pt-4">
                      «{quote}»
                    </blockquote>
                    <button
                      type="button"
                      onClick={() => {
                        setModalTitle(title);
                        setModalContent(ji?.content || item.quote);
                        setModalType('text');
                        setModalMedia(ji?.media ? [{ url: ji.media, alt: title }] : []);
                        setModalLink(undefined);
                        setModalOpen(true);
                      }}
                      className="mt-4 flex items-center gap-1 text-xs text-[#912F2C] font-semibold hover:underline mx-auto"
                    >
                      {item.read_more_label} <ExternalLink size={12} />
                    </button>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'dynasties' && (
            <div className="fade-in">
              <SectionTitle title={j.dynasties_section_title} subtitle={j.dynasties_section_subtitle} />
              <div className="grid sm:grid-cols-2 gap-6">
                {j.dynasties.map((d) => (
                  <div key={d.title} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-[#912F2C] flex items-center justify-center">
                        <Users size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1a237e]">{d.title}</h4>
                        <p className="text-xs text-[#912F2C] font-medium">{d.profession}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{d.desc}</p>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: d.generations }).map((_, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <div className="w-6 h-6 rounded-full bg-[#1a237e] flex items-center justify-center text-white text-[8px] font-bold">
                            {i + 1}
                          </div>
                          {i < d.generations - 1 && <div className="w-4 h-0.5 bg-gray-300" />}
                        </div>
                      ))}
                      <span className="text-[10px] text-gray-400 ml-2">{d.generations} поколения</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'alphabet' && (
            <div className="fade-in">
              <SectionTitle title={j.alphabet_section_title} subtitle={j.alphabet_section_subtitle} />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {j.alphabetLetters.map((item) => (
                  <div key={item.letter} className="bg-white rounded-2xl p-7 card-hover shadow-sm border border-gray-100">
                    <div className="text-5xl font-black text-[#1a237e] mb-4">{item.letter}</div>
                    <ul className="space-y-2">
                      {item.professions.map((p) => (
                        <li key={p} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#912F2C] shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'enterprises' && (
            <div className="fade-in">
              <SectionTitle title={j.enterprises_section_title} subtitle={j.enterprises_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jCompanies.length >= enterpriseCards.length
                  ? jCompanies.map((co, idx) => {
                      const card = enterpriseCards[idx];
                      return (
                        <div key={co.name} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1a237e] to-[#3949ab] flex items-center justify-center mb-4">
                            <Building2 size={22} className="text-white" />
                          </div>
                          <h4 className="font-bold text-[#1a237e] mb-1">{co.name}</h4>
                          <span className="inline-block text-[10px] bg-[#912F2C]/10 text-[#912F2C] px-2 py-1 rounded-full font-medium mb-3">{card?.subtitle ?? 'Партнёр'}</span>
                          <p className="text-sm text-gray-500 line-clamp-4">{card?.description ?? co.short_desc}</p>
                          <button
                            type="button"
                            onClick={() => {
                              setModalTitle(co.name);
                              setModalContent(co.full_article);
                              setModalType('text');
                              setModalMedia([]);
                              setModalLink(co.source_link || undefined);
                              setModalOpen(true);
                            }}
                            className="mt-4 flex items-center gap-1 text-[#912F2C] font-semibold hover:underline"
                            style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                          >
                            {card?.button_text ?? 'Подробнее'} <ExternalLink size={14} />
                          </button>
                        </div>
                      );
                    })
                  : enterpriseCards.map((card, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1a237e] to-[#3949ab] flex items-center justify-center mb-4">
                          <Building2 size={22} className="text-white" />
                        </div>
                        <h4 className="font-bold text-[#1a237e] mb-1">{card.title}</h4>
                        <span className="inline-block text-[10px] bg-[#912F2C]/10 text-[#912F2C] px-2 py-1 rounded-full font-medium mb-3">{card.subtitle}</span>
                        <p className="text-sm text-gray-500">{card.description}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setModalTitle(card.title);
                            setModalContent(card.description);
                            setModalType('text');
                            setModalMedia([]);
                            setModalLink(card.link || undefined);
                            setModalOpen(true);
                          }}
                          className="mt-4 flex items-center gap-1 text-[#912F2C] font-semibold hover:underline"
                          style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                        >
                          {card.button_text} <ExternalLink size={14} />
                        </button>
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ModalContent
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        content={modalContent}
        contentType={modalType}
        media={modalMedia}
        externalLink={modalLink}
      />
    </div>
  );
}