import { useState, useEffect } from 'react';
import { Users, GraduationCap, Heart, Handshake, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useNav } from '../App';
import contentData from '@/data/loadContent';
import ModalContent from '@/components/ModalContent';

const tabs = [
  { id: 'students', label: 'Учащиеся', icon: Users },
  { id: 'tutors', label: 'Педагоги-тьюторы', icon: GraduationCap },
  { id: 'parents', label: 'Родители', icon: Heart },
  { id: 'partners', label: 'Партнёры', icon: Handshake },
];

const STUDENT_CARD_SLICE = [0, 6] as const;

export default function CommunitiesPage() {
  const { activeTab: navTab } = useNav();
  const [activeTab, setActiveTab] = useState(navTab || 'students');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [modalExtras, setModalExtras] = useState('');
  const c = contentData.communitiesPage;
  const studentCards = contentData.cards.slice(STUDENT_CARD_SLICE[0], STUDENT_CARD_SLICE[1]);
  const groups = contentData.community_groups;

  useEffect(() => {
    if (navTab) setActiveTab(navTab);
  }, [navTab]);

  return (
    <div className="fade-in">
      <section className="hero-gradient" style={{ padding: '1.5rem clamp(1.25rem, 4vw, 4rem) 2rem' }}>
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-black text-[#1a237e] mb-4" style={{ fontFamily: 'Montserrat' }}>
            {c.hero_title}
          </h1>
          <p className="text-gray-600 text-base max-w-xl leading-relaxed">
            {c.hero_subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white border-b sticky top-[120px] z-40">
        <div className="w-full px-12 lg:px-16">
          <div className="flex overflow-x-auto gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
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

      <section className="py-12">
        <div className="w-full px-12 lg:px-16">
          {activeTab === 'students' && (
            <div className="fade-in">
              <SectionTitle title={c.students_section_title} subtitle={c.students_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.length >= studentCards.length
                  ? groups.map((g, idx) => {
                      const card = studentCards[idx];
                      return (
                        <div key={g.name} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-3xl font-black text-[#1a237e]">{g.name}</div>
                            <div className="bg-blue-50 text-[#1a237e] text-xs font-semibold px-3 py-1 rounded-full">
                              {card?.count ?? 0} учеников
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{g.description}</p>
                          <button
                            type="button"
                            onClick={() => {
                              setModalTitle(g.name);
                              setModalBody(g.full_info || g.description);
                              const extra = [g.schedule && `Расписание: ${g.schedule}`, g.signup_link && `Запись: ${g.signup_link}`, g.contact && `Контакты: ${g.contact}`].filter(Boolean).join('\n\n');
                              setModalExtras(extra);
                              setModalOpen(true);
                            }}
                            className="mt-4 flex items-center gap-1 text-[#912F2C] font-semibold hover:underline cursor-pointer"
                            style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                          >
                            {card?.button_text ?? 'Подробнее'} <ChevronRight size={14} />
                          </button>
                        </div>
                      );
                    })
                  : studentCards.map((card) => (
                      <div key={card.title} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-3xl font-black text-[#1a237e]">{card.title}</div>
                          <div className="bg-blue-50 text-[#1a237e] text-xs font-semibold px-3 py-1 rounded-full">
                            {card.count ?? 0} учеников
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{card.description}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setModalTitle(card.title);
                            setModalBody(card.modal_content || card.description);
                            setModalExtras('');
                            setModalOpen(true);
                          }}
                          className="mt-4 flex items-center gap-1 text-[#912F2C] font-semibold hover:underline cursor-pointer"
                          style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                        >
                          {card.button_text} <ChevronRight size={14} />
                        </button>
                      </div>
                    ))}
              </div>
            </div>
          )}

          {activeTab === 'tutors' && (
            <div className="fade-in">
              <SectionTitle title={c.tutors_section_title} subtitle={c.tutors_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {c.tutorsList.map((t, idx) => (
                  <div key={idx} className="bg-white rounded-xl overflow-hidden card-hover shadow-sm border border-gray-100">
                    <div className="h-40 bg-gradient-to-br from-[#283593] to-[#5c6bc0] flex items-center justify-center">
                      <GraduationCap size={40} className="text-white/30" />
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-gray-400 text-base mb-2 italic">Имя и фамилия</h4>
                      <p className="text-sm text-gray-500 mb-3">{t.subject}</p>
                      <span className="inline-block text-xs bg-[#912F2C]/10 text-[#912F2C] px-4 py-1.5 rounded-full font-semibold">
                        {t.area}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'parents' && (
            <div className="fade-in">
              <SectionTitle title={c.parents_section_title} subtitle={c.parents_section_subtitle} />
              <div className="grid sm:grid-cols-2 gap-6">
                {c.parentRoles.map((r) => (
                  <div key={r.title} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-[#912F2C] flex items-center justify-center mb-4">
                      <Heart size={18} className="text-white" />
                    </div>
                    <h4 className="font-bold text-[#1a237e] mb-2">{r.title}</h4>
                    <p className="text-sm text-gray-500">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="fade-in">
              <SectionTitle title={c.partners_section_title} subtitle={c.partners_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {c.partnersList.map((p, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1a237e] flex items-center justify-center shrink-0">
                        <Handshake size={22} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-400 text-base italic">{p.name}</h4>
                        <span className="text-xs text-[#912F2C] font-semibold">{p.type}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
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
        content={[modalBody, modalExtras].filter(Boolean).join('\n\n')}
        contentType="text"
      />
    </div>
  );
}