import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const links = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
const missing = links.filter((l) => !ids.has(l));

if (missing.length) {
  console.error("Broken in-page links:", [...new Set(missing)].join(", "));
  process.exit(1);
}
console.log(`OK: ${links.length} in-page links resolve.`);
