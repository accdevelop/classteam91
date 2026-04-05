import { useState, useEffect } from 'react';
import { ChevronDown, Send, User, Mail, MessageSquare, HelpCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { useNav } from '../App';
import contentData from '@/data/loadContent';

export default function FaqPage() {
  const { activeTab: navTab } = useNav();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: '', email: '', recipient: 'office', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const f = contentData.faq;

  useEffect(() => {
    if (navTab === 'ask') {
      setTimeout(() => {
        const el = document.getElementById('ask-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [navTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', recipient: 'office', message: '' });
  };

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="hero-gradient" style={{ padding: '1.5rem clamp(2rem, 5vw, 6rem) 2rem' }}>
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-black text-[#1a237e] mb-4" style={{ fontFamily: 'Montserrat' }}>
            {f.hero_title}
          </h1>
          <p className="text-gray-600 text-base max-w-xl">
            {f.hero_subtitle}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* FAQ Accordion */}
            <div id="faq-section" className="rounded-xl p-1">
              <SectionTitle title={f.faq_section_title} />
              <div className="space-y-3">
                {f.faq_items.map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-center justify-between text-left cursor-pointer transition-colors duration-300 hover:bg-[#912F2C]/5"
                      style={{ padding: '1.75rem 2rem' }}
                    >
                      <div className="flex items-start gap-4">
                        <HelpCircle size={22} className="text-[#912F2C] shrink-0 mt-0.5" />
                        <span className="font-semibold text-base text-[#1a237e] leading-snug">{item.q}</span>
                      </div>
                      <ChevronDown
                        size={22}
                        className={`text-gray-400 shrink-0 ml-4 transition-all duration-500 ease-in-out ${openIndex === i ? 'rotate-180 text-[#912F2C]' : ''}`}
                      />
                    </button>
                    <div className={`accordion-content ${openIndex === i ? 'open' : ''}`}>
                      <div style={{ padding: '0 2rem 2rem 4rem' }} className="text-sm text-gray-600 leading-relaxed">{item.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ask a question form */}
            <div id="ask-form" className="rounded-xl p-1">
              <SectionTitle title={f.ask_section_title} />
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100" style={{ padding: '2.5rem' }}>
                {submitted && (
                  <div className="bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-3 mb-6" style={{ padding: '1.25rem 1.5rem' }}>
                    <Send size={18} />
                    {f.success_message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Имя */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#1a237e] mb-3">
                      <User size={16} />
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Ваше имя"
                      className="w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e]"
                      style={{ padding: '1.25rem 1.5rem', fontSize: '1.05rem' }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#1a237e] mb-3">
                      <Mail size={16} />
                      Электронная почта
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="example@mail.ru"
                      className="w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e]"
                      style={{ padding: '1.25rem 1.5rem', fontSize: '1.05rem' }}
                    />
                  </div>

                  {/* Кому адресован вопрос */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#1a237e] mb-3">
                      Кому адресован вопрос
                    </label>
                    <select
                      value={formData.recipient}
                      onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] bg-white"
                      style={{ padding: '1.25rem 1.5rem', fontSize: '1.05rem' }}
                    >
                      <option value="office">Специалисту офиса «ПРОФИ-СТАРТ»</option>
                      <option value="tutor">Педагогу-тьютору</option>
                      <option value="coordinator">Координатору практики</option>
                    </select>
                  </div>

                  {/* Вопрос */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-[#1a237e] mb-3">
                      <MessageSquare size={16} />
                      Ваш вопрос
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Напишите ваш вопрос здесь..."
                      className="w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] resize-none"
                      style={{ padding: '1.25rem 1.5rem', fontSize: '1.05rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1a237e] to-[#3949ab] hover:from-[#283593] hover:to-[#5c6bc0] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 text-base"
                    style={{ padding: '1.5rem' }}
                  >
                    <Send size={20} />
                    Отправить вопрос
                  </button>
                </form>

                <div className="mt-6 bg-gray-50 rounded-2xl text-sm text-gray-500" style={{ padding: '1.5rem 2rem' }}>
                  <p className="font-semibold text-[#1a237e] mb-2">{f.how_we_title}</p>
                  <ul className="space-y-2">
                    {f.how_we_items.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}