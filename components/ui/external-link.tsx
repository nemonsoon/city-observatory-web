import { ExternalLink as ExternalLinkIcon } from "lucide-react";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  iconSize?: number;
};

export function ExternalLink({
  href,
  children,
  iconSize = 14,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-note text-muted-foreground transition-colors hover:text-foreground"
    >
      <ExternalLinkIcon size={iconSize} className="shrink-0" />
      <span>{children}</span>
    </a>
  );
}
