import { statusLabel, PRODUCT_TITLE, type PlanRecord } from "./plan";

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (ch) => {
    if (ch === "&") return "&#38;";
    if (ch === "<") return "&#60;";
    if (ch === ">") return "&#62;";
    if (ch === '"') return "&#34;";
    return "&#39;";
  });
}

export function buildPlanExport(plan: PlanRecord) {
  const p = plan.project;
  const title = `${PRODUCT_TITLE} – ${p.fastighetsbeteckning || p.adress || "projekt"}`;
  const baseFileName = `kvalitetsplan-${(p.fastighetsbeteckning || "projekt").replaceAll(" ", "-").toLowerCase()}`;
  const lines = [title, "", plan.policyNote || "-", "", ...plan.checklist.map((i) => `${i.title}: ${statusLabel(i.status)}`)];
  const text = lines.join("\n");
  const html = "<!DOCTYPE html><html lang=sv><head><meta charset=utf-8 /><title>" + escapeHtml(title) + "</title></head><body><pre>" + escapeHtml(text) + "</pre></body></html>";
  return { title, baseFileName, text, html };
}

export const buildKvalitetsplanExport = buildPlanExport;
