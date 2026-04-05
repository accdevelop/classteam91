/**
 * Генерирует public/admin/config.yml (Decap CMS).
 * Запуск: node scripts/generate-decap-config.mjs
 *
 * Сайт не на Netlify: GitHub OAuth по умолчанию идёт на api.netlify.com → во всплывающем окне «Not Found».
 * Нужен внешний прокси (см. https://decapcms.org/docs/backends-overview/ — «Using Github with an OAuth Proxy»),
 * например https://github.com/sterlingwes/decap-proxy
 *
 * После деплоя прокси:
 *   set DECAP_OAUTH_BASE_URL=https://ваш-worker.workers.dev
 *   node scripts/generate-decap-config.mjs
 * В GitHub OAuth App: Homepage = тот же URL; Authorization callback URL = {BASE}/callback
 * (не URL /admin/ на Timeweb).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/** Публичный домен без слэша в конце. Decap: site_url = {origin}/admin/ — должен совпадать с URL админки в браузере. */
const PUBLIC_SITE_ORIGIN = (
  typeof process.env.PUBLIC_SITE_ORIGIN === "string"
    ? process.env.PUBLIC_SITE_ORIGIN.replace(/\/+$/, "")
    : "https://classteam91.ru"
);

const str = (label, name, extra = {}) => ({ label, name, widget: "string", ...extra });
const text = (label, name, extra = {}) => ({ label, name, widget: "text", ...extra });
const md = (label, name, extra = {}) => ({ label, name, widget: "markdown", ...extra });
const num = (label, name, extra = {}) => ({ label, name, widget: "number", ...extra });

/** Список строк → в JSON [{ line: "..." }]; loadContent нормализует в string[] */
function linesList(label, name, singular) {
  return {
    label,
    name,
    widget: "list",
    label_singular: singular,
    field: { label: "Строка", name: "line", widget: "string" },
  };
}

const modalFields = [
  str("Заголовок кнопки / карточки", "title"),
  text("Краткое описание (превью)", "preview_text", { required: false }),
  md("Полный текст", "full_content"),
  {
    label: "Тип контента",
    name: "content_type",
    widget: "select",
    options: ["text", "image", "video", "link", "gallery"],
    default: "text",
  },
  {
    label: "Медиа",
    name: "media",
    widget: "list",
    required: false,
    fields: [
      str("URL", "url"),
      str("Описание", "alt", { required: false }),
    ],
  },
  str("Внешняя ссылка", "external_link", { required: false }),
  str("Иконка/эмодзи", "icon", { required: false, default: "📌" }),
];

const homeFields = [
  str("Бейдж над заголовком", "hero_badge"),
  str("Заголовок — строка 1", "hero_title_line1"),
  str("Акцент в заголовке", "hero_title_accent"),
  str("Заголовок — строка 2", "hero_title_line2"),
  str("Текст основной кнопки", "primary_cta"),
  str("Текст второй кнопки", "secondary_cta"),
  str("Заголовок описания", "description_title"),
  text("Текст описания", "description_text"),
  str("Статус программы", "program_status"),
  str("Заголовок блока презентации", "presentation_title"),
  text("Подзаголовок презентации", "presentation_subtitle"),
  str("Заголовок «О практике»", "about_title"),
  linesList("Абзацы «О практике»", "about_paragraphs", "абзац"),
  str("Заголовок карточки направлений", "directions_card_title"),
  str("Подпись под направлениями", "directions_footer"),
  linesList("Ключевые направления", "directions", "пункт"),
  str("Заголовок призыва (CTA)", "cta_title"),
  text("Подзаголовок CTA", "cta_subtitle"),
  str("Текст кнопки CTA", "cta_button"),
  str("Заголовок секции тьюторов", "tutors_section_title"),
  text("Подзаголовок секции тьюторов", "tutors_section_subtitle"),
  str("Заголовок блока контактов", "contacts_section_title"),
  text("Подзаголовок блока контактов", "contacts_section_subtitle"),
  str("Заголовок плейсхолдера карты", "map_placeholder_title"),
  str("Подзаголовок карты", "map_placeholder_subtitle"),
  str("Заголовок «Локация в школе»", "location_section_title"),
  text("Подзаголовок локации", "location_section_subtitle"),
  {
    label: "Статистика",
    name: "stats",
    widget: "list",
    label_singular: "пункт",
    fields: [
      str("Число / значение", "number"),
      str("Подпись", "label"),
      str("Класс цвета (Tailwind)", "color"),
    ],
  },
  {
    label: "Карточки преимуществ",
    name: "features",
    widget: "list",
    label_singular: "карточка",
    fields: [
      str("Иконка (Lucide)", "icon", { hint: "Target, Compass, BookOpen…" }),
      str("Заголовок", "title"),
      text("Описание", "desc"),
      str("Градиент (Tailwind)", "color"),
    ],
  },
  {
    label: "Тьюторы (карточки на главной)",
    name: "tutors",
    widget: "list",
    label_singular: "тьютор",
    fields: [str("Роль", "role"), str("Зона", "area")],
  },
  {
    label: "Помещения на главной",
    name: "rooms",
    widget: "list",
    label_singular: "помещение",
    required: false,
    fields: [str("Название", "name"), str("Где находится", "loc"), text("Описание", "desc")],
  },
];

