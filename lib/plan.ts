export type ChecklistStatus = "ok" | "ej-ok" | "ej-kontrollerat" | "";
export interface ProjectInfo {
  fastighetsbeteckning: string; adress: string; postnr: string; ort: string;
  kontaktperson: string; kontaktMobil: string; kontaktEpost: string;
  bestallareNamn: string; bestallareOrgNr: string; entreprenorNamn: string; entreprenorOrgNr: string;
  projektledare: string; kma: string; arbetsledare: string; skyddsombud: string;
  basP: string; basU: string; handlaggare: string;
  entreprenadform: "total" | "utforande" | "";
  projektbeskrivning: string; startDatum: string; slutDatum: string;
  narmstaAkut: string; akutTelefon: string; akutAdress: string;
}
export interface PersonRow { id: string; role: string; name: string; mobile: string; email: string; extra: string; }
export interface ChecklistItem { id: string; title: string; status: ChecklistStatus; date: string; sign: string; note: string; }
export interface PlanRecord {
  id: string; updatedAt: string; project: ProjectInfo; policyNote: string;
  organization: PersonRow[]; workers: PersonRow[]; subcontractors: PersonRow[];
  checklist: ChecklistItem[]; safetyRounds: ChecklistItem[]; receipts: PersonRow[];
  approvalName: string; approvalDate: string;
}
export const STORAGE_KEY = "kvalitetsplan-app-v2";
export const PRODUCT_TITLE = "Kvalitetsplan";
export const emptyProject: ProjectInfo = {
  fastighetsbeteckning: "", adress: "", postnr: "", ort: "", kontaktperson: "", kontaktMobil: "", kontaktEpost: "",
  bestallareNamn: "", bestallareOrgNr: "", entreprenorNamn: "", entreprenorOrgNr: "",
  projektledare: "", kma: "", arbetsledare: "", skyddsombud: "", basP: "", basU: "", handlaggare: "",
  entreprenadform: "", projektbeskrivning: "", startDatum: "", slutDatum: "", narmstaAkut: "", akutTelefon: "", akutAdress: "",
};
function row(role = "", extraLabel = ""): PersonRow {
  return { id: crypto.randomUUID(), role, name: "", mobile: "", email: "", extra: extraLabel };
}
function item(id: string, title: string): ChecklistItem {
  return { id, title, status: "", date: "", sign: "", note: "" };
}
export const defaultOrganization: PersonRow[] = [
  row("Projektchef"), row("Platschef"), row("KMA"), row("Kontrollansvarig"), row("Inköpsansvarig"), row("Arbetsledare"),
];
export const defaultChecklist: ChecklistItem[] = [
  item("parmar", "Projektpärmar, distribution och innehåll ok"),
  item("startmote", "Har internt byggstartsmöte hållits?"),
  item("syn", "Besiktning av arbetsområde gjord"),
  item("handlingar", "Gällande handlingar förtecknade på plats"),
  item("inkop", "Inköp i rätt tid av rätt person"),
  item("tid", "Har tidsplanen följts?"),
  item("egen", "Egenkontroller journalförda"),
  item("kontrollplan", "Kontrollplan upprättad"),
  item("dagbok", "Dagbok förs"),
  item("ata", "ÄTA dokumenteras och signeras"),
  item("avvikelse", "Avvikelser rapporteras"),
  item("personal", "Personalliggare förs"),
  item("besikt", "Besiktningsplan upprättad"),
  item("relation", "Relationshandlingar förberedda"),
  item("kvalitet", "Kvalitetsplan reviderad vid behov"),
];
export const defaultSafetyRounds: ChecklistItem[] = [
  item("e1", "Egenkontroll moment – anpassa efter yrke"),
  item("e2", "Mätutrustning kontrollerad"),
  item("e3", "ÄTA-rapport ifylld vid ändring"),
  item("e4", "Avvikelserapport vid brist"),
  item("e5", "Dokumentändring signerad av parter"),
  item("e6", "Kompetensdokumentation UE"),
  item("e7", "ID06 / legitimation på plats"),
  item("e8", "Byggmötesprotokoll arkiverade"),
  item("e9", "Förbesiktning genomförd"),
  item("e10", "Slutbesiktning underlag komplett"),
];
export function createEmptyPlan(): PlanRecord {
  return {
    id: crypto.randomUUID(), updatedAt: new Date().toISOString(), project: { ...emptyProject }, policyNote: "",
    organization: defaultOrganization.map((r) => ({ ...r, id: crypto.randomUUID() })),
    workers: [row("Yrkesarbetare", "behörighet")], subcontractors: [row("Underentreprenör", "org.nr")],
    checklist: defaultChecklist.map((c) => ({ ...c })), safetyRounds: defaultSafetyRounds.map((c) => ({ ...c })),
    receipts: [row("Kvalitetschef"), row("Beställare")], approvalName: "", approvalDate: "",
  };
}
export function loadPlans(): PlanRecord[] {
  if (typeof window === "undefined") return [];
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) as PlanRecord[] : []; } catch { return []; }
}
export function savePlans(plans: PlanRecord[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(plans)); }
export function statusLabel(status: ChecklistStatus) {
  switch (status) {
    case "ok": return "1 – Godkänt";
    case "ej-ok": return "2 – Ej godkänt";
    case "ej-kontrollerat": return "3 – Ej kontrollerat";
    default: return "—";
  }
}
export function planProgress(plan: PlanRecord) {
  const all = [...plan.checklist, ...plan.safetyRounds];
  const done = all.filter((c) => c.status === "ok").length;
  return { done, total: all.length, percent: all.length ? Math.round((done / all.length) * 100) : 0 };
}
