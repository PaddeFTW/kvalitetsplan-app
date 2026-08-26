"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { consumeMagicLink } from "@/lib/auth";

function VerifyInner() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"working" | "ok" | "fail">("working");

  useEffect(() => {
    const token = params.get("token") ?? "";
    const email = params.get("email") ?? "";
    const session = consumeMagicLink(token, email);
    if (session) {
      setStatus("ok");
      window.location.replace("/");
    } else {
      setStatus("fail");
    }
  }, [params]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      {status === "working" ? <p className="text-muted-foreground">Loggar in…</p> : null}
      {status === "fail" ? (
        <div>
          <h1 className="text-xl font-semibold">Länken gäller inte</h1>
          <p className="mt-2 text-sm text-muted-foreground">Den kan ha gått ut eller redan använts.</p>
          <a href="/" className="mt-4 inline-block text-sm text-primary">Tillbaka till inloggning</a>
        </div>
      ) : null}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<p className="p-8 text-muted-foreground">Laddar…</p>}>
      <VerifyInner />
    </Suspense>
  );
}
