import { statusLabel, type KvalitetsplanRecord } from "@/lib/kvalitetsplan";

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildKvalitetsplanExport(plan: KvalitetsplanRecord) {
  const p = plan.project;
  const title = `Kvalitetsplan – ${p.fastighetsbeteckning || p.adress || "projekt"}`;
  const baseFileName = `kvalitetsplan-${(p.fastighetsbeteckning || "projekt")
    .replaceAll(" ", "-")
    .toLowerCase()}`;

  const lines = [
    title,
    "",
    "1. Projektinformation",
    `Fastighetsbeteckning: ${p.fastighetsbeteckning || "-"}`,
    `Adress: ${p.adress || "-"}, ${p.postnr || ""} ${p.ort || ""}`.trim(),
    `Kontaktperson: ${p.kontaktperson || "-"} (${p.kontaktMobil || "-"}, ${p.kontaktEpost || "-"})`,
    `Beställare: ${p.bestallareNamn || "-"} (${p.bestallareOrgNr || "-"})`,
    `Entreprenör: ${p.entreprenorNamn || "-"} (${p.entreprenorOrgNr || "-"})`,
    `Projektledare: ${p.projektledare || "-"}`,
    `KMA: ${p.kma || "-"}`,
    `Arbetsledare: ${p.arbetsledare || "-"}`,
    `Skyddsombud: ${p.skyddsombud || "-"}`,
    `Entreprenadform: ${
      p.entreprenadform === "total"
        ? "Totalentreprenad"
        : p.entreprenadform === "utforande"
          ? "Utförandeentreprenad"
          : "-"
    }`,
    `Period: ${p.startDatum || "-"} – ${p.slutDatum || "-"}`,
    `Projektbeskrivning: ${p.projektbeskrivning || "-"}`,
    "",
    "2. Kvalitetspolicy / notering",
    p.policyNote || "-",
    "",
    "3. Kontrollmoment (egenkontroll)",
    ...plan.checklist.map(
      (item) =>
        `- ${item.title}: ${statusLabel(item.status)} | Datum: ${item.date || "-"} | Sign: ${item.sign || "-"}${
          item.note ? ` | Not: ${item.note}` : ""
        }`,
    ),
    "",
    `Uppdaterad: ${new Date(plan.updatedAt).toLocaleString("sv-SE")}`,
  ];

  const text = lines.join("\n");
  const html = `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #18181b; line-height: 1.5; }
    h1 { font-size: 24px; margin-bottom: 24px; }
    h2 { font-size: 16px; margin-top: 24px; color: #4338ca; }
    pre { white-space: pre-wrap; font-family: inherit; }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <pre>${escapeHtml(text)}</pre>
</body>
</html>`;

  return { title, baseFileName, text, html };
}
