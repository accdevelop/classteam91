import { useState, useEffect } from 'react';
import { Calendar, Camera, Video, MessageSquare, Clock, MapPin, Users } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useNav } from '../App';
import contentData from '@/data/loadContent';
import ModalContent from '@/components/ModalContent';
import type { ModalMediaItem } from '@/types/content';

const tabs = [
  { id: 'poster', label: 'Афиша и пост-релиз', icon: Calendar },
  { id: 'photos', label: 'Фотоотчёт', icon: Camera },
  { id: 'video', label: 'Видеоэкскурсия', icon: Video },
  { id: 'reflection', label: 'Рефлексия участников', icon: MessageSquare },
];

export default function EventsPage() {
  const { activeTab: navTab } = useNav();
  const [activeTab, setActiveTab] = useState(navTab || 'poster');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalType, setModalType] = useState<string>('text');
  const [modalMedia, setModalMedia] = useState<ModalMediaItem[]>([]);
  const [modalLink, setModalLink] = useState<string | undefined>();
  const e = contentData.eventsPage;
  const evMod = contentData.event_modal_items;

  useEffect(() => {
    if (navTab) setActiveTab(navTab);
  }, [navTab]);

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="hero-gradient" style={{ padding: '1.5rem clamp(2rem, 5vw, 6rem) 2rem' }}>
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-black text-[#1a237e] mb-4" style={{ fontFamily: 'Montserrat' }}>
            {e.hero_title}
          </h1>
          <p className="text-gray-600 text-base max-w-xl">
            {e.hero_subtitle}
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
          {activeTab === 'poster' && (
            <div className="fade-in">
              <SectionTitle title={e.poster_section_title} subtitle={e.poster_section_subtitle} />
              <div className="space-y-4">
                {e.events.map((ev, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const detail = evMod[idx];
                      setModalTitle(ev.title);
                      setModalContent(detail?.full_content || ev.desc);
                      setModalType(detail?.content_type || 'text');
                      setModalMedia(detail?.media ?? []);
                      setModalLink(detail?.external_link || undefined);
                      setModalOpen(true);
                    }}
                    className="w-full text-left bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 cursor-pointer hover:border-[#912F2C]/30 transition-colors"
                  >
                    <div className="md:w-32 shrink-0">
                      <div className={`w-full rounded-lg p-3 text-center ${
                        ev.status === 'upcoming' ? 'bg-[#912F2C]/10 text-[#912F2C]' : 'bg-gray-50 text-gray-500'
                      }`}>
                        <Calendar size={20} className="mx-auto mb-1" />
                        <div className="text-xs font-semibold">{ev.date}</div>
                        <div className={`text-[10px] mt-1 font-bold uppercase ${
                          ev.status === 'upcoming' ? 'text-[#912F2C]' : 'text-gray-400'
                        }`}>
                          {ev.status === 'upcoming' ? 'Скоро' : 'Прошло'}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#1a237e] text-lg mb-2">{ev.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{ev.desc}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock size={12} /> {ev.time}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {ev.location}</span>
                        <span className="flex items-center gap-1"><Users size={12} /> {ev.participants} участников</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="fade-in">
              <SectionTitle title={e.photos_section_title} subtitle={e.photos_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {e.photos.map((p, idx) => (
                  <div key={idx} className="bg-white rounded-xl overflow-hidden card-hover shadow-sm border border-gray-100">
                    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                      <Camera size={40} className="text-gray-400" />
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded">
                        {p.count} фото
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-[#1a237e] mb-1">{p.title}</h4>
                      <p className="text-xs text-gray-400">{p.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="fade-in">
              <SectionTitle title={e.video_section_title} subtitle={e.video_section_subtitle} />
              <div className="grid sm:grid-cols-2 gap-6">
                {e.videos.map((v, idx) => (
                  <div key={idx} className="bg-white rounded-xl overflow-hidden card-hover shadow-sm border border-gray-100">
                    <div className="h-52 bg-gradient-to-br from-[#1a237e] to-[#3949ab] flex items-center justify-center relative">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                        <Video size={28} className="text-white ml-1" />
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {v.duration}
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-sm text-[#1a237e] mb-1">{v.title}</h4>
                      <p className="text-xs text-gray-400">{v.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reflection' && (
            <div className="fade-in">
              <SectionTitle title={e.reflection_section_title} subtitle={e.reflection_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {e.reflections.map((r, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100 relative">
                    <div className="text-5xl text-[#912F2C]/20 font-serif absolute top-3 left-5">«</div>
                    <p className="text-sm text-gray-600 mb-4 mt-6 italic leading-relaxed">"{r.text}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a237e] to-[#5c6bc0] flex items-center justify-center text-white text-xs font-bold">
                        {r.name.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-[#1a237e]">{r.name}</span>
                    </div>
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