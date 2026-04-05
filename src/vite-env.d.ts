/// <reference types="vite/client" />

declare module "@/data/content.defaults.json" {
  import type { ContentData } from "@/types/content";
  const content: ContentData;
  export default content;
}

/** Фрагмент для Decap CMS (файл в корне репозитория data/content.json) */
declare module "@cms/content.json" {
  import type { CommunityGroupModal, ContentData, EventModalItem } from "@/types/content";
  const content: Pick<
    ContentData,
    | "cards"
    | "contacts"
    | "text_blocks"
    | "project_practices"
    | "journal_companies"
    | "journal_interviews"
    | "office_features"
  > & {
    communities?: CommunityGroupModal[];
    events?: EventModalItem[];
  };
  export default content;
}