const communitiesPageFields = [
  str("Заголовок героя", "hero_title"),
  text("Подзаголовок героя", "hero_subtitle"),
  str("Секция: учащиеся — заголовок", "students_section_title"),
  text("Секция: учащиеся — подзаголовок", "students_section_subtitle"),
  str("Секция: тьюторы — заголовок", "tutors_section_title"),
  text("Секция: тьюторы — подзаголовок", "tutors_section_subtitle"),
  str("Секция: родители — заголовок", "parents_section_title"),
  text("Секция: родители — подзаголовок", "parents_section_subtitle"),
  str("Секция: партнёры — заголовок", "partners_section_title"),
  text("Секция: партнёры — подзаголовок", "partners_section_subtitle"),
  {
    label: "Классы (таблица учащихся)",
    name: "students",
    widget: "list",
    label_singular: "класс",
    fields: [str("Класс", "grade"), num("Численность", "count", { value_type: "int" }), str("Направление", "focus")],
  },
  {
    label: "Список тьюторов (вкладка)",
    name: "tutorsList",
    widget: "list",
    label_singular: "тьютор",
    fields: [str("Предмет / роль", "subject"), str("Направление", "area")],
  },
  {
    label: "Роли родителей",
    name: "parentRoles",
    widget: "list",
    label_singular: "роль",
    fields: [str("Название", "title"), text("Описание", "desc")],
  },
  {
    label: "Партнёры",
    name: "partnersList",
    widget: "list",
    label_singular: "партнёр",
    fields: [str("Название", "name"), str("Тип", "type"), text("Описание", "desc")],
  },
];

const journalFields = [
  str("Заголовок героя", "hero_title"),
  text("Подзаголовок героя", "hero_subtitle"),
  str("Интервью — заголовок секции", "interviews_section_title"),
  text("Интервью — подзаголовок", "interviews_section_subtitle"),
  str("Династии — заголовок", "dynasties_section_title"),
  text("Династии — подзаголовок", "dynasties_section_subtitle"),
  str("Азбука — заголовок", "alphabet_section_title"),
  text("Азбука — подзаголовок", "alphabet_section_subtitle"),
  str("Предприятия — заголовок", "enterprises_section_title"),
  text("Предприятия — подзаголовок", "enterprises_section_subtitle"),
  {
    label: "Выпуски журнала",
    name: "editions",
    widget: "list",
    label_singular: "выпуск",
    fields: [
      str("Номер", "number"),
      str("Дата", "date"),
      str("Название", "title"),
      num("Страниц", "pages", { value_type: "int" }),
    ],
  },
  {
    label: "Анонсы интервью (карточки)",
    name: "interviews",
    widget: "list",
    label_singular: "интервью",
    fields: [
      str("Профессия", "profession"),
      str("Сфера", "field"),
      text("Цитата", "quote"),
      str("Текст кнопки", "read_more_label"),
    ],
  },
  {
    label: "Династии",
    name: "dynasties",
    widget: "list",
    label_singular: "династия",
    fields: [
      str("Название", "title"),
      str("Профессия", "profession"),
      num("Поколений", "generations", { value_type: "int" }),
      text("Описание", "desc"),
    ],
  },
  {
    label: "Азбука профессий",
    name: "alphabetLetters",
    widget: "list",
    label_singular: "буква",
    fields: [str("Буква", "letter"), linesList("Профессии", "professions", "профессия")],
  },
];

