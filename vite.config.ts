import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import type { CmsJson } from "./src/data/mergeCmsContent";
import { buildContentData } from "./src/data/mergeCmsContent";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function mergeContentToDistPlugin() {
  return {
    name: "merge-content-to-dist",
    closeBundle() {
      const cmsPath = path.join(__dirname, "data/content.json");
      const cms = JSON.parse(fs.readFileSync(cmsPath, "utf8")) as CmsJson;
      const merged = buildContentData(cms);
      const outDir = path.join(__dirname, "dist/data");
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(
        path.join(outDir, "content.json"),
        JSON.stringify(merged, null, 2),
        "utf8"
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), mergeContentToDistPlugin()],
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      /** Один файл с Decap: корень репозитория data/content.json */
      "@cms/content.json": path.resolve(__dirname, "data/content.json"),
    },
  },
});
