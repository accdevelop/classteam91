import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react';
import { useNav } from '../App';
import contentData from '@/data/loadContent';

const footerLinks = [
  { id: 'home' as const, label: 'Главная' },
  { id: 'communities' as const, label: 'Сообщества' },
  { id: 'events' as const, label: 'События' },
  { id: 'projectoria' as const, label: 'Проектория Мегаполис' },
  { id: 'journal' as const, label: 'ЭЖ «Мегаполис»' },
  { id: 'office' as const, label: 'Офис «Профи-Старт»' },
  { id: 'faq' as const, label: 'Вопрос-ответ' },
];

export default function Footer() {
  const { navigate } = useNav();
  const foot = contentData.footer;
  const c = contentData.contacts;

  return (
    <footer className="bg-[#0d1b2a] text-gray-300">
      {/* top accent line */}
      <div className="h-1 bg-gradient-to-r from-[#912F2C] via-[#912F2C] to-[#1a237e]" />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ padding: 'clamp(2rem, 4vw, 4rem) clamp(1rem, 4vw, 5rem)' }}>

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a237e] to-[#5c6bc0] flex items-center justify-center text-white font-extrabold text-lg border-2 border-[#912F2C]/40">
              91
            </div>
            <div>
              <span className="text-white font-black text-base block" style={{ fontFamily: 'Montserrat' }}>
                КЛАСС<span className="text-[#912F2C]">ная</span> КОМАНДА
              </span>
              <span className="text-[11px] text-gray-400">Школа №91 · Санкт-Петербург</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            {foot.tagline}
            {' '}
            {foot.tagline_extra}
          </p>
          <div className="flex items-center gap-2 bg-[#912F2C]/10 border border-[#912F2C]/20 rounded-lg px-3 py-2">
            <Star size={13} className="text-[#912F2C]" />
            <span className="text-[11px] text-[#912F2C] font-semibold">{foot.year_badge}</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-[#912F2C] inline-block" />
            Навигация
          </h4>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => navigate(link.id)}
                  className="text-xs text-gray-400 hover:text-[#912F2C] transition-colors cursor-pointer text-left flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#912F2C] transition-colors shrink-0" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-[#912F2C] inline-block" />
            Контакты
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-xs">
              <MapPin size={14} className="text-[#912F2C] mt-0.5 shrink-0" />
              <span>{c[0]?.value ?? ''}</span>
            </li>
            <li className="flex items-center gap-3 text-xs">
              <Phone size={14} className="text-[#912F2C] shrink-0" />
              <span className="italic text-gray-500">{c[1]?.value ?? ''}</span>
            </li>
            <li className="flex items-center gap-3 text-xs">
              <Mail size={14} className="text-[#912F2C] shrink-0" />
              <span className="italic text-gray-500">{c[2]?.value ?? ''}</span>
            </li>
            <li className="flex items-center gap-3 text-xs">
              <Clock size={14} className="text-[#912F2C] shrink-0" />
              <span>{c[3]?.value ?? ''}</span>
            </li>
          </ul>
        </div>

        {/* Map placeholder */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-[#912F2C] inline-block" />
            Мы на карте
          </h4>
          <div className="w-full h-36 bg-gray-800 rounded-xl flex flex-col items-center justify-center gap-2 border border-gray-700">
            <MapPin size={22} className="text-[#912F2C]" />
            <span className="text-xs text-gray-400 text-center">{foot.map_placeholder}<br />{foot.city}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="w-full px-12 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-gray-600">{foot.copyright}</span>
          <span className="text-xs text-gray-600">{foot.city}</span>
        </div>
      </div>
    </footer>
  );
}
