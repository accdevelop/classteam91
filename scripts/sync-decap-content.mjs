/**
 * Дополняет data/content.json недостающими разделами из content.defaults.json
 * и переводит списки строк в формат Decap [{ line: "..." }].
 * Запуск: node scripts/sync-decap-content.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function deepMerge(a, b) {
  if (b === null || b === undefined) return structuredClone(a);
  if (Array.isArray(b)) return structuredClone(b);
  if (typeof b !== "object") return structuredClone(b);
  const aObj = a && typeof a === "object" && !Array.isArray(a) ? a : {};
  const out = structuredClone(aObj);
  for (const k of Object.keys(b)) {
    const bv = b[k];
    if (bv === undefined) continue;
    if (
      k in aObj &&
      typeof aObj[k] === "object" &&
      !Array.isArray(aObj[k]) &&
      bv !== null &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      out[k] = deepMerge(aObj[k], bv);
    } else {
      out[k] = structuredClone(bv);
    }
  }
  return out;
}

function stringsToLineObjects(arr) {
  if (!Array.isArray(arr)) return arr;
  if (arr.length && typeof arr[0] === "object" && arr[0]?.line !== undefined) return arr;
  return arr.map((s) => ({ line: typeof s === "string" ? s : String(s) }));
}

function toDecapShape(data) {
  const d = structuredClone(data);
  if (d.home) {
    d.home.about_paragraphs = stringsToLineObjects(d.home.about_paragraphs);
    d.home.directions = stringsToLineObjects(d.home.directions);
  }
  if (d.faq?.how_we_items) {
    d.faq.how_we_items = stringsToLineObjects(d.faq.how_we_items);
  }
  if (d.journal?.alphabetLetters) {
    for (const letter of d.journal.alphabetLetters) {
      letter.professions = stringsToLineObjects(letter.professions);
    }
  }
  if (d.office?.recommendations) {
    for (const r of d.office.recommendations) {
      r.items = stringsToLineObjects(r.items);
    }
  }
  if (d.office?.routes) {
    for (const r of d.office.routes) {
      r.steps = stringsToLineObjects(r.steps);
    }
  }
  if (d.office?.educationInstitutions) {
    for (const e of d.office.educationInstitutions) {
      e.areas = stringsToLineObjects(e.areas);
    }
  }
  return d;
}

const defaultsPath = path.join(root, "src/data/content.defaults.json");
const cmsPath = path.join(root, "data/content.json");

const defaults = JSON.parse(fs.readFileSync(defaultsPath, "utf8"));
const cms = JSON.parse(fs.readFileSync(cmsPath, "utf8"));

const pageBundle = deepMerge(
  {
    home: defaults.home,
    communitiesPage: defaults.communitiesPage,
    journal: defaults.journal,
    projectoria: defaults.projectoria,
    eventsPage: defaults.eventsPage,
    office: defaults.office,
    faq: defaults.faq,
    footer: defaults.footer,
  },
  {
    home: cms.home,
    communitiesPage: cms.communitiesPage,
    journal: cms.journal,
    projectoria: cms.projectoria,
    eventsPage: cms.eventsPage,
    office: cms.office,
    faq: cms.faq,
    footer: cms.footer,
  }
);

const base = {
  ...pageBundle,
  cards: cms.cards ?? defaults.cards,
  contacts: cms.contacts ?? defaults.contacts,
  text_blocks: cms.text_blocks ?? defaults.text_blocks,
  project_practices: cms.project_practices ?? defaults.project_practices,
  communities: cms.communities ?? defaults.community_groups,
  journal_companies: cms.journal_companies ?? defaults.journal_companies,
  journal_interviews: cms.journal_interviews ?? defaults.journal_interviews,
  events: cms.events ?? defaults.event_modal_items,
  office_features: cms.office_features ?? defaults.office_features,
};

const out = toDecapShape(base);
fs.writeFileSync(cmsPath, JSON.stringify(out, null, 2), "utf8");
console.log("Written", cmsPath);
