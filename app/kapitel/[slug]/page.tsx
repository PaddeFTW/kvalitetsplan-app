import { notFound } from "next/navigation";
import { Workspace } from "@/components/kvalitetsplan/workspace";
import { kapitelNav, type KapitelSlug } from "@/lib/kvalitetsplan/nav";

export function generateStaticParams() {
  return kapitelNav.filter((k) => k.slug !== "start").map((k) => ({ slug: k.slug }));
}

export default async function KapitelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = kapitelNav.find((k) => k.slug === slug);
  if (!found) notFound();
  return <Workspace slug={slug as KapitelSlug} />;
}
