"use client";

import { ChapterView } from "@/components/kvalitetsplan/chapters";
import { PlanShell, SaveBar } from "@/components/kvalitetsplan/plan-shell";
import { useKvalitetsplan } from "@/lib/kvalitetsplan/store";
import type { KapitelSlug } from "@/lib/kvalitetsplan/nav";
import { kapitelNav } from "@/lib/kvalitetsplan/nav";
import { LoadingState } from "@/components/common/loading-state";

function exportState(state: ReturnType<typeof useKvalitetsplan>["state"]) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `kvalitetsplan-${state.project.fastighet || "projekt"}.json`;
  a.click();
  URL.revokeObjectURL(url);
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(
    "<!DOCTYPE html><html lang=sv><head><meta charset=utf-8><title>Kvalitetsplan</title></head><body><h1>Kvalitetsplan</h1><pre>" +
      JSON.stringify(state, null, 2).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string) +
      "</pre></body></html>",
  );
  w.document.close();
  w.focus();
  w.print();
}

export function Workspace({ slug }: { slug: KapitelSlug }) {
  const { state, ready, saved, save } = useKvalitetsplan();
  const meta = kapitelNav.find((k) => k.slug === slug);
  if (!ready) return <LoadingState />;
  return (
    <PlanShell
      actions={<SaveBar onExport={() => exportState(state)} onSave={() => save(state)} saved={saved} />}
      description="Samma kapitel och blanketter som Word-mallen Kvalitetsplan bygg – avancerad för större projekt."
      title={meta?.title ?? "Kvalitetsplan"}
    >
      <ChapterView onChange={save} slug={slug} state={state} />
    </PlanShell>
  );
}
