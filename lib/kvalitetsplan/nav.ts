export const kapitelNav = [
  { slug: "start", title: "Start & inledning" },
  { slug: "policy", title: "Kvalitetspolicy" },
  { slug: "projekt", title: "1. Projektinformation" },
  { slug: "organisation", title: "1–3. Organisation" },
  { slug: "allmant", title: "2. Allmän information" },
  { slug: "genomgang", title: "4. Projektgenomgång" },
  { slug: "projektering", title: "5. Projektering" },
  { slug: "produktion", title: "6. Produktion" },
  { slug: "montage", title: "7. Montage" },
  { slug: "avslut", title: "8. Avslutningsskede" },
  { slug: "dokument", title: "9. Dokumentstyrning" },
  { slug: "forklaring", title: "10. Förklaring" },
  { slug: "egenkontroll", title: "11. Egenkontroll" },
  { slug: "erfarenhet", title: "12. Erfarenhetsåterföring" },
  { slug: "ata", title: "13. ÄTA-rapport" },
  { slug: "avvikelse", title: "14. Avvikelserapport" },
  { slug: "journal", title: "15. Egenkontroll-journal" },
] as const;

export type KapitelSlug = (typeof kapitelNav)[number]["slug"];
