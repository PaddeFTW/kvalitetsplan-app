import { MagicGate } from "@/components/auth/MagicGate";
import { PlanApp } from "@/components/kvalitetsplan/PlanApp";

export default function HomePage() {
  return (
    <MagicGate productName="kvalitetsplanen">
      <PlanApp />
    </MagicGate>
  );
}
