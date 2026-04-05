import { useState, useRef, useCallback } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNav } from '../App';

type PageId = 'home' | 'communities' | 'events' | 'projectoria' | 'journal' | 'office' | 'faq';

interface SubItem {
  label: string;
  tab?: string;
  section?: string;
}

interface NavItem {
  id: PageId;
  label: string;
  subs?: SubItem[];
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'ГЛАВНАЯ',
    subs: [
      { label: 'Презентация практики', section: 'presentation' },
      { label: 'Тьюторы',              section: 'tutors' },
      { label: 'Контакты',             section: 'contacts' },
      { label: 'Локация в школе',      section: 'location' },
    ],
  },
  {
    id: 'communities',
    label: 'СООБЩЕСТВА',
    subs: [
      { label: 'Учащиеся', tab: 'students' },
      { label: 'Педагоги-тьюторы', tab: 'tutors' },
      { label: 'Родители', tab: 'parents' },
      { label: 'Партнёры', tab: 'partners' },
    ],
  },
  {
    id: 'events',
    label: 'СОБЫТИЯ',
    subs: [
      { label: 'Афиша и пост-релиз', tab: 'poster' },
      { label: 'Фотоотчёт', tab: 'photos' },
      { label: 'Видеоэкскурсия', tab: 'video' },
      { label: 'Рефлексия участников', tab: 'reflection' },
    ],
  },
  {
    id: 'projectoria',
    label: 'ПРОЕКТОРИЯ МЕГАПОЛИС',
    subs: [
      { label: 'Локация проектории', tab: 'location' },
      { label: 'Проектные практики', tab: 'practices' },
      { label: 'Учебные фирмы', tab: 'firms' },
      { label: 'Диалоги с мастерами', tab: 'dialogs' },
      { label: 'Презентации', tab: 'presentations' },
    ],
  },
  {
    id: 'journal',
    label: 'ЭЖ «МЕГАПОЛИС»',
    subs: [
      { label: 'Интервью', tab: 'interviews' },
      { label: 'Семейные династии', tab: 'dynasties' },
      { label: 'Азбука профессий', tab: 'alphabet' },
      { label: 'Предприятия СПб', tab: 'enterprises' },
    ],
  },
  {
    id: 'office',
    label: 'ОФИС «ПРОФИ-СТАРТ»',
    subs: [
      { label: 'Профориентационные тесты', tab: 'tests' },
      { label: 'Алгоритм самоанализа', tab: 'algorithm' },
      { label: 'Рекомендации', tab: 'recommendations' },
      { label: 'Профориентационные маршруты', tab: 'routes' },
      { label: 'Профориентационные проекты', tab: 'projects' },
      { label: 'Образовательные учреждения', tab: 'institutions' },
    ],
  },
  {
    id: 'faq',
    label: 'ВОПРОС-ОТВЕТ',
    subs: [
      { label: 'Частые вопросы',          section: 'faq-section' },
      { label: 'Задать вопрос специалисту', section: 'ask-form' },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [closingDropdown, setClosingDropdown] = useState<string | null>(null);
  const { currentPage, navigate } = useNav();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeAnimTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = useCallback((id: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    if (closeAnimTimer.current) { clearTimeout(closeAnimTimer.current); closeAnimTimer.current = null; }
    setClosingDropdown(null);
    setActiveDropdown(id);
  }, []);

  const closeDropdown = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (closeAnimTimer.current) clearTimeout(closeAnimTimer.current);
    closeTimer.current = setTimeout(() => {
      setClosingDropdown(activeDropdown);
      closeAnimTimer.current = setTimeout(() => {
        setActiveDropdown(null);
        setClosingDropdown(null);
        closeAnimTimer.current = null;
      }, 350);
      closeTimer.current = null;
    }, 120);
  }, [activeDropdown]);

  const handleNavClick = (id: PageId) => {
    navigate(id);
    setActiveDropdown(null);
    setClosingDropdown(null);
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    if (closeAnimTimer.current) { clearTimeout(closeAnimTimer.current); closeAnimTimer.current = null; }
  };

  const handleSubClick = (id: PageId, tab?: string, section?: string) => {
    navigate(id, tab, section);
    setActiveDropdown(null);
    setClosingDropdown(null);
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    if (closeAnimTimer.current) { clearTimeout(closeAnimTimer.current); closeAnimTimer.current = null; }
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-lg" style={{ borderBottom: '3px solid #912F2C' }}>
      <div
        className="w-full flex items-center"
        style={{
          padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 4vw, 4rem)',
          minHeight: 'clamp(80px, 10vh, 120px)',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
          style={{ width: '20%', minWidth: 'clamp(160px, 15vw, 240px)' }}
        >
          <div
            className="rounded-full bg-gradient-to-br from-[#1a237e] to-[#5c6bc0] flex items-center justify-center text-white font-extrabold shadow-xl select-none border-4 border-white ring-4 ring-[#912F2C]/30 group-hover:ring-[#912F2C]/60 transition-all"
            style={{
              width: 'clamp(48px, 5vw, 80px)',
              height: 'clamp(48px, 5vw, 80px)',
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            }}
          >
            91
          </div>
          <div className="hidden sm:block leading-tight">
            <span className="text-[#1a237e] font-extrabold tracking-wide block" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1.1rem)' }}>
              ШКОЛА №91
            </span>
            <span className="text-gray-500 leading-none" style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.875rem)' }}>
              Санкт-Петербург
            </span>
          </div>
        </button>

        {/* Right section */}
        <div className="flex-1 flex flex-col justify-center" style={{ marginLeft: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
          {/* Title */}
          <div className="mb-2 hidden lg:flex items-center gap-3">
            <span
              className="font-black text-[#1a237e] tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}
            >
              КЛАСС<span className="text-[#912F2C]">ная</span> КОМАНДА
            </span>
            <span className="hidden xl:block w-px h-6 bg-gray-200" />
            <span className="hidden xl:block text-gray-400 italic" style={{ fontSize: 'clamp(0.65rem, 0.85vw, 0.8rem)' }}>
              комплексная система профориентационного сопровождения обучающихся
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex flex-wrap relative" style={{ gap: 'clamp(0.25rem, 1vw, 1rem) clamp(0.5rem, 1.5vw, 1.5rem)' }}>
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => openDropdown(item.id)}
                onMouseLeave={closeDropdown}
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link font-bold uppercase tracking-wide py-1 px-1 transition-colors duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    currentPage === item.id ? 'text-[#912F2C]' : 'text-[#1a237e] hover:text-[#912F2C]'
                  }`}
                  style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.85rem)' }}
                >
                  {item.label}
                  {item.subs && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180' : ''}`}
                    />
                  )}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#912F2C] rounded-full" />
                  )}
                </button>

                {/* Dropdown */}
                {item.subs && (activeDropdown === item.id || closingDropdown === item.id) && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden z-50"
                    style={{
                      minWidth: '240px',
                      marginTop: '0.5rem',
                      animation: closingDropdown === item.id
                        ? 'dropdownOut 0.3s ease-in forwards'
                        : 'dropdownIn 0.2s ease-out forwards',
                    }}
                    onMouseEnter={() => openDropdown(item.id)}
                    onMouseLeave={closeDropdown}
                  >
                    <div className="h-1 bg-gradient-to-r from-[#1a237e] to-[#912F2C]" />
                    <div className="py-2">
                      {item.subs.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSubClick(item.id, sub.tab, sub.section)}
                          className="w-full text-left px-5 py-3 text-sm font-medium text-[#1a237e] hover:bg-[#912F2C]/10 hover:text-[#912F2C] transition-colors duration-150 cursor-pointer flex items-center gap-3"
                          style={{
                            animation: closingDropdown === item.id
                              ? `rowOut 0.25s ease-in ${(item.subs!.length - 1 - idx) * 0.05}s both`
                              : `rowIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.07}s both`,
                          }}
                        >
                          <span
                            className="shrink-0 rounded-full bg-[#912F2C]"
                            style={{
                              width: '7px',
                              height: '7px',
                              animation: closingDropdown === item.id
                                ? `dotOut 0.2s ease-in ${(item.subs!.length - 1 - idx) * 0.05}s both`
                                : `dotIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.07 + 0.1}s both`,
                            }}
                          />
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden ml-auto p-2 cursor-pointer text-[#1a237e] hover:text-[#912F2C] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#912F2C]/20 shadow-xl fade-in">
          <div className="px-5 py-3 bg-gradient-to-r from-[#1a237e]/5 to-[#912F2C]/5">
            <span className="font-black text-[#1a237e] text-lg" style={{ fontFamily: 'Montserrat' }}>
              КЛАСС<span className="text-[#912F2C]">ная</span> КОМАНДА
            </span>
            <span className="block text-xs text-gray-500 mt-1">
              комплексная система профориентационного сопровождения обучающихся
            </span>
          </div>
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.subs) {
                      setMobileExpanded(mobileExpanded === item.id ? null : item.id);
                    } else {
                      navigate(item.id);
                      setMobileOpen(false);
                    }
                  }}
                  className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wide border-b border-gray-100 cursor-pointer transition-colors flex items-center justify-between ${
                    currentPage === item.id ? 'text-[#912F2C] bg-[#912F2C]/5' : 'text-[#1a237e] hover:bg-gray-50 hover:text-[#912F2C]'
                  }`}
                >
                  {item.label}
                  {item.subs && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${mobileExpanded === item.id ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>
                {item.subs && mobileExpanded === item.id && (
                  <div className="bg-gray-50 border-b border-gray-100">
                    {item.subs.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleSubClick(item.id, sub.tab, sub.section);
                          setMobileOpen(false);
                        }}
                        className="w-full text-left px-8 py-2.5 text-sm text-[#1a237e] hover:text-[#912F2C] hover:bg-[#912F2C]/5 transition-colors cursor-pointer flex items-center gap-2 border-b border-gray-100 last:border-0"
                        style={{ animation: `rowIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.06}s both` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#912F2C] shrink-0" />
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-10px) scaleY(0.92); transform-origin: top; }
          to   { opacity: 1; transform: translateY(0)   scaleY(1);    transform-origin: top; }
        }
        @keyframes dropdownOut {
          from { opacity: 1; transform: translateY(0)    scaleY(1);    transform-origin: top; }
          to   { opacity: 0; transform: translateY(-8px) scaleY(0.94); transform-origin: top; }
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes rowOut {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-14px); }
        }
        @keyframes dotIn {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes dotOut {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0); }
        }
      `}</style>
    </header>
  );
}
