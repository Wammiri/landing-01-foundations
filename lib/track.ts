type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/**
 * Thin GA4 wrapper. No analytics package: gtag is already on the window once
 * the layout scripts have run, so this is the whole integration.
 * Safe on the server and safe before gtag has loaded.
 */
export const track = (name: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (gtag) gtag("event", name, params);
};

/** The three CTA positions the page reports on, per SPEC.md section 7. */
export type CtaLocation = "nav" | "hero" | "final";

export const trackCta = (location: CtaLocation) => track("cta_click", { location });
