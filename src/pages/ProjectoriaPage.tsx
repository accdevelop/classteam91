import { useState, useEffect } from 'react';
import { useNav } from '../App';
import { MapPin, FolderKanban, Building, MessagesSquare, Presentation, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import contentData from '@/data/loadContent';
import ModalContent from '@/components/ModalContent';
import type { ModalMediaItem } from '@/types/content';

const tabs = [
  { id: 'location', label: 'Локация проектории', icon: MapPin },
  { id: 'practices', label: 'Проектные практики', icon: FolderKanban },
  { id: 'firms', label: 'Учебные фирмы', icon: Building },
  { id: 'dialogs', label: 'Диалоги с мастерами', icon: MessagesSquare },
  { id: 'presentations', label: 'Презентации', icon: Presentation },
];

const PRACTICE_CARD_OFFSET = 6;

export default function ProjectoriaPage() {
  const { activeTab: navTab } = useNav();
  const [activeTab, setActiveTab] = useState(navTab || 'location');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalType, setModalType] = useState<string>('text');
  const [modalMedia, setModalMedia] = useState<ModalMediaItem[]>([]);
  const [modalLink, setModalLink] = useState<string | undefined>();
  const p = contentData.projectoria;
  const pp = contentData.project_practices;

  useEffect(() => {
    if (navTab) setActiveTab(navTab);
  }, [navTab]);

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="hero-gradient" style={{ padding: '1.5rem clamp(2rem, 5vw, 6rem) 2rem' }}>
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-black text-[#1a237e] mb-4" style={{ fontFamily: 'Montserrat' }}>
            {p.hero_title}
          </h1>
          <p className="text-gray-600 text-base max-w-xl">
            {p.hero_subtitle}
          </p>
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
          {activeTab === 'location' && (
            <div className="fade-in">
              <SectionTitle title={p.location_section_title} subtitle={p.location_section_subtitle} />
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {p.location_rooms.map((room) => (
                    <div key={room.name} className="bg-white rounded-2xl shadow-md border border-gray-100 flex items-start" style={{ padding: '2rem 2rem', gap: '1.5rem' }}>
                      <div className="rounded-xl bg-[#1a237e] flex items-center justify-center shrink-0" style={{ width: '56px', height: '56px' }}>
                        <MapPin size={26} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1a237e]" style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{room.name}</h4>
                        <p className="text-[#912F2C] font-semibold" style={{ fontSize: '0.95rem', marginBottom: '0.6rem' }}>{room.loc}</p>
                        <p className="text-gray-500" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{room.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-[#1a237e] to-[#3949ab] rounded-2xl text-white flex flex-col shadow-2xl overflow-hidden" style={{ maxWidth: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                  {/* header */}
                  <div className="flex items-center gap-4 border-b border-white/20 bg-white/5 shrink-0" style={{ padding: '2rem 2.5rem' }}>
                    <div className="w-11 h-11 rounded-lg bg-[#912F2C] flex items-center justify-center shrink-0 shadow">
                      <MapPin size={22} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold tracking-wide">{p.map_card_title}</h3>
                  </div>
                  {/* map placeholder */}
                  <div className="flex items-center justify-center bg-white/10 rounded-xl" style={{ margin: '2rem 2.5rem', padding: '3rem 2rem' }}>
                    <div className="text-center">
                      <MapPin size={44} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm text-white/60 font-medium">{p.map_placeholder_line1}</p>
                      <p className="text-xs text-white/40 mt-2">{p.map_placeholder_line2}</p>
                    </div>
                  </div>
                  {/* floors legend */}
                  <div className="flex-1" style={{ padding: '0 2.5rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {p.floors.map((f) => (
                      <div key={f.floor} className="flex items-center gap-4 bg-white/5 rounded-xl" style={{ padding: '1.25rem 1.5rem' }}>
                        <span className="text-sm font-bold bg-[#912F2C] text-white rounded-lg shrink-0" style={{ padding: '0.6rem 1.25rem' }}>{f.floor}</span>
                        <span className="text-sm text-white/80 leading-snug">{f.rooms}</span>
                      </div>
                    ))}
                  </div>
                  {/* footer */}
                  <div className="border-t border-white/10 bg-black/10 shrink-0" style={{ padding: '1.25rem 2.5rem' }}>
                    <p className="text-white/40 text-sm">{p.map_footer}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'practices' && (
            <div className="fade-in">
              <SectionTitle title={p.practices_section_title} subtitle={p.practices_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {p.practices.map((pr, idx) => {
                  const card = contentData.cards[PRACTICE_CARD_OFFSET + idx];
                  const detail = pp[idx];
                  const title = detail?.title ?? pr.title;
                  const preview = detail?.preview_text || pr.desc;
                  return (
                  <div key={pr.title} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-50 text-[#1a237e] text-xs font-semibold px-3 py-1 rounded-full">{pr.grade}</span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        pr.stage === 'В процессе' ? 'bg-green-50 text-green-600' :
                        pr.stage === 'Завершён' ? 'bg-gray-100 text-gray-500' :
                        'bg-red-50 text-[#912F2C]'
                      }`}>{pr.stage}</span>
                    </div>
                    <h4 className="font-bold text-[#1a237e] mb-2 flex items-center gap-2">
                      {detail?.icon ? <span aria-hidden>{detail.icon}</span> : null}
                      {title}
                    </h4>
                    <p className="text-sm text-gray-500">{preview}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setModalTitle(title);
                        setModalContent(detail?.full_content || pr.desc);
                        setModalType(detail?.content_type || 'text');
                        setModalMedia(detail?.media ?? []);
                        setModalLink(detail?.external_link || undefined);
                        setModalOpen(true);
                      }}
                      className="mt-4 flex items-center gap-1 text-[#912F2C] font-semibold hover:underline"
                      style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      {card?.button_text ?? 'Подробнее'} <ChevronRight size={14} />
                    </button>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'firms' && (
            <div className="fade-in">
              <SectionTitle title={p.firms_section_title} subtitle={p.firms_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {p.firms.map((f) => (
                  <div key={f.name} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#912F2C] to-[#7a2520] flex items-center justify-center mb-4">
                      <Building size={22} className="text-white" />
                    </div>
                    <h4 className="font-bold text-[#1a237e] mb-1">{f.name}</h4>
                    <p className="text-xs text-[#912F2C] font-medium mb-2">{f.area}</p>
                    <p className="text-sm text-gray-500 mb-3">{f.desc}</p>
                    <div className="text-xs text-gray-400">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {f.members} участников</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'dialogs' && (
            <div className="fade-in">
              <SectionTitle title={p.dialogs_section_title} subtitle={p.dialogs_section_subtitle} />
              <div className="space-y-4">
                {p.dialogs.map((d, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a237e] to-[#5c6bc0] flex items-center justify-center shrink-0 mx-auto md:mx-0">
                      <MessagesSquare size={28} className="text-white/50" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="font-bold text-[#1a237e] text-lg mb-1">{d.topic}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>{d.profession}</strong> — {d.field}
                      </p>
                      <p className="text-xs text-gray-400 italic">{d.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'presentations' && (
            <div className="fade-in">
              <SectionTitle title={p.presentations_section_title} subtitle={p.presentations_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {p.presentations.map((pres) => (
                  <div key={pres.title} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1a237e] to-[#5c6bc0] flex items-center justify-center mb-4">
                      <Presentation size={22} className="text-white" />
                    </div>
                    <h4 className="font-bold text-[#1a237e] text-sm mb-1">{pres.title}</h4>
                    <p className="text-xs text-gray-400 mb-2">{pres.format}</p>
                    <p className="text-sm text-gray-500">{pres.desc}</p>
                    <button type="button" className="mt-4 bg-[#1a237e] hover:bg-[#283593] text-white font-semibold rounded-lg transition-colors" style={{ padding: '0.75rem 2rem', fontSize: '0.85rem' }}>
                      {p.download_label}
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