const projectoriaFields = [
  str("Заголовок героя", "hero_title"),
  text("Подзаголовок героя", "hero_subtitle"),
  str("Локация — заголовок", "location_section_title"),
  text("Локация — подзаголовок", "location_section_subtitle"),
  str("Карта — заголовок", "map_card_title"),
  str("Карта — строка 1", "map_placeholder_line1"),
  str("Карта — строка 2", "map_placeholder_line2"),
  str("Подпись под картой", "map_footer"),
  str("Практики — заголовок", "practices_section_title"),
  text("Практики — подзаголовок", "practices_section_subtitle"),
  str("Фирмы — заголовок", "firms_section_title"),
  text("Фирмы — подзаголовок", "firms_section_subtitle"),
  str("Диалоги — заголовок", "dialogs_section_title"),
  text("Диалоги — подзаголовок", "dialogs_section_subtitle"),
  str("Презентации — заголовок", "presentations_section_title"),
  text("Презентации — подзаголовок", "presentations_section_subtitle"),
  str("Подпись кнопки скачивания", "download_label"),
  {
    label: "Помещения проектории",
    name: "location_rooms",
    widget: "list",
    label_singular: "помещение",
    fields: [str("Название", "name"), str("Где", "loc"), text("Описание", "desc")],
  },
  {
    label: "Этажи (план)",
    name: "floors",
    widget: "list",
    label_singular: "этаж",
    fields: [str("Этаж", "floor"), str("Помещения", "rooms")],
  },
  {
    label: "Проектные практики (карточки)",
    name: "practices",
    widget: "list",
    label_singular: "практика",
    fields: [str("Название", "title"), str("Класс", "grade"), text("Описание", "desc"), str("Статус", "stage")],
  },
  {
    label: "Учебные фирмы",
    name: "firms",
    widget: "list",
    label_singular: "фирма",
    fields: [
      str("Название", "name"),
      str("Направление", "area"),
      num("Участников", "members", { value_type: "int" }),
      text("Описание", "desc"),
    ],
  },
  {
    label: "Диалоги с мастерами",
    name: "dialogs",
    widget: "list",
    label_singular: "диалог",
    fields: [
      str("Профессия", "profession"),
      str("Сфера", "field"),
      str("Дата", "date"),
      str("Тема", "topic"),
    ],
  },
  {
    label: "Презентации",
    name: "presentations",
    widget: "list",
    label_singular: "презентация",
    fields: [str("Название", "title"), str("Формат", "format"), text("Описание", "desc")],
  },
];

const eventsPageFields = [
  str("Заголовок героя", "hero_title"),
  text("Подзаголовок героя", "hero_subtitle"),
  str("Афиша — заголовок", "poster_section_title"),
  text("Афиша — подзаголовок", "poster_section_subtitle"),
  str("Фото — заголовок", "photos_section_title"),
  text("Фото — подзаголовок", "photos_section_subtitle"),
  str("Видео — заголовок", "video_section_title"),
  text("Видео — подзаголовок", "video_section_subtitle"),
  str("Рефлексия — заголовок", "reflection_section_title"),
  text("Рефлексия — подзаголовок", "reflection_section_subtitle"),
  {
    label: "Мероприятия (афиша)",
    name: "events",
    widget: "list",
    label_singular: "мероприятие",
    fields: [
      str("Название", "title"),
      str("Дата", "date"),
      str("Время", "time"),
      str("Место", "location"),
      str("Статус", "status"),
      text("Описание", "desc"),
      num("Участников", "participants", { value_type: "int" }),
    ],
  },
  {
    label: "Фотоотчёты",
    name: "photos",
    widget: "list",
    label_singular: "альбом",
    fields: [str("Название", "title"), num("Фото", "count", { value_type: "int" }), str("Дата", "date")],
  },
  {
    label: "Видео",
    name: "videos",
    widget: "list",
    label_singular: "ролик",
    fields: [str("Название", "title"), str("Длительность", "duration"), str("Дата", "date")],
  },
  {
    label: "Рефлексия (отзывы)",
    name: "reflections",
    widget: "list",
    label_singular: "отзыв",
    fields: [str("Автор", "name"), text("Текст", "text")],
  },
];

