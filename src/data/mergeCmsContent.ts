import type {
  ContentData,
  FaqContent,
  HomeContent,
  JournalContent,
  OfficeContent,
} from "@/types/content";
import { denormalizeLineList } from "./cmsLineLists";
import defaults from "./content.defaults.json";

type Json = Record<string, unknown>;

/** Частичный JSON из data/content.json (Decap) */
export type CmsJson = Partial<ContentData> & {
  communities?: ContentData["community_groups"];
  events?: ContentData["event_modal_items"];
};

function mergeHome(cms: Json | undefined, def: HomeContent): HomeContent {
  const raw = { ...def, ...(cms as HomeContent | undefined) };
  return {
    ...raw,
    about_paragraphs: denormalizeLineList(raw.about_paragraphs, def.about_paragraphs),
    directions: denormalizeLineList(raw.directions, def.directions),
  };
}

function mergeFaq(cms: Json | undefined, def: FaqContent): FaqContent {
  const raw = { ...def, ...(cms as FaqContent | undefined) };
  return {
    ...raw,
    how_we_items: denormalizeLineList(raw.how_we_items, def.how_we_items),
  };
}

function mergeJournal(cms: Json | undefined, def: JournalContent): JournalContent {
  const raw = { ...def, ...(cms as JournalContent | undefined) };
  const lettersRaw = raw.alphabetLetters ?? def.alphabetLetters;
  const lettersDef = def.alphabetLetters;
  return {
    ...raw,
    alphabetLetters: lettersRaw.map((letter, i) => {
      const d = lettersDef[i];
      return {
        ...letter,
        professions: denormalizeLineList(
          letter.professions,
          d ? denormalizeLineList(d.professions, []) : []
        ),
      };
    }),
  };
}

function mergeOffice(cms: Json | undefined, def: OfficeContent): OfficeContent {
  const raw = { ...def, ...(cms as OfficeContent | undefined) };
  return {
    ...raw,
    recommendations: raw.recommendations.map((r, i) => {
      const d = def.recommendations[i];
      return {
        ...r,
        items: denormalizeLineList(r.items, d ? denormalizeLineList(d.items, []) : []),
      };
    }),
    routes: raw.routes.map((r, i) => {
      const d = def.routes[i];
      return {
        ...r,
        steps: denormalizeLineList(r.steps, d ? denormalizeLineList(d.steps, []) : []),
      };
    }),
    educationInstitutions: raw.educationInstitutions.map((e, i) => {
      const d = def.educationInstitutions[i];
      return {
        ...e,
        areas: denormalizeLineList(e.areas, d ? denormalizeLineList(d.areas, []) : []),
      };
    }),
  };
}

const d = defaults as unknown as ContentData;

/**
 * Слияние data/content.json с defaults + приведение списков Decap (`{line}`) к string[].
 */
export function buildContentData(cms: CmsJson): ContentData {
  const c = cms as Json;
  return {
    ...d,
    home: mergeHome(c.home as Json | undefined, d.home),
    communitiesPage: mergeCommunitiesPage(c.communitiesPage as Json | undefined, d.communitiesPage),
    journal: mergeJournal(c.journal as Json | undefined, d.journal),
    projectoria: mergeProjectoria(c.projectoria as Json | undefined, d.projectoria),
    eventsPage: mergeEventsPage(c.eventsPage as Json | undefined, d.eventsPage),
    office: mergeOffice(c.office as Json | undefined, d.office),
    faq: mergeFaq(c.faq as Json | undefined, d.faq),
    footer: { ...d.footer, ...(c.footer as ContentData["footer"] | undefined) },
    cards: cms.cards ?? d.cards,
    contacts: cms.contacts ?? d.contacts,
    text_blocks: cms.text_blocks ?? d.text_blocks,
    community_groups: cms.communities ?? d.community_groups,
    journal_companies: cms.journal_companies ?? d.journal_companies,
    journal_interviews: cms.journal_interviews ?? d.journal_interviews,
    event_modal_items: cms.events ?? d.event_modal_items,
    office_features: cms.office_features ?? d.office_features,
    project_practices: cms.project_practices ?? d.project_practices,
  };
}

function mergeCommunitiesPage(cms: Json | undefined, def: ContentData["communitiesPage"]) {
  return { ...def, ...(cms as ContentData["communitiesPage"] | undefined) };
}

function mergeProjectoria(cms: Json | undefined, def: ContentData["projectoria"]) {
  return { ...def, ...(cms as ContentData["projectoria"] | undefined) };
}

function mergeEventsPage(cms: Json | undefined, def: ContentData["eventsPage"]) {
  return { ...def, ...(cms as ContentData["eventsPage"] | undefined) };
}
