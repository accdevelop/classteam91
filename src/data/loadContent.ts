import type { CmsJson } from "./mergeCmsContent";
import { buildContentData } from "./mergeCmsContent";
import cms from "@cms/content.json";

const contentData = buildContentData(cms as CmsJson);

export default contentData;