const officeFields = [
  str("Заголовок героя", "hero_title"),
  text("Подзаголовок героя", "hero_subtitle"),
  str("Тесты — заголовок", "tests_section_title"),
  text("Тесты — подзаголовок", "tests_section_subtitle"),
  str("Самоанализ — заголовок", "analysis_section_title"),
  text("Самоанализ — подзаголовок", "analysis_section_subtitle"),
  str("Рекомендации — заголовок", "recommendations_section_title"),
  text("Рекомендации — подзаголовок", "recommendations_section_subtitle"),
  str("Маршруты — заголовок", "routes_section_title"),
  text("Маршруты — подзаголовок", "routes_section_subtitle"),
  str("Проекты — заголовок", "projects_section_title"),
  text("Проекты — подзаголовок", "projects_section_subtitle"),
  str("Вузы — заголовок", "education_section_title"),
  text("Вузы — подзаголовок", "education_section_subtitle"),
  str("Текст кнопки «Пройти тест»", "test_button_label"),
  {
    label: "Тесты (карточки)",
    name: "tests",
    widget: "list",
    label_singular: "тест",
    fields: [
      str("Название", "name"),
      text("Описание", "desc"),
      str("Время", "time"),
      num("Вопросов", "questions", { value_type: "int" }),
    ],
  },
  {
    label: "Шаги самоанализа",
    name: "analysisSteps",
    widget: "list",
    label_singular: "шаг",
    fields: [
      num("Номер шага", "step", { value_type: "int" }),
      str("Заголовок", "title"),
      text("Описание", "desc"),
    ],
  },
  {
    label: "Рекомендации по профилям",
    name: "recommendations",
    widget: "list",
    label_singular: "группа",
    fields: [str("Заголовок группы", "title"), linesList("Пункты", "items", "пункт")],
  },
  {
    label: "Профориентационные маршруты",
    name: "routes",
    widget: "list",
    label_singular: "маршрут",
    fields: [str("Название", "name"), linesList("Шаги", "steps", "шаг")],
  },
  {
    label: "Проекты",
    name: "projects",
    widget: "list",
    label_singular: "проект",
    fields: [str("Название", "name"), text("Описание", "desc"), str("Срок", "duration")],
  },
  {
    label: "Образовательные учреждения",
    name: "educationInstitutions",
    widget: "list",
    label_singular: "учреждение",
    fields: [
      str("Название", "name"),
      str("Тип", "type"),
      linesList("Направления / области", "areas", "пункт"),
    ],
  },
];

const faqFields = [
  str("Заголовок героя", "hero_title"),
  text("Подзаголовок героя", "hero_subtitle"),
  str("Секция FAQ — заголовок", "faq_section_title"),
  str("Форма вопроса — заголовок", "ask_section_title"),
  text("Сообщение после отправки", "success_message"),
  str("Как отвечаем — заголовок", "how_we_title"),
  linesList("Как отвечаем — пункты", "how_we_items", "пункт"),
  {
    label: "Вопросы и ответы",
    name: "faq_items",
    widget: "list",
    label_singular: "пара",
    fields: [str("Вопрос", "q"), text("Ответ", "a")],
  },
];

const footerFields = [
  str("Слоган", "tagline"),
  str("Доп. строка слогана", "tagline_extra"),
  str("Бейдж года", "year_badge"),
  str("Копирайт", "copyright"),
  str("Город", "city"),
  str("Плейсхолдер карты в подвале", "map_placeholder"),
];

