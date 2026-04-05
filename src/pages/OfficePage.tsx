import { useState, useEffect } from 'react';
import { useNav } from '../App';
import { ClipboardCheck, Brain, ThumbsUp, Route, FolderGit2, School, ChevronRight, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import contentData from '@/data/loadContent';
import ModalContent from '@/components/ModalContent';
import type { ModalMediaItem } from '@/types/content';

const tabs = [
  { id: 'tests', label: 'Профориентационные тесты', icon: ClipboardCheck },
  { id: 'analysis', label: 'Алгоритм самоанализа', icon: Brain },
  { id: 'recommendations', label: 'Рекомендации', icon: ThumbsUp },
  { id: 'routes', label: 'Проф. маршруты', icon: Route },
  { id: 'projects', label: 'Проф. проекты', icon: FolderGit2 },
  { id: 'education', label: 'Образ. учреждения', icon: School },
];

export default function OfficePage() {
  const { activeTab: navTab } = useNav();
  const [activeTab, setActiveTab] = useState(navTab || 'tests');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalType, setModalType] = useState<string>('text');
  const [modalMedia, setModalMedia] = useState<ModalMediaItem[]>([]);
  const [modalLink, setModalLink] = useState<string | undefined>();
  const o = contentData.office;
  const of = contentData.office_features;

  useEffect(() => {
    if (navTab) setActiveTab(navTab);
  }, [navTab]);

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="hero-gradient" style={{ padding: '1.5rem clamp(2rem, 5vw, 6rem) 2rem' }}>
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-black text-[#1a237e] mb-4" style={{ fontFamily: 'Montserrat' }}>
            {o.hero_title}
          </h1>
          <p className="text-gray-600 text-base max-w-xl">
            {o.hero_subtitle}
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
                  className={`flex items-center gap-2 px-4 py-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#912F2C] text-[#912F2C]'
                      : 'border-transparent text-gray-500 hover:text-[#1a237e]'
                  }`}
                >
                  <Icon size={14} />
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
          {activeTab === 'tests' && (
            <div className="fade-in">
              <SectionTitle title={o.tests_section_title} subtitle={o.tests_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {o.tests.map((t, idx) => {
                  const feat = of[idx];
                  return (
                  <div key={t.name} className="bg-white rounded-2xl p-8 card-hover shadow-sm border border-gray-100 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-[#912F2C] flex items-center justify-center mb-5">
                      <ClipboardCheck size={26} className="text-white" />
                    </div>
                    <h4 className="font-bold text-[#1a237e] text-lg mb-3">{t.name}</h4>
                    <p className="text-sm text-gray-500 flex-1 mb-5 leading-relaxed">{feat?.preview_text || t.desc}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-5 bg-gray-50 rounded-xl px-4 py-3">
                      <span>⏱ {t.time}</span>
                      <span>📋 {t.questions} вопросов</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setModalTitle(feat?.title ?? t.name);
                        setModalContent(feat?.full_content || t.desc);
                        setModalType(feat?.content_type || 'text');
                        setModalMedia(feat?.media ?? []);
                        setModalLink(feat?.external_link || undefined);
                        setModalOpen(true);
                      }}
                      className="w-full bg-[#1a237e] hover:bg-[#283593] text-white font-bold rounded-xl transition-colors"
                      style={{ padding: '1rem 2rem', fontSize: '0.95rem' }}
                    >
                      {o.test_button_label}
                    </button>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="fade-in">
              <SectionTitle title={o.analysis_section_title} subtitle={o.analysis_section_subtitle} />
              <div className="max-w-3xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {o.analysisSteps.map((s) => (
                  <div key={s.step} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a237e] to-[#5c6bc0] flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {s.step}
                      </div>
                      {s.step < 6 && <div className="w-0.5 flex-1 bg-gray-200 mt-2" />}
                    </div>
                    <div style={{ paddingBottom: '0' }}>
                      <h4 className="font-bold text-[#1a237e] text-lg mb-2">{s.title}</h4>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="fade-in">
              <SectionTitle title={o.recommendations_section_title} subtitle={o.recommendations_section_subtitle} />
              <div className="grid sm:grid-cols-2 gap-6">
                {o.recommendations.map((r) => (
                  <div key={r.title} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                    <h4 className="font-bold text-[#1a237e] mb-4">{r.title}</h4>
                    <ul className="space-y-2">
                      {r.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="fade-in">
              <SectionTitle title={o.routes_section_title} subtitle={o.routes_section_subtitle} />
              <div className="space-y-6">
                {o.routes.map((r) => (
                  <div key={r.name} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                    <h4 className="font-bold text-[#1a237e] text-lg mb-4 flex items-center gap-2">
                      <Route size={18} className="text-[#912F2C]" />
                      {r.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
                      {r.steps.map((step, i) => (
                        <span key={i} className="flex items-center">
                          <span className="bg-blue-50 text-[#1a237e] px-3 py-1 rounded-full text-xs font-medium">
                            {step.replace(' → ', '')}
                          </span>
                          {i < r.steps.length - 1 && <ChevronRight size={14} className="text-gray-300 mx-1" />}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="fade-in">
              <SectionTitle title={o.projects_section_title} subtitle={o.projects_section_subtitle} />
              <div className="grid sm:grid-cols-2 gap-6">
                {o.projects.map((p) => (
                  <div key={p.name} className="bg-white rounded-xl p-6 card-hover shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1a237e] to-[#5c6bc0] flex items-center justify-center mb-4">
                      <FolderGit2 size={18} className="text-white" />
                    </div>
                    <h4 className="font-bold text-[#1a237e] mb-2">{p.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">{p.desc}</p>
                    <span className="text-[10px] bg-[#912F2C]/10 text-[#912F2C] px-2 py-1 rounded-full font-medium">
                      Длительность: {p.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="fade-in">
              <SectionTitle title={o.education_section_title} subtitle={o.education_section_subtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {o.educationInstitutions.map((inst) => (
                  <div key={inst.name} className="bg-white rounded-2xl p-7 card-hover shadow-sm border border-gray-100">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a237e] to-[#3949ab] flex items-center justify-center mb-4">
                      <School size={22} className="text-white" />
                    </div>
                    <h4 className="font-bold text-[#1a237e] text-base mb-2">{inst.name}</h4>
                    <span className="inline-block text-xs bg-blue-50 text-[#1a237e] px-3 py-1 rounded-full font-medium mb-3">{inst.type}</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {inst.areas.map((a) => (
                        <span key={a} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">{a}</span>
                      ))}
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