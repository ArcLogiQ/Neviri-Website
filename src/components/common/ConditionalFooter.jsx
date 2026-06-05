"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

/**
 * Marketing-only footer.
 *
 * The dashboard uses an `h-screen overflow-hidden` shell so its sidebar
 * stays pinned and only the main pane scrolls. If the global Footer renders
 * underneath that shell, the BODY itself becomes scrollable and dragging
 * the page reveals the footer — which makes the dashboard chrome (sidebar,
 * header) appear to "slide up" with it.
 *
 * Solution: render the Footer ONLY on non-dashboard routes. Marketing
 * pages still get it; the app shell stays clean.
 */
export default function ConditionalFooter() {
  const pathname = usePathname() || "";
  const isAppShell = pathname.startsWith("/dashboard");

  if (isAppShell) return null;
  return <Footer />;
}