const rootFields = [
  { label: "Главная страница", name: "home", widget: "object", collapsed: false, fields: homeFields },
  {
    label: "Сообщества (тексты раздела)",
    name: "communitiesPage",
    widget: "object",
    collapsed: true,
    fields: communitiesPageFields,
  },
  { label: "Журнал «Мегаполис»", name: "journal", widget: "object", collapsed: true, fields: journalFields },
  { label: "Проектория", name: "projectoria", widget: "object", collapsed: true, fields: projectoriaFields },
  { label: "События", name: "eventsPage", widget: "object", collapsed: true, fields: eventsPageFields },
  { label: "Офис «Профи-Старт»", name: "office", widget: "object", collapsed: true, fields: officeFields },
  { label: "Вопрос–ответ", name: "faq", widget: "object", collapsed: true, fields: faqFields },
  { label: "Подвал сайта", name: "footer", widget: "object", collapsed: true, fields: footerFields },
  {
    label: "Карточки (общие / классы / проекты и т.д.)",
    name: "cards",
    widget: "list",
    label_singular: "карточка",
    fields: [
      str("Заголовок", "title"),
      text("Описание", "description"),
      str("Текст кнопки", "button_text", { default: "Подробнее" }),
      str("Ссылка", "link", { required: false }),
      text("Текст модалки (простой)", "modal_content", { required: false }),
      num("Число (напр. учащихся)", "count", { required: false, value_type: "int" }),
      str("Подзаголовок", "subtitle", { required: false }),
      str("Статус этапа", "stage", { required: false }),
    ],
  },
  {
    label: "Контакты",
    name: "contacts",
    widget: "list",
    label_singular: "контакт",
    fields: [
      str("Тип", "type"),
      str("Значение", "value"),
      str("Иконка", "icon", { required: false }),
      str("Подпись", "sub", { required: false }),
    ],
  },
  {
    label: "Текстовые блоки",
    name: "text_blocks",
    widget: "list",
    label_singular: "блок",
    fields: [str("Заголовок", "heading"), md("Содержание", "content")],
  },
  {
    label: "Проектные практики — модалки «Подробнее»",
    name: "project_practices",
    widget: "list",
    label_singular: "практика",
    fields: structuredClone(modalFields),
  },
  {
    label: "Сообщества — модалки классов (ключ в JSON: communities)",
    name: "communities",
    widget: "list",
    label_singular: "класс",
    fields: [
      str("Название", "name"),
      text("Описание", "description"),
      md("Полная информация", "full_info", { required: false }),
      str("Расписание", "schedule", { required: false }),
      str("Ссылка на запись", "signup_link", { required: false }),
      str("Контакты руководителя", "contact", { required: false }),
    ],
  },
  {
    label: "Журнал — предприятия (модалки)",
    name: "journal_companies",
    widget: "list",
    label_singular: "предприятие",
    fields: [
      str("Название", "name"),
      text("Кратко", "short_desc"),
      md("Полная статья", "full_article"),
      str("Источник", "source_link", { required: false }),
    ],
  },
  {
    label: "Журнал — интервью (модалки)",
    name: "journal_interviews",
    widget: "list",
    label_singular: "интервью",
    fields: [
      str("Заголовок", "title"),
      text("Анонс", "preview"),
      md("Полный текст", "content"),
      { label: "Фото", name: "media", widget: "image", required: false },
    ],
  },
  {
    label: "События — модалки по клику на афишу (ключ в JSON: events)",
    name: "events",
    widget: "list",
    label_singular: "событие",
    fields: [
      str("Заголовок", "title"),
      md("Полный текст", "full_content"),
      {
        label: "Тип контента",
        name: "content_type",
        widget: "select",
        options: ["text", "image", "video", "link", "gallery"],
        default: "text",
      },
      {
        label: "Медиа",
        name: "media",
        widget: "list",
        required: false,
        fields: [str("URL", "url"), str("Описание", "alt", { required: false })],
      },
      str("Внешняя ссылка", "external_link", { required: false }),
    ],
  },
  {
    label: "Офис — модалки по кнопке теста",
    name: "office_features",
    widget: "list",
    label_singular: "тест",
    fields: structuredClone(modalFields),
  },
];

/** Прокси GitHub OAuth (Cloudflare Worker). Без этого на Timeweb снова «Not Found» в окне входа. */
const OAUTH_PROXY_DEFAULT = "https://decap-proxy.school91-decap.workers.dev";

const oauthBase = (() => {
  const fromEnv =
    typeof process.env.DECAP_OAUTH_BASE_URL === "string"
      ? process.env.DECAP_OAUTH_BASE_URL.replace(/\/+$/, "")
      : "";
  if (fromEnv === "none" || fromEnv === "off") return "";
  return fromEnv || OAUTH_PROXY_DEFAULT;
})();

const backend = {
  name: "github",
  repo: "lunarcelestia/school-site",
  branch: "main",
  auth_scope: "repo",
  client_id: "Ov23lioi2UR34VfG5JHG",
};
if (oauthBase) {
  backend.base_url = oauthBase;
  backend.auth_endpoint = "auth";
}

const config = {
  // URL панели CMS в браузере; OAuth callback по-прежнему на base_url прокси (Cloudflare Worker).
  site_url: `${PUBLIC_SITE_ORIGIN}/admin/`,
  backend,
  media_folder: "public/images",
  public_folder: "/images",
  collections: [
    {
      name: "content",
      label: "Контент сайта",
      files: [
        {
          label: "Весь сайт (data/content.json)",
          name: "site-content",
          file: "data/content.json",
          format: "json",
          fields: rootFields,
        },
      ],
    },
  ],
};

const outPath = path.join(root, "public/admin/config.yml");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(
  outPath,
  YAML.stringify(config, { lineWidth: 100, aliasDuplicateObjects: false }),
  "utf8"
);
console.log("Written", outPath);
