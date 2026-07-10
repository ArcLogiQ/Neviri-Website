"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";

// Cloudflare's documented ALWAYS-PASSES test site key — used ONLY in dev/preview
// so the widget renders locally. In production we deliberately do NOT fall back
// to it: a real deploy that forgets NEXT_PUBLIC_TURNSTILE_SITE_KEY would
// otherwise ship a CAPTCHA that passes every bot with no visible sign. Instead,
// a missing key in production fails CLOSED (no widget -> no token -> submit
// stays disabled) and shows a visible error + console.error.
const TEST_SITE_KEY = "1x00000000000000000000AA";
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV === "production" ? "" : TEST_SITE_KEY);

const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Cloudflare Turnstile widget.
 *
 * - Calls `onVerify(token)` when solved. The token is single-use + short-lived;
 *   send it with the request and have the BACKEND verify it via
 *   https://challenges.cloudflare.com/turnstile/v0/siteverify (secret key)
 *   before trusting the submission.
 * - Calls `onExpire()` when the token expires/errors so the caller can clear it.
 * - `resetKey`: change it (e.g. after a failed submit) to force a fresh challenge.
 */
export default function Turnstile({ onVerify, onExpire, resetKey, className }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const isFirstResetRef = useRef(true);
  // Keep the latest callbacks without re-rendering the widget on every keystroke.
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  const renderWidget = useCallback(() => {
    if (
      !SITE_KEY ||
      typeof window === "undefined" ||
      !window.turnstile ||
      !containerRef.current ||
      widgetIdRef.current !== null
    ) {
      return;
    }
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      callback: (token) => onVerifyRef.current && onVerifyRef.current(token),
      "expired-callback": () => onExpireRef.current && onExpireRef.current(),
      "error-callback": () => onExpireRef.current && onExpireRef.current(),
    });
  }, []);

  // Surface a missing production key loudly (build-time inlined, so this only
  // happens when the env var was omitted from the deploy).
  useEffect(() => {
    if (!SITE_KEY && typeof console !== "undefined") {
      console.error(
        "[Turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set — CAPTCHA is disabled and the form cannot be submitted. Set it to your Cloudflare Turnstile site key.",
      );
    }
  }, []);

  useEffect(() => {
    renderWidget();
    return () => {
      if (window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* widget already gone */
        }
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  // Force a fresh challenge when resetKey CHANGES (not on initial mount — on an
  // SPA remount window.turnstile can already exist, which would otherwise reset
  // the just-rendered widget and fire a spurious onExpire).
  useEffect(() => {
    if (isFirstResetRef.current) {
      isFirstResetRef.current = false;
      return;
    }
    if (window.turnstile && widgetIdRef.current !== null) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        /* ignore */
      }
      onExpireRef.current && onExpireRef.current();
    }
  }, [resetKey]);

  if (!SITE_KEY) {
    return (
      <p className={className} style={{ color: "#b91c1c", fontSize: "0.75rem" }}>
        CAPTCHA is not configured. Please try again later or contact support.
      </p>
    );
  }

  return (
    <>
      <Script
        src={TURNSTILE_SRC}
        strategy="afterInteractive"
        onLoad={renderWidget}
      />
      <div ref={containerRef} className={className} />
    </>
  );
}
