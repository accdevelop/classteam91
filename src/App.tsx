import { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CommunitiesPage from './pages/CommunitiesPage';
import EventsPage from './pages/EventsPage';
import ProjectoriaPage from './pages/ProjectoriaPage';
import JournalPage from './pages/JournalPage';
import OfficePage from './pages/OfficePage';
import FaqPage from './pages/FaqPage';

type PageId = 'home' | 'communities' | 'events' | 'projectoria' | 'journal' | 'office' | 'faq';

interface NavContextType {
  currentPage: PageId;
  activeTab: string | null;
  scrollToSection: string | null;
  navigate: (page: PageId, tab?: string, section?: string) => void;
}

export const NavContext = createContext<NavContextType>({
  currentPage: 'home',
  activeTab: null,
  scrollToSection: null,
  navigate: () => {},
});

export function useNav() {
  return useContext(NavContext);
}

// Easing функция — плавное ускорение и замедление
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Кастомная плавная прокрутка через requestAnimationFrame
function smoothScrollTo(targetY: number, duration: number = 1200) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  function step(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);

  const navigate = (page: PageId, tab?: string, section?: string) => {
    setCurrentPage(page);
    setActiveTab(tab || null);
    setScrollToSection(section || null);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Плавная прокрутка к секции после рендера страницы
  useEffect(() => {
    if (scrollToSection) {
      // 300ms — страница успевает отрендериться
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollToSection);
        if (el) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 130;
          const elementTop = el.getBoundingClientRect().top + window.scrollY;
          const offset = elementTop - headerHeight - 24;

          // Кастомная плавная прокрутка 1200ms
          smoothScrollTo(offset, 1200);

          // Подсветка появляется когда прокрутка завершена (1200ms + 400ms буфер)
          setTimeout(() => {
            el.classList.add('section-highlight');
            setTimeout(() => el.classList.remove('section-highlight'), 2500);
          }, 1600);
        }
        setScrollToSection(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [scrollToSection, currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'communities': return <CommunitiesPage />;
      case 'events': return <EventsPage />;
      case 'projectoria': return <ProjectoriaPage />;
      case 'journal': return <JournalPage />;
      case 'office': return <OfficePage />;
      case 'faq': return <FaqPage />;
      default: return <HomePage />;
    }
  };

  return (
    <NavContext.Provider value={{ currentPage, activeTab, scrollToSection, navigate }}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </NavContext.Provider>
  );
}