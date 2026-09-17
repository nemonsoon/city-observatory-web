import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GridField } from "@/components/ui/grid-field";
import { Rule } from "@/components/ui/rule";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-grid">
      <GridField />
      <div className="flex w-full max-w-md flex-col gap-grid border border-border bg-card p-grid">
        <p className="font-display text-eyebrow uppercase text-muted-foreground">
          404
        </p>
        <Rule />
        <h1 className="text-heading font-medium">ページが見つかりません</h1>
        <p className="text-note text-muted-foreground">
          アドレスが間違っているか、ページが移動した可能性があります。
        </p>
        <Link
          href="/"
          className="flex w-fit items-center gap-1.5 border border-border px-3 py-1.5 text-note text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          観測画面へ戻る
        </Link>
      </div>
    </div>
  );
}
