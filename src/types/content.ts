export interface CardData {
  title: string;
  description: string;
  button_text: string;
  link?: string;
  modal_content?: string;
  /** Карточки классов (учащиеся) */
  count?: number;
  /** Подзаголовок: класс проекта, сектор и т.п. */
  subtitle?: string;
  /** Статус этапа (проектные практики) */
  stage?: string;
}

export interface ContactData {
  type: string;
  value: string;
  icon?: string;
  /** Подпись под значением (режим работы и т.п.) */
  sub?: string;
}

export interface TextBlockData {
  heading: string;
  content: string;
}

export interface HomeFeature {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

export interface HomeStat {
  number: string;
  label: string;
  color: string;
}

export interface HomeTutor {
  role: string;
  area: string;
}

export interface HomeRoom {
  name: string;
  loc: string;
  desc: string;
}

export interface HomeContent {
  hero_badge: string;
  hero_title_line1: string;
  hero_title_accent: string;
  hero_title_line2: string;
  primary_cta: string;
  secondary_cta: string;
  description_title: string;
  description_text: string;
  program_status: string;
  presentation_title: string;
  presentation_subtitle: string;
  about_title: string;
  about_paragraphs: string[];
  directions_card_title: string;
  directions_footer: string;
  directions: string[];
  cta_title: string;
  cta_subtitle: string;
  cta_button: string;
  tutors_section_title: string;
  tutors_section_subtitle: string;
  contacts_section_title: string;
  contacts_section_subtitle: string;
  map_placeholder_title: string;
  map_placeholder_subtitle: string;
  location_section_title: string;
  location_section_subtitle: string;
  features: HomeFeature[];
  stats: HomeStat[];
  tutors: HomeTutor[];
  rooms: HomeRoom[];
}

/** Медиа для модальных окон (картинки, видео, галерея) */
export interface ModalMediaItem {
  url: string;
  alt?: string;
}

/** Проектные практики — полный контент по кнопке «Подробнее» */
export interface ProjectPracticeModal {
  title: string;
  preview_text?: string;
  full_content: string;
  content_type?: "text" | "image" | "video" | "link" | "gallery";
  media?: ModalMediaItem[];
  external_link?: string;
  icon?: string;
}

/** Сообщества (классы) — расширенная информация */
export interface CommunityGroupModal {
  name: string;
  description: string;
  full_info?: string;
  schedule?: string;
  signup_link?: string;
  contact?: string;
}

/** Журнал — предприятия */
export interface JournalCompanyModal {
  name: string;
  short_desc: string;
  full_article: string;
  source_link?: string;
}

/** Журнал — интервью (полный текст в модалке) */
export interface JournalInterviewModal {
  title: string;
  preview: string;
  content: string;
  media?: string;
}

/** События — детали по клику на карточку афиши */
export interface EventModalItem {
  title: string;
  full_content: string;
  content_type?: "text" | "image" | "video" | "link" | "gallery";
  media?: ModalMediaItem[];
  external_link?: string;
}

/** Офис — кнопки тестов */
export interface OfficeFeatureModal {
  title: string;
  preview_text?: string;
  full_content: string;
  content_type?: "text" | "image" | "video" | "link" | "gallery";
  media?: ModalMediaItem[];
  external_link?: string;
}

export interface CommunitiesContent {
  hero_title: string;
  hero_subtitle: string;
  students_section_title: string;
  students_section_subtitle: string;
  tutors_section_title: string;
  tutors_section_subtitle: string;
  parents_section_title: string;
  parents_section_subtitle: string;
  partners_section_title: string;
  partners_section_subtitle: string;
  students: { grade: string; count: number; focus: string }[];
  tutorsList: { subject: string; area: string }[];
  parentRoles: { title: string; desc: string }[];
  partnersList: { name: string; type: string; desc: string }[];
}

export interface JournalEdition {
  number: string;
  date: string;
  title: string;
  pages: number;
}

export interface JournalInterview {
  profession: string;
  field: string;
  quote: string;
  /** Подпись кнопки (например «Читать полностью») */
  read_more_label: string;
}

export interface JournalContent {
  hero_title: string;
  hero_subtitle: string;
  interviews_section_title: string;
  interviews_section_subtitle: string;
  dynasties_section_title: string;
  dynasties_section_subtitle: string;
  alphabet_section_title: string;
  alphabet_section_subtitle: string;
  enterprises_section_title: string;
  enterprises_section_subtitle: string;
  editions: JournalEdition[];
  interviews: JournalInterview[];
  dynasties: { title: string; profession: string; generations: number; desc: string }[];
  alphabetLetters: { letter: string; professions: string[] }[];
}

export interface ProjectoriaRoom {
  name: string;
  loc: string;
  desc: string;
}

export interface ProjectoriaFloor {
  floor: string;
  rooms: string;
}

export interface ProjectoriaContent {
  hero_title: string;
  hero_subtitle: string;
  location_section_title: string;
  location_section_subtitle: string;
  map_card_title: string;
  map_placeholder_line1: string;
  map_placeholder_line2: string;
  map_footer: string;
  practices_section_title: string;
  practices_section_subtitle: string;
  firms_section_title: string;
  firms_section_subtitle: string;
  dialogs_section_title: string;
  dialogs_section_subtitle: string;
  presentations_section_title: string;
  presentations_section_subtitle: string;
  download_label: string;
  location_rooms: ProjectoriaRoom[];
  floors: ProjectoriaFloor[];
  practices: { title: string; grade: string; desc: string; stage: string }[];
  firms: { name: string; area: string; members: number; desc: string }[];
  dialogs: { profession: string; field: string; date: string; topic: string }[];
  presentations: { title: string; format: string; desc: string }[];
}

export interface EventsContent {
  hero_title: string;
  hero_subtitle: string;
  poster_section_title: string;
  poster_section_subtitle: string;
  photos_section_title: string;
  photos_section_subtitle: string;
  video_section_title: string;
  video_section_subtitle: string;
  reflection_section_title: string;
  reflection_section_subtitle: string;
  events: {
    title: string;
    date: string;
    time: string;
    location: string;
    status: string;
    desc: string;
    participants: number;
  }[];
  photos: { title: string; count: number; date: string }[];
  videos: { title: string; duration: string; date: string }[];
  reflections: { name: string; text: string }[];
}

export interface OfficeContent {
  hero_title: string;
  hero_subtitle: string;
  tests_section_title: string;
  tests_section_subtitle: string;
  analysis_section_title: string;
  analysis_section_subtitle: string;
  recommendations_section_title: string;
  recommendations_section_subtitle: string;
  routes_section_title: string;
  routes_section_subtitle: string;
  projects_section_title: string;
  projects_section_subtitle: string;
  education_section_title: string;
  education_section_subtitle: string;
  test_button_label: string;
  tests: { name: string; desc: string; time: string; questions: number }[];
  analysisSteps: { step: number; title: string; desc: string }[];
  recommendations: { title: string; items: string[] }[];
  routes: { name: string; steps: string[] }[];
  projects: { name: string; desc: string; duration: string }[];
  educationInstitutions: { name: string; type: string; areas: string[] }[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqContent {
  hero_title: string;
  hero_subtitle: string;
  faq_section_title: string;
  ask_section_title: string;
  success_message: string;
  how_we_title: string;
  how_we_items: string[];
  faq_items: FaqItem[];
}

export interface FooterContent {
  tagline: string;
  tagline_extra: string;
  year_badge: string;
  copyright: string;
  city: string;
  map_placeholder: string;
}

export interface ContentData {
  cards: CardData[];
  contacts: ContactData[];
  text_blocks: TextBlockData[];
  home: HomeContent;
  /** Тексты раздела «Сообщества» (герой, вкладки, списки) */
  communitiesPage: CommunitiesContent;
  journal: JournalContent;
  projectoria: ProjectoriaContent;
  /** Афиша, фото, видео, рефлексия */
  eventsPage: EventsContent;
  office: OfficeContent;
  faq: FaqContent;
  footer: FooterContent;
  /** Проектория: 6 кнопок «Подробнее» у практик */
  project_practices: ProjectPracticeModal[];
  /** Сообщества: классы (модалки) — в CMS ключ `communities` */
  community_groups: CommunityGroupModal[];
  journal_companies: JournalCompanyModal[];
  journal_interviews: JournalInterviewModal[];
  /** События: детали — в CMS ключ `events` */
  event_modal_items: EventModalItem[];
  office_features: OfficeFeatureModal[];
}
