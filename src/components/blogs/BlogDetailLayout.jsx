"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/common/Navbar";
import Breadcrumb from "@/components/common/Breadcrumb";
import { blogsAPI } from "@/config/api";

export const STATIC_BLOGS = [
  {
    slug: "amazon-mq-vs-cloudamqp-rabbitmq-hosting",
    title: "Amazon MQ vs CloudAMQP vs Alternatives: Best RabbitMQ Hosting 2026",
    category: "Databases",
    readTime: 12,
    image: "/images/blogs/amazon-mq-vs-cloudamqp-rabbitmq-hosting.png",
  },
  {
    slug: "managed-vms-vs-kubernetes-startups-2026",
    title: "Why Startups Are Choosing Managed VMs Over Kubernetes in 2026",
    category: "DevOps",
    readTime: 14,
    image: "/images/blogs/managed-vms-vs-kubernetes-startups-2026.png",
  },
  {
    slug: "aws-ec2-vs-digitalocean-vs-alternative-cloud-providers",
    title: "AWS EC2 vs. DigitalOcean vs. Alternative Cloud Providers: Which Cloud Is Best in 2026?",
    category: "Cloud",
    readTime: 15,
    image: "/images/blogs/aws-ec2-vs-digitalocean-vs-alternative-cloud-providers.png",
  },
  {
    slug: "moving-off-aws-s3",
    title: "Moving off AWS S3 without rewriting your app",
    category: "Object Storage",
    readTime: 6,
    image: "/images/blogs/migrating-from-expensive-cloud-storage.png",
  },
  {
    slug: "mongodb-atlas-alternatives",
    title: "MongoDB Atlas alternatives for teams that outgrew the free tier",
    category: "Managed Databases",
    readTime: 7,
    image: "/images/blogs/cost-effective-scaling-mongodb-replica-set.png",
  },
  {
    slug: "aws-rds-alternatives-for-startups-in-2026",
    title: "AWS RDS Alternatives for Startups in 2026: Best Managed Databases for Faster Growth",
    category: "Databases",
    readTime: 8,
    image: "/images/blogs/AWS RDS Alternatives for Startups in 2026.png",
  },
  {
    slug: "cloud-isnt-expensive-waste-is",
    title: "Cloud Isn't Expensive. Waste Is.",
    category: "Cloud Cost Optimization",
    readTime: 12,
    image: "/images/blogs/Cloud Isn't Expensive. Waste Is..png",
  },
];

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogDetailLayout({
  children,
  slug,
  title,
  category,
  headings: customHeadings,
  relatedBlogs: customRelated,
}) {
  const initialRelated = useMemo(() => {
    if (customRelated && customRelated.length > 0) return customRelated;
    const others = STATIC_BLOGS.filter((b) => b.slug && b.slug !== slug);
    const catLower = (category || "").toLowerCase();
    const sameCat = others.filter((b) => (b.category || "").toLowerCase() === catLower);
    const rest = others.filter((b) => (b.category || "").toLowerCase() !== catLower);
    return [...sameCat, ...rest].slice(0, 3);
  }, [slug, category, customRelated]);

  const [headings, setHeadings] = useState(customHeadings || []);
  const [activeId, setActiveId] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState(initialRelated);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const [navHeight, setNavHeight] = useState(104);

  useEffect(() => {
    const updateNavHeight = () => {
      const navEl =
        document.querySelector("nav")?.closest(".sticky") ||
        document.querySelector("nav");
      if (navEl) {
        const h = navEl.offsetHeight;
        if (h > 0) setNavHeight(h);
      }
    };
    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    const observer = new MutationObserver(updateNavHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener("resize", updateNavHeight);
      observer.disconnect();
    };
  }, []);

  const containerRef = useRef(null);
  const articleRef = useRef(null);

  useEffect(() => {
    if (customRelated && customRelated.length > 0) return;

    const computeRelated = (list) => {
      const others = list.filter((b) => b.slug && b.slug !== slug);
      const catLower = (category || "").toLowerCase();
      const sameCat = others.filter((b) => (b.category || "").toLowerCase() === catLower);
      const rest = others.filter((b) => (b.category || "").toLowerCase() !== catLower);
      return [...sameCat, ...rest].slice(0, 3);
    };

    setRelatedBlogs(computeRelated(STATIC_BLOGS));

    let cancelled = false;
    blogsAPI
      .getPublic()
      .then((res) => {
        if (cancelled) return;
        if (Array.isArray(res?.data) && res.data.length > 0) {
          setRelatedBlogs(computeRelated(res.data));
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug, category, customRelated]);

  useEffect(() => {
    if (customHeadings && customHeadings.length > 0) {
      setHeadings(customHeadings);
      if (!activeId && customHeadings[0]) setActiveId(customHeadings[0].id);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const article = container.querySelector("article") || container;
    articleRef.current = article;

    const elements = Array.from(article.querySelectorAll("h2, h3"));
    if (elements.length === 0) return;

    const detected = [];
    const usedIds = new Set();

    elements.forEach((el, index) => {
      if (el.closest("header") || el.closest("aside") || el.closest("footer") || el.closest(".sidebar-ignore")) {
        return;
      }

      let id = el.id ? el.id.trim() : "";
      if (!id) {
        id = slugify(el.textContent) || `section-${index + 1}`;
      }

      let uniqueId = id;
      let counter = 1;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter++}`;
      }
      usedIds.add(uniqueId);
      el.id = uniqueId;

      el.style.scrollMarginTop = `${navHeight + 60}px`;

      detected.push({
        id: uniqueId,
        text: el.textContent.trim(),
        level: el.tagName.toUpperCase() === "H2" ? 2 : 3,
      });
    });

    if (detected.length > 0) {
      setHeadings(detected);
      setActiveId(detected[0].id);
    }
  }, [customHeadings, children]);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const article = articleRef.current || containerRef.current?.querySelector("article");
      if (article) {
        const rect = article.getBoundingClientRect();
        const articleTop = window.scrollY + rect.top;
        const articleHeight = rect.height;
        const currentScroll = window.scrollY - articleTop;
        const totalScrollable = articleHeight - window.innerHeight * 0.7;

        if (totalScrollable > 0) {
          const raw = (currentScroll / totalScrollable) * 100;
          setReadingProgress(Math.min(100, Math.max(0, Math.round(raw))));
        } else if (window.scrollY > articleTop) {
          setReadingProgress(100);
        } else {
          setReadingProgress(0);
        }
      }

      if (!headings || headings.length === 0) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + viewportHeight >= docHeight - 80) {
        setActiveId(headings[headings.length - 1].id);
        return;
      }
      const TRIGGER_OFFSET = navHeight + 64;
      let currentActive = headings[0].id;

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top;
        if (top <= TRIGGER_OFFSET) {
          currentActive = headings[i].id;
        } else {
          break;
        }
      }

      setActiveId(currentActive);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };
    updateScrollState();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [headings, navHeight]);

  // 4. Smooth, accurate TOC click handler
  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const navOffset = navHeight + 56;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setActiveId(id);
    setMobileTocOpen(false);

    if (window.history.pushState) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const handleShare = (platform) => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const text = title ? `Check out this article: "${title}"` : "Check out this article on Neviri Cloud";

    switch (platform) {
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          toast.success("Link copied to clipboard!");
          setTimeout(() => setCopied(false), 2200);
        });
        break;
    }
  };

  // SVG Progress Ring calculations (r=14, circumference ~88)
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readingProgress / 100) * circumference;

  const hasRightRail = headings.length > 0 || relatedBlogs.length > 0;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1A1F2C]">
      <Navbar />

      {/* Sticky Breadcrumb Bar: remains visible and accessible while scrolling */}
      <div
        className="sticky z-30 w-full bg-[#F7F9FC]/90 backdrop-blur-md  border-[#E2E8F0]/70 py-6 transition-[top] duration-150 -translate-y-0.5"
        style={{ top: `${navHeight}px` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-16 max-w-7xl"
      >
        {/* Mobile / Tablet: Top Utility Bar (< xl) */}
        <div className="xl:hidden mb-6 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-7 h-7">
              <svg className="w-7 h-7 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="2.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-150 ease-out"
                />
              </svg>
              <span className="absolute text-[8px] font-bold text-[#64748B]">
                {readingProgress}%
              </span>
            </div>
            <span className="text-xs font-medium text-[#64748B]">
              Reading progress
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleShare("linkedin")}
              aria-label="Share on LinkedIn"
              title="Share on LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleShare("twitter")}
              aria-label="Share on X (Twitter)"
              title="Share on X"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-black hover:border-black transition-colors"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleShare("copy")}
              aria-label="Copy link"
              title="Copy article link"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                copied
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                  : "border-[#E2E8F0] bg-white text-[#64748B] hover:text-sky-600 hover:border-sky-600"
              }`}
            >
              {copied ? (
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 3-Column Layout: Left Share Rail | Main Article | Right Sidebar */}
        <div className="xl:flex xl:gap-10 xl:items-start xl:justify-between">
          {/* ── 1. Left Sticky Share Rail (Desktop Only) ── */}
          <aside
            className="hidden xl:block w-12 shrink-0 sticky self-start z-20 transition-[top] duration-150"
            style={{ top: `${navHeight + 52}px` }}
          >
            <div className="flex flex-col items-center gap-2.5 py-3 px-1 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
              {/* Reading Progress Indicator */}
              <div
                className="relative flex items-center justify-center w-8 h-8"
                title={`Reading Progress: ${readingProgress}%`}
              >
                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-150 ease-out"
                  />
                </svg>
                {readingProgress >= 100 ? (
                  <svg
                    className="absolute w-3 h-3 text-sky-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="absolute text-[8px] font-bold text-[#64748B]">
                    {readingProgress}%
                  </span>
                )}
              </div>

              <div className="w-5 h-px bg-[#E2E8F0]" />

              <span className="text-[8px] font-bold uppercase tracking-widest text-[#94A3B8]">
                Share
              </span>

              {/* LinkedIn Share */}
              <button
                type="button"
                onClick={() => handleShare("linkedin")}
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] transition-all hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 active:scale-95 cursor-pointer"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>

              {/* Twitter / X Share */}
              <button
                type="button"
                onClick={() => handleShare("twitter")}
                aria-label="Share on X (Twitter)"
                title="Share on X"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] transition-all hover:border-[#0F1419] hover:text-[#0F1419] hover:bg-black/5 active:scale-95 cursor-pointer"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>

              {/* Copy Link Button */}
              <button
                type="button"
                onClick={() => handleShare("copy")}
                aria-label="Copy link"
                title="Copy article link"
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 cursor-pointer ${
                  copied
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600 shadow-xs"
                    : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-sky-600 hover:text-sky-600 hover:bg-sky-50/50"
                }`}
              >
                {copied ? (
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </aside>

          {/* ── 2. Center Column: Main Article ── */}
          <main className="min-w-0 max-w-[800px] flex-1 mx-auto xl:mx-0">
            {/* Mobile collapsible TOC (< xl) */}
            {headings.length >= 2 && (
              <div className="mb-6 xl:hidden">
                <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
                  <button
                    type="button"
                    onClick={() => setMobileTocOpen((o) => !o)}
                    aria-expanded={mobileTocOpen}
                    className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#1A1F2C]">
                      <svg
                        className="h-4 w-4 text-sky-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h10M4 18h7"
                        />
                      </svg>
                      In This Article
                      <span className="text-xs font-normal text-[#94A3B8]">
                        ({headings.length})
                      </span>
                    </span>
                    <svg
                      className={`h-4 w-4 text-[#94A3B8] transition-transform duration-200 ${
                        mobileTocOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {mobileTocOpen && (
                    <nav className="border-t border-[#E2E8F0] p-4 bg-[#F8FAFC]/50 max-h-72 overflow-y-auto">
                      <ul className="space-y-1.5 border-l border-[#CBD5E1] ml-1">
                        {headings.map((h) => {
                          const isActive = activeId === h.id;
                          return (
                            <li key={h.id}>
                              <a
                                href={`#${h.id}`}
                                onClick={(e) => handleTocClick(e, h.id)}
                                className={`-ml-px block border-l-2 py-1 text-sm leading-snug transition-colors ${
                                  h.level === 3
                                    ? "pl-5 text-xs"
                                    : "pl-3 text-sm"
                                } ${
                                  isActive
                                    ? "border-sky-600 font-semibold text-sky-700 bg-sky-50/80 rounded-r"
                                    : "border-transparent text-[#64748B] hover:text-[#1A1F2C]"
                                }`}
                              >
                                {h.text}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            )}

            {children}
          </main>

          {/* ── 3. Right Sticky Sidebar: TOC + Related Articles (Desktop Only) ── */}
          {hasRightRail && (
            <aside
              className="hidden xl:block w-[280px] shrink-0 sticky self-start z-20 transition-[top] duration-150"
              style={{ top: `${navHeight + 52}px` }}
            >
              <div className="space-y-4">
                {/* Table of Contents Card */}
                {headings.length > 0 && (
                  <nav
                    className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs"
                    aria-label="Table of contents"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase pb-2.5 mb-2.5 border-b border-[#F1F5F9]">
                      <svg
                        className="w-3.5 h-3.5 text-sky-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h10M4 18h7"
                        />
                      </svg>
                      In This Article
                    </div>

                    <ul className="space-y-px border-l border-[#E2E8F0] ml-0.5 max-h-[min(260px,calc(100vh-25rem))] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#CBD5E1] [&::-webkit-scrollbar-thumb]:rounded-full pr-1">
                      {headings.map((h) => {
                        const isActive = activeId === h.id;
                        return (
                          <li key={h.id}>
                            <a
                              href={`#${h.id}`}
                              onClick={(e) => handleTocClick(e, h.id)}
                              className={`-ml-px block border-l-2 py-1.5 transition-all leading-snug ${
                                h.level === 3
                                  ? "pl-4 text-[12px]"
                                  : "pl-3 text-[13px]"
                              } ${
                                isActive
                                  ? "border-sky-600 font-semibold text-sky-700 bg-sky-50/70 rounded-r-md"
                                  : "border-transparent text-[#64748B] hover:border-[#CBD5E1] hover:text-[#1A1F2C]"
                              }`}
                            >
                              {h.text}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                )}

                {/* Related Articles Card */}
                {relatedBlogs.length > 0 && (
                  <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase pb-2.5 mb-3 border-b border-[#F1F5F9]">
                      <svg
                        className="w-3.5 h-3.5 text-sky-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      Related Articles
                    </div>

                    <ul className="space-y-0">
                      {relatedBlogs.map((rb, i) => (
                        <li
                          key={rb.id || rb.slug}
                          className={
                            i > 0
                              ? "border-t border-[#F1F5F9] pt-2.5 mt-2.5"
                              : ""
                          }
                        >
                          <Link
                            href={`/blogs/${rb.slug}`}
                            className="group flex items-start gap-2.5"
                          >
                            {rb.image && (
                              <div className="w-12 h-10 rounded-md overflow-hidden shrink-0 bg-[#F1F5F9] border border-[#E2E8F0]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={rb.image}
                                  alt={rb.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                                {rb.category}
                              </span>
                              <span className="mt-0.5 block text-[12px] font-semibold leading-snug text-[#1A1F2C] line-clamp-2 transition-colors group-hover:text-sky-700">
                                {rb.title}
                              </span>
                              <span className="mt-0.5 flex items-center gap-1 text-[10px] text-[#94A3B8]">
                                <svg
                                  className="h-2.5 w-2.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {rb.readTime || 5} min read
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
