interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  accent?: boolean;
}

export default function SectionTitle({ title, subtitle, light, accent }: SectionTitleProps) {
  return (
    <div className="text-center mb-10">
      {accent && (
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#912F2C] bg-[#912F2C]/5 border border-[#912F2C]/15 px-4 py-1.5 rounded-full mb-4">
          Школа №91 · КЛАССная КОМАНДА
        </span>
      )}
      <h2
        className={`text-2xl md:text-3xl font-extrabold mb-3 ${light ? 'text-white' : 'text-[#1a237e]'}`}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {title}
      </h2>
      <div className="section-divider mx-auto mb-4" />
      {subtitle && (
        <p className={`max-w-4xl mx-auto text-base leading-relaxed text-center ${light ? 'text-white/70' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}