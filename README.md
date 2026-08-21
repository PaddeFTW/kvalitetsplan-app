# Kvalitetsplan App

Digital kvalitetsplan för byggprojekt (Quality WorX).

## Vad finns

- Projektinformation (från Word-mall)
- Kontrollmoment / egenkontroll med status 1–2–3
- Spara i webbläsaren (localStorage)
- Export: PDF (skriv ut/spara), Word (.doc), textfil
- Färger i stil med onboarding-appen (indigo)

## Köra lokalt

```bash
npm install
npm run dev
```

Öppna http://localhost:3000

## Nästa steg

1. Magic link / konto (från `app-template` branch `account-system-integration`)
2. Miljöplan + Arbetsmiljöplan (samma skal, annat innehåll)
3. Koppla Supabase för molnsparande
4. Deploy på Vercel

Bas: onboarding-app UX + Word-mall innehåll.
