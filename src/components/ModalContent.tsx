import { useEffect } from "react";

export interface ModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  contentType?: string;
  media?: { url: string; alt?: string }[];
  externalLink?: string;
}

function renderTextBlocks(text: string) {
  const parts = text.split(/\n\n+/).filter(Boolean);
  return parts.map((block, i) => (
    <p key={i} className="text-gray-700 leading-relaxed mb-3 last:mb-0 whitespace-pre-wrap">
      {block}
    </p>
  ));
}

export default function ModalContent({
  isOpen,
  onClose,
  title,
  content,
  contentType = "text",
  media = [],
  externalLink,
}: ModalContentProps) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const ct = contentType === "markdown" ? "text" : contentType;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100"
        style={{ padding: "1.5rem 1.75rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-4 mb-4">
          <h2 id="modal-title" className="text-xl font-bold text-[#1a237e] pr-2">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-[#912F2C] text-2xl leading-none shrink-0 cursor-pointer"
            aria-label="Закрыть"
          >
            &times;
          </button>
        </div>

        <div className="prose prose-sm max-w-none">
          {(ct === "text" || ct === "link" || !ct) && content ? (
            <div className="text-sm">{renderTextBlocks(content)}</div>
          ) : null}

          {ct === "image" && media[0] ? (
            <img
              src={media[0].url}
              alt={media[0].alt || title}
              className="w-full rounded-lg border border-gray-100"
            />
          ) : null}

          {ct === "video" && media[0] ? (
            <video src={media[0].url} controls className="w-full rounded-lg bg-black">
              <track kind="captions" />
            </video>
          ) : null}

          {ct === "gallery" && media.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {media.map((m, idx) => (
                <img
                  key={idx}
                  src={m.url}
                  alt={m.alt || title}
                  className="w-full rounded-lg border border-gray-100 object-cover"
                />
              ))}
            </div>
          ) : null}

          {externalLink ? (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a237e] hover:text-[#912F2C] underline mt-4 inline-block text-sm font-semibold"
            >
              Перейти по ссылке →
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
