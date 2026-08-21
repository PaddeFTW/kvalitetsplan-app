export type ChecklistStatus = "ok" | "ej-ok" | "ej-kontrollerat" | "";

export interface ProjectInfo {
  fastighetsbeteckning: string;
  adress: string;
  postnr: string;
  ort: string;
  kontaktperson: string;
  kontaktMobil: string;
  kontaktEpost: string;
  bestallareNamn: string;
  bestallareOrgNr: string;
  entreprenorNamn: string;
  entreprenorOrgNr: string;
  projektledare: string;
  kma: string;
  arbetsledare: string;
  skyddsombud: string;
  entreprenadform: "total" | "utforande" | "";
  projektbeskrivning: string;
  startDatum: string;
  slutDatum: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  status: ChecklistStatus;
  date: string;
  sign: string;
  note: string;
}

export interface KvalitetsplanRecord {
  id: string;
  updatedAt: string;
  project: ProjectInfo;
  policyNote: string;
  checklist: ChecklistItem[];
}

export const STORAGE_KEY = "kvalitetsplan-app-v1";

export const emptyProject: ProjectInfo = {
  fastighetsbeteckning: "",
  adress: "",
  postnr: "",
  ort: "",
  kontaktperson: "",
  kontaktMobil: "",
  kontaktEpost: "",
  bestallareNamn: "",
  bestallareOrgNr: "",
  entreprenorNamn: "",
  entreprenorOrgNr: "",
  projektledare: "",
  kma: "",
  arbetsledare: "",
  skyddsombud: "",
  entreprenadform: "",
  projektbeskrivning: "",
  startDatum: "",
  slutDatum: "",
};

export const defaultChecklist: ChecklistItem[] = [
  { id: "egenkontroll", title: "Egenkontroll upprättad och journalförd", status: "", date: "", sign: "", note: "" },
  { id: "kontrollplan", title: "Kontrollplan fastställd med beställare/kontrollansvarig", status: "", date: "", sign: "", note: "" },
  { id: "tidplan", title: "Produktionstidplan och delmål satta", status: "", date: "", sign: "", note: "" },
  { id: "kompetens", title: "Medarbetarnas kompetens utvärderad för projektet", status: "", date: "", sign: "", note: "" },
  { id: "personalliggare", title: "Elektronisk personalliggare aktiv", status: "", date: "", sign: "", note: "" },
  { id: "dagbok", title: "Dagbok förs och delges beställare", status: "", date: "", sign: "", note: "" },
  { id: "avvikelse", title: "Rutin för avvikelserapportering känd", status: "", date: "", sign: "", note: "" },
  { id: "ata", title: "ÄTA-rutin klar (signering av beställare)", status: "", date: "", sign: "", note: "" },
  { id: "matutrustning", title: "Mätutrustning kontrollerad innan användning", status: "", date: "", sign: "", note: "" },
  { id: "montageplan", title: "Montage och kritiska moment planerade", status: "", date: "", sign: "", note: "" },
  { id: "provning", title: "Samordnad funktionsprovning planerad", status: "", date: "", sign: "", note: "" },
  { id: "besiktning", title: "Besiktningsplan upprättad med beställare", status: "", date: "", sign: "", note: "" },
  { id: "dokument", title: "Projektdokumentation och relationshandlingar förberedda", status: "", date: "", sign: "", note: "" },
  { id: "legitimation", title: "Godkänd legitimation på byggarbetsplatsen", status: "", date: "", sign: "", note: "" },
  { id: "distributionsforteckning", title: "Distributionsförteckning för kvalitetsplanen", status: "", date: "", sign: "", note: "" },
];

export function createEmptyPlan(): KvalitetsplanRecord {
  return {
    id: crypto.randomUUID(),
    updatedAt: new Date().toISOString(),
    project: { ...emptyProject },
    policyNote: "",
    checklist: defaultChecklist.map((item) => ({ ...item })),
  };
}

export function loadPlans(): KvalitetsplanRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as KvalitetsplanRecord[];
  } catch {
    return [];
  }
}

export function savePlans(plans: KvalitetsplanRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function statusLabel(status: ChecklistStatus) {
  switch (status) {
    case "ok":
      return "1 – Godkänt";
    case "ej-ok":
      return "2 – Ej godkänt";
    case "ej-kontrollerat":
      return "3 – Ej kontrollerat";
    default:
      return "—";
  }
}

export function planProgress(plan: KvalitetsplanRecord) {
  const done = plan.checklist.filter((c) => c.status === "ok").length;
  return {
    done,
    total: plan.checklist.length,
    percent: Math.round((done / plan.checklist.length) * 100),
  };
}
