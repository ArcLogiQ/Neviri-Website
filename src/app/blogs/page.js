"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import { blogsAPI } from "@/config/api";
import { displayViews } from "@/lib/blogViews";

const categories = [
  "All",
  "database",
  "mongodb",
  "SQL",
  "NoSQL",
  "Python",
  "Node.js",
  "Career",
  "Tutorial",
  "Web Development",
  "Mobile Development",
  "DevOps",
  "Cloud",
];

const STATIC_BLOGS = [
  {
    id: "static-managed-vms-vs-kubernetes-2026",
    isStatic: true,
    slug: "managed-vms-vs-kubernetes-startups-2026",
    title:
      "Why Startups Are Choosing Managed VMs Over Kubernetes in 2026",
    excerpt:
      "Are startups overusing Kubernetes? Compare managed VMs vs Kubernetes on cost, complexity, scalability, and operations to choose the right infrastructure in 2026.",
    category: "DevOps",
    createdAt: "2026-08-29T00:00:00.000Z",
    author: { name: "Neviri Cloud" },
    readTime: 14,
    views: 0,
    tags: ["kubernetes", "managed-vms", "infrastructure", "startups", "devops"],
    isBookmarked: false,
  },
  {
    id: "static-aws-ec2-vs-digitalocean-vs-alternatives",
    isStatic: true,
    slug: "aws-ec2-vs-digitalocean-vs-alternative-cloud-providers",
    title:
      "AWS EC2 vs. DigitalOcean vs. Alternative Cloud Providers: Which Cloud Is Best in 2026?",
    excerpt:
      "Choosing a cloud provider in 2026 is no longer simply a question of AWS vs. DigitalOcean. Compare AWS EC2, DigitalOcean, and alternative providers such as Neviri on flexibility, simplicity, cost, and operational control.",
    category: "Cloud",
    createdAt: "2026-08-24T00:00:00.000Z",
    author: { name: "Neviri Cloud" },
    readTime: 15,
    views: 0,
    tags: ["cloud", "aws", "digitalocean", "cloud-comparison"],
    isBookmarked: false,
  },
  {
    id: "static-moving-off-aws-s3",
    isStatic: true,
    slug: "moving-off-aws-s3",
    title: "Moving off AWS S3 without rewriting your app",
    excerpt:
      "S3 bills you twice: once to store, again on egress every time files are read. Move to S3-compatible object storage with a one-line endpoint change and cut transfer costs.",
    category: "Object Storage",
    createdAt: "2026-08-18T00:00:00.000Z",
    author: { name: "Neviri Cloud" },
    readTime: 6,
    views: 0,
    tags: ["object-storage", "s3", "cloud-cost", "egress"],
    isBookmarked: false,
  },
  {
    id: "static-mongodb-atlas-alternatives",
    isStatic: true,
    slug: "mongodb-atlas-alternatives",
    title: "MongoDB Atlas alternatives for teams that outgrew the free tier",
    excerpt:
      "Managed MongoDB on Neviri with the same M10 to M300 sizing, three-node replica sets, and point-in-time recovery, priced per replica.",
    category: "Managed Databases",
    createdAt: "2026-08-18T00:00:00.000Z",
    author: { name: "Neviri Cloud" },
    readTime: 7,
    views: 0,
    tags: ["database", "mongodb", "atlas-alternative", "managed-database"],
    isBookmarked: false,
  },
  {
    id: "static-aws-rds-alternatives-2026",
    isStatic: true,
    slug: "aws-rds-alternatives-for-startups-in-2026",
    title:
      "AWS RDS Alternatives for Startups in 2026: Best Managed Databases for Faster Growth",
    excerpt:
      "Compare the best managed database alternatives to AWS RDS for startups in 2026 — Neviri Cloud, Neon, Supabase, PlanetScale, Crunchy Bridge, and DigitalOcean.",
    category: "database",
    createdAt: "2026-01-15T00:00:00.000Z",
    author: { name: "Neviri Cloud" },
    readTime: 8,
    views: 1867,
    tags: ["database", "postgresql", "startups"],
    isBookmarked: false,
  },
  {
    id: "static-cloud-waste-2026",
    isStatic: true,
    slug: "cloud-isnt-expensive-waste-is",
    title: "Cloud Isn't Expensive. Waste Is.",
    excerpt: "Why your cloud bill isn't the problem—your cloud habits are.",
    category: "Cloud Cost Optimization",
    createdAt: "2026-07-02T00:00:00.000Z",
    author: { name: "Neviri Cloud" },
    readTime: 12,
    views: 2431,
    tags: ["finops", "cloud-cost-optimization", "cloud-waste", "cloud-governance"],
    isBookmarked: false,
  },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState(STATIC_BLOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch blogs on mount
  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const res = await blogsAPI.getPublic();
        if (res.data && Array.isArray(res.data)) {
          const apiBlogs = res.data.filter(
            (b) => !STATIC_BLOGS.some((s) => s.slug === b.slug),
          );
          setBlogs([...STATIC_BLOGS, ...apiBlogs]);
        } else {
          setBlogs(STATIC_BLOGS);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs(STATIC_BLOGS);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesSearch =
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "popular":
          return displayViews(b) - displayViews(a);
        case "featured":
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        default:
          return 0;
      }
    });

  const featuredBlog = filteredBlogs.find((b) => !b.isStatic) || null;
  const gridBlogs = filteredBlogs.filter((b) => b !== featuredBlog);

  const toggleBookmark = (blogId) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === blogId
          ? { ...blog, isBookmarked: !blog.isBookmarked }
          : blog,
      ),
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const trendingBlogs = blogs
    .sort((a, b) => displayViews(b) - displayViews(a))
    .slice(0, 3);

  const bookmarkedBlogs = blogs.filter((blog) => blog.isBookmarked);

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-white relative overflow-hidden font-sans antialiased selection:bg-sky-600/30 selection:text-black pt-12 pb-24 text-[#0F172A]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(226, 232, 240, 0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          backgroundPosition: "center center",
        }}
      >
        {/* Subtle radial gradient overlay to fade grid at the edges */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(255,255,255,0.9)_100%)] z-0"></div>

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-sky-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-16 pt-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] mb-6 tracking-tight">
              Neviri Cloud{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto font-medium leading-relaxed">
              Stay updated with the latest insights, tutorials, and news about
              cloud computing, database management, and cutting-edge technology
              solutions.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-10 border-b border-[#E2E8F0] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex space-x-8 overflow-x-auto pb-2 sm:pb-0">
              <button
                className={`px-1 pb-4 font-bold text-lg border-b-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === "all"
                  ? "border-[#3B82F6] text-[#3B82F6]"
                  : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                  }`}
                onClick={() => setActiveTab("all")}
              >
                All Blogs
              </button>
              <button
                className={`px-1 pb-4 font-bold text-lg border-b-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === "trending"
                  ? "border-[#3B82F6] text-[#3B82F6]"
                  : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                  }`}
                onClick={() => setActiveTab("trending")}
              >
                Trending
              </button>
              <button
                className={`px-1 pb-4 font-bold text-lg border-b-2 transition-colors cursor-pointer whitespace-nowrap ${activeTab === "bookmarked"
                  ? "border-[#3B82F6] text-[#3B82F6]"
                  : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                  }`}
                onClick={() => setActiveTab("bookmarked")}
              >
                Bookmarked
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-4 sm:pb-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#94A3B8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11 w-full sm:w-64 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all font-medium shadow-sm"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-40 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all cursor-pointer font-medium shadow-sm appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-40 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#0F172A] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all cursor-pointer font-medium shadow-sm appearance-none"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Viewed</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-[#3B82F6]"></div>
              <p className="text-[#64748B] mt-4 font-bold tracking-widest uppercase text-sm">
                Loading Insights...
              </p>
            </div>
          )}

          {/* All Blogs Tab */}
          {activeTab === "all" && !loading && (
            <div className="space-y-12">
              {/* Featured Blog */}
              {featuredBlog && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6 flex items-center gap-3 tracking-tight">
                    <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
                    Featured Article
                  </h2>
                  <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-[#E2E8F0] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group">
                    <div className="md:flex h-full">
                      <div className="w-full p-8 lg:p-12 flex flex-col justify-center">
                        <div>
                          <div className="flex items-center space-x-3 mb-6">
                            <span className="inline-block bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                              {featuredBlog.category}
                            </span>
                            <div className="flex items-center text-sm font-semibold text-[#64748B]">
                              <svg
                                className="h-4 w-4 mr-1.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {formatDate(featuredBlog.createdAt)}
                            </div>
                          </div>
                          <h3 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 tracking-tight leading-tight group-hover:text-[#3B82F6] transition-colors">
                            {featuredBlog.title}
                          </h3>
                          <p className="text-[#64748B] mb-8 leading-relaxed font-medium text-lg">
                            {featuredBlog.excerpt}
                          </p>
                          <div className="flex items-center space-x-6 text-sm font-semibold text-[#64748B] mb-8 border-b border-[#E2E8F0] pb-8">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-white text-xs">
                                {(featuredBlog.author?.name || "U")[0]}
                              </div>
                              <span className="text-[#0F172A]">
                                {featuredBlog.author?.name || "Unknown"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>
                                {featuredBlog.readTime || 5} min read
                              </span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              <span>
                                {displayViews(featuredBlog).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {featuredBlog.tags?.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-block bg-[#F8FAFC] text-[#64748B] px-3 py-1 rounded-full text-xs font-bold border border-[#E2E8F0]"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                toggleBookmark(featuredBlog.id)
                              }
                              className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#64748B] hover:text-[#3B82F6] hover:border-[#3B82F6] transition-all cursor-pointer"
                            >
                              <svg
                                className={`h-5 w-5 ${featuredBlog.isBookmarked
                                  ? "fill-current text-[#3B82F6]"
                                  : ""
                                  }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                />
                              </svg>
                            </button>
                            <Link href={`/blogs/${featuredBlog.slug}`}>
                              <button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-bold shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5">
                                Read Article
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blogs Grid */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                    Latest Publications
                  </h2>
                  <p className="text-sm font-semibold text-[#64748B] bg-[#F8FAFC] px-3 py-1 rounded-full border border-[#E2E8F0]">
                    {gridBlogs.length} articles found
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gridBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] border border-[#E2E8F0] overflow-hidden hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:border-[#3B82F6] transition-all duration-500 hover:-translate-y-1 group flex flex-col"
                    >
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-block bg-[#EFF6FF] text-[#3B82F6] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#BFDBFE]">
                            {blog.category}
                          </span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center text-xs font-semibold text-[#94A3B8]">
                              <svg
                                className="h-3 w-3 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {formatDate(blog.createdAt)}
                            </div>
                            {!blog.isStatic && (
                              <button
                                onClick={() => toggleBookmark(blog.id)}
                                className="text-[#94A3B8] hover:text-[#3B82F6] transition-colors cursor-pointer"
                                aria-label="Bookmark"
                              >
                                <svg
                                  className={`h-4 w-4 ${blog.isBookmarked ? "fill-current text-[#3B82F6]" : ""}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight group-hover:text-[#3B82F6] transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-[#64748B] text-sm mb-6 line-clamp-2 font-medium flex-grow">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs font-semibold text-[#64748B] mb-6 border-b border-[#E2E8F0] pb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-white text-[10px]">
                              {(blog.author?.name || "U")[0]}
                            </div>
                            <span className="text-[#0F172A]">
                              {blog.author?.name || "Unknown"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>{blog.readTime || 5} min</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#94A3B8]">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            <span>
                              {displayViews(blog).toLocaleString()} Views
                            </span>
                          </div>
                          <Link href={`/blogs/${blog.slug}`}>
                            <button className="text-[#3B82F6] hover:text-[#06B6D4] text-sm font-bold flex items-center gap-1 transition-colors cursor-pointer group/link">
                              Read
                              <svg
                                className="h-4 w-4 group-hover/link:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Trending Tab */}
          {activeTab === "trending" && !loading && (
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center border border-[#BFDBFE]">
                  <svg
                    className="h-5 w-5 text-[#3B82F6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                  Trending Articles
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {trendingBlogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] border border-[#E2E8F0] overflow-hidden hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:border-[#3B82F6] transition-all duration-500 hover:-translate-y-1 flex flex-col group"
                  >
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <span className="bg-[#0F172A] text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg inline-flex items-center gap-1.5 border border-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>
                          #{index + 1} Trending
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight group-hover:text-[#3B82F6] transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-[#64748B] text-sm mb-6 line-clamp-2 font-medium flex-grow">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs font-semibold text-[#64748B] mb-6 border-b border-[#E2E8F0] pb-4">
                        <span className="text-[#0F172A]">
                          {blog.author?.name || "Unknown"}
                        </span>
                        <div className="flex items-center space-x-1.5">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          <span>
                            {displayViews(blog).toLocaleString()} Views
                          </span>
                        </div>
                      </div>
                      <Link href={`/blogs/${blog.slug}`}>
                        <button className="w-full bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-gradient-to-r hover:from-[#3B82F6] hover:to-[#06B6D4] hover:text-white hover:border-transparent text-[#0F172A] font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer">
                          Read Article
                          <svg
                            className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookmarked Tab */}
          {activeTab === "bookmarked" && !loading && (
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center border border-[#BFDBFE]">
                  <svg
                    className="h-5 w-5 text-[#3B82F6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                  Saved Articles
                </h2>
              </div>

              {bookmarkedBlogs.length === 0 ? (
                <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-[#E2E8F0] border-dashed">
                  <div className="w-20 h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#E2E8F0]">
                    <svg
                      className="h-10 w-10 text-[#94A3B8]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-3">
                    No saved articles yet
                  </h3>
                  <p className="text-[#64748B] font-medium max-w-md mx-auto">
                    Start exploring our content and bookmark the articles you
                    want to read later. They&apos;ll appear right here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {bookmarkedBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] border border-[#E2E8F0] overflow-hidden hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:border-[#3B82F6] transition-all duration-500 hover:-translate-y-1 group flex flex-col"
                    >
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="text-xl font-bold text-[#0F172A] leading-tight group-hover:text-[#3B82F6] transition-colors">
                            {blog.title}
                          </h3>
                          <button
                            onClick={() => toggleBookmark(blog.id)}
                            className="shrink-0 text-[#3B82F6] hover:text-sky-700 transition-colors cursor-pointer"
                            aria-label="Remove bookmark"
                          >
                            <svg
                              className="h-4 w-4 fill-current"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="text-[#64748B] text-sm mb-6 line-clamp-2 font-medium flex-grow">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E2E8F0]">
                          <span className="text-xs font-semibold text-[#64748B]">
                            {blog.author?.name || "Unknown"}
                          </span>
                          <Link href={`/blogs/${blog.slug}`}>
                            <button className="bg-[#EFF6FF] hover:bg-sky-600 text-[#3B82F6] hover:text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer">
                              Read
                              <svg
                                className="h-3.5 w-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredBlogs.length === 0 && (
            <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-[#E2E8F0] border-dashed mt-8">
              <div className="w-20 h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#E2E8F0]">
                <svg
                  className="h-10 w-10 text-[#94A3B8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M15 15l6 6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">
                No matching articles found
              </h3>
              <p className="text-[#64748B] font-medium max-w-md mx-auto">
                We couldn&apos;t find any articles matching your search or
                filter criteria. Try adjusting your search parameters.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
