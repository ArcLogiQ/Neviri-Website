"use client";
import { useState, useEffect, use, useRef } from "react";
import Link from "next/link";
import { blogsAPI } from "@/config/api";
import toast from "react-hot-toast";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogNavbar from "@/components/blogs/BlogNavbar";

export default function BlogPage({ params }) {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [highlightedCommentId, setHighlightedCommentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    async function fetchOnce() {
      try {
        setLoading(true);
        const res = await blogsAPI.getBySlug(slug);
        if (res && res.data) {
          setBlog(res.data);
          const bookmarks = JSON.parse(
            localStorage.getItem("blogBookmarks") || "[]"
          );
          setIsBookmarked(bookmarks.includes(slug));

          setIsLiked(res.data.isLiked || false);
          setComments(res.data.comments || []);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    }
    if (!slug) return;
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchOnce();
  }, [slug]);

  const handleLike = async () => {
    if (!blog || isLiked) {
      toast.error("You have already liked this blog.");
      return;
    }
    try {
      await blogsAPI.addInteraction(blog.id, { type: "like" });
      setBlog((prev) =>
        prev ? { ...prev, likeCount: (prev.likeCount || 0) + 1 } : prev
      );
      setIsLiked(true);
      toast.success("Blog liked!");
    } catch (error) {
      toast.error("You have already liked this blog.");
    }
  };

  // Comment handler
  const handleComment = async () => {
    if (!blog || !newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    try {
      const res = await blogsAPI.addInteraction(blog.id, {
        type: "comment",
        content: newComment,
      });
      setNewComment("");
      if (res && res.data && res.data.comments) {
        setComments(res.data.comments);
        setBlog((prev) => ({ ...prev, comments: res.data.comments }));
        if (res.data.comments.length > 0) {
          setHighlightedCommentId(res.data.comments[0].id);
          setTimeout(() => setHighlightedCommentId(null), 2000);
        }
        toast.success("Comment posted!");
      }
    } catch (error) {
      toast.error("Failed to post comment.");
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);

    // Save to localStorage
    const bookmarks = JSON.parse(localStorage.getItem("blogBookmarks") || "[]");
    if (newBookmarkState) {
      if (!bookmarks.includes(slug)) {
        bookmarks.push(slug);
        localStorage.setItem("blogBookmarks", JSON.stringify(bookmarks));
      }
    } else {
      const updatedBookmarks = bookmarks.filter(
        (bookmarkSlug) => bookmarkSlug !== slug
      );
      localStorage.setItem("blogBookmarks", JSON.stringify(updatedBookmarks));
    }

    toast.success(
      newBookmarkState ? "Added to bookmarks" : "Removed from bookmarks"
    );
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this blog: ${blog?.title}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        break;
    }
    setShowShareMenu(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderContentBlock = (block) => {
    switch (block.type) {
      case "text":
        return (
          <div key={block.order} className="mb-8">
            {block.heading && (
              <h2 className="text-2xl font-bold text-[#1A1F2C] mb-4">
                {block.heading}
              </h2>
            )}
            {block.image && (
              <div className="mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.image}
                  alt={block.heading || "Blog image"}
                  className="w-full rounded-lg border border-[#DDE3EA]"
                  onError={(e) => {
                    const sas = process.env.NEXT_PUBLIC_AZURE_BLOG_SAS_URL;
                    if (sas && !block.image.includes("?")) {
                      e.currentTarget.src = `${block.image}?${
                        sas.split("?")[1]
                      }`;
                    }
                  }}
                />
              </div>
            )}
            <p className="text-[#4B5565] leading-relaxed text-lg whitespace-pre-line">
              {block.content}
            </p>
          </div>
        );
      case "code":
        return (
          <div key={block.order} className="mb-8">
            {block.heading && (
              <h3 className="text-xl font-semibold text-[#1A1F2C] mb-4">
                {block.heading}
              </h3>
            )}
            <div className="rounded-lg overflow-hidden border border-[#DDE3EA] bg-[#F7F9FC]">
              <pre className="p-4 overflow-x-auto">
                <code
                  className={`language-${block.language} text-sm text-[#4B5565]`}
                >
                  {block.content}
                </code>
              </pre>
            </div>
          </div>
        );
      case "image":
        return (
          <div key={block.order} className="mb-8">
            {block.heading && (
              <h3 className="text-xl font-semibold text-[#1A1F2C] mb-4">
                {block.heading}
              </h3>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.image}
              alt={block.heading || "Blog image"}
              className="w-full rounded-lg border border-[#DDE3EA]"
            />
            {block.content && (
              <p className="text-[#9AA5B8] text-sm mt-2 text-center">
                {block.content}
              </p>
            )}
          </div>
        );
      case "quote":
        return (
          <div key={block.order} className="mb-8">
            <blockquote className="border-l-4 border-sky-600 pl-6 py-4 bg-sky-600/10 rounded-r-lg">
              <p className="text-lg italic text-[#4B5565]">{block.content}</p>
              {block.heading && (
                <cite className="text-sm text-[#9AA5B8] mt-2 block">
                  — {block.heading}
                </cite>
              )}
            </blockquote>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] text-[#1A1F2C] pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A1F2C]"></div>
            <p className="text-[#9AA5B8] mt-2">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] text-[#1A1F2C] pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-[#1A1F2C] mb-4">
              Blog Not Found
            </h2>
            <p className="text-[#9AA5B8] mb-6">
              The blog you are looking for does not exist.
            </p>
            <Link href="/blogs">
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg transition-colors">
                Back to Blogs
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1A1F2C] pt-16">
      <div className="fixed top-0 left-0 right-0 z-20">
        <BlogNavbar />
      </div>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/signup1.jpeg')] bg-cover bg-center opacity-5 z-0"></div>
      <div className="absolute top-20 left-10 w-96 h-96  rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80  rounded-full blur-3xl z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb />
        </div>

        {/* Blog Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="inline-block bg-sky-600 text-white px-3 py-1 rounded text-sm mb-4">
              {blog?.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1F2C] mb-4 leading-tight">
              {blog?.title}
            </h1>
            <p className="text-xl text-[#4B5565] mb-6">{blog?.excerpt}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {blog?.author?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </div>
                <div>
                  <p className="font-semibold text-[#1A1F2C]">
                    {blog?.author?.name || "Unknown"}
                  </p>
                  <div className="flex items-center space-x-3 text-sm text-[#9AA5B8]">
                    <div className="flex items-center space-x-1">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{formatDate(blog?.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
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
                      <span>{blog?.readTime || 5} min read</span>
                    </div>
                    <div className="flex items-center space-x-1">
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
                      <span>{(blog?.views || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked
                    ? "bg-[#C12828]/20 text-[#C12828] border border-[#C12828]/30"
                    : "bg-[#E5EAF1] hover:bg-[#DDE3EA] text-[#4B5565] border border-[#DDE3EA]"
                }`}
              >
                <svg
                  className="h-4 w-4"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <span className="text-sm text-[#9AA5B8]">
                {blog?.likeCount || 0}
              </span>

              <button
                onClick={handleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? "bg-[#2563EB]/20 text-sky-600 border border-[#2563EB]/30"
                    : "bg-[#E5EAF1] hover:bg-[#DDE3EA] text-[#4B5565] border border-[#DDE3EA]"
                }`}
              >
                <svg
                  className="h-4 w-4"
                  fill={isBookmarked ? "currentColor" : "none"}
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

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 bg-[#E5EAF1] hover:bg-[#DDE3EA] text-[#4B5565] border border-[#DDE3EA] rounded-lg transition-colors"
                >
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>

                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#DDE3EA] rounded-lg shadow-lg z-10">
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => handleShare("twitter")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#4B5565] hover:bg-[#F7F9FC] rounded transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#4B5565] hover:bg-[#F7F9FC] rounded transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare("facebook")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#4B5565] hover:bg-[#F7F9FC] rounded transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#4B5565] hover:bg-[#F7F9FC] rounded transition-colors"
                      >
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy Link
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog?.featuredImage && (
            <div className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg border border-[#DDE3EA]"
                onError={(e) => {
                  const sas = process.env.NEXT_PUBLIC_AZURE_BLOG_SAS_URL;
                  if (sas && !blog.featuredImage.includes("?")) {
                    e.currentTarget.src = `${blog.featuredImage}?${
                      sas.split("?")[1]
                    }`;
                  }
                }}
              />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog?.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-[#E5EAF1] text-[#4B5565] px-2 py-1 rounded text-xs border border-[#DDE3EA]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Blog Content */}
        <div className="mb-12">
          {blog?.content
            ?.sort((a, b) => a.order - b.order)
            .map(renderContentBlock)}
        </div>

        {/* Author Bio */}
        <div className="mb-12">
          <div className="bg-white backdrop-blur-sm rounded-xl border border-[#DDE3EA] p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-sky-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {blog?.author?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#1A1F2C] mb-2">
                  {blog?.author?.name || "Unknown"}
                </h3>
                <p className="text-[#4B5565] mb-3">
                  Experienced developer and technical writer passionate about
                  cloud computing and modern web technologies.
                </p>
                <div className="flex items-center space-x-4 text-sm text-[#9AA5B8]">
                  <span>📧 Contact the author</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <div className="bg-white backdrop-blur-sm rounded-xl border border-[#DDE3EA] overflow-hidden">
            <div className="p-6 border-b border-[#DDE3EA]">
              <h3 className="text-xl font-semibold text-[#1A1F2C] flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Comments ({comments.length})
              </h3>
            </div>
            <div className="p-6">
              {/* Add Comment */}
              <div className="mb-6">
                <textarea
                  placeholder="Share your thoughts..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-[#F7F9FC] border border-[#DDE3EA] rounded-lg px-4 py-3 text-[#1A1F2C] placeholder-[#9AA5B8] focus:outline-none focus:border-sky-600 transition-colors resize-none mb-3"
                  rows="4"
                />
                <button
                  onClick={handleComment}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Post Comment
                </button>
              </div>

              <div className="border-t border-[#DDE3EA] pt-6">
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`flex space-x-4 p-4 rounded-lg transition-all duration-700 ${
                        highlightedCommentId === comment.id
                          ? "bg-[#936700]/10 border border-[#936700]/30"
                          : "bg-[#F7F9FC] border border-[#DDE3EA]"
                      }`}
                    >
                      <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {comment.user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-[#1A1F2C]">
                            {comment.user?.name || "Anonymous"}
                          </span>
                          <span className="text-sm text-[#9AA5B8]">
                            {formatDateTime(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-[#4B5565] mb-2">{comment.content}</p>
                        <button className="flex items-center gap-1 text-[#9AA5B8] hover:text-[#4B5565] transition-colors text-sm">
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
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                          <span>{comment.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {comments.length === 0 && (
                    <div className="text-center py-8 text-[#9AA5B8]">
                      No comments yet. Be the first to share your thoughts!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
