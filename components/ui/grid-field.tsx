/**
 * 方眼の地。DESIGN.md § 4 Grid。
 * データに依存せず、テーマにだけ追従する。
 * 内容と一緒にスクロールさせるため、position は fixed ではなく absolute にする。
 */
export function GridField() {
  return <div aria-hidden className="grid-field absolute inset-0 -z-10" />;
}
