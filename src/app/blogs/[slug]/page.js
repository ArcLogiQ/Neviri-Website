"use client";

import { useState, useEffect, useMemo, use, useRef } from "react";
import Link from "next/link";
import { blogsAPI } from "@/config/api";
import toast from "react-hot-toast";
import BlogDetailLayout from "@/components/blogs/BlogDetailLayout";
import { displayViews } from "@/lib/blogViews";

const __PREVIEW_BLOG = {
  id: "preview-1",
  slug: "__preview",
  title: "Designing a Calmer Cloud Console: Layout, Density, and Focus",
  excerpt:
    "A walkthrough of how we rethought the reading experience — comfortable measure, sticky wayfinding, and just enough chrome to stay out of the way.",
  category: "Design",
  createdAt: "2026-08-20T00:00:00.000Z",
  author: { name: "Neviri Cloud" },
  readTime: 9,
  views: 2143,
  likeCount: 12,
  tags: ["design", "layout", "typography", "ux"],
  content: [
    {
      order: 1,
      type: "text",
      heading: "Why whitespace isn't the enemy",
      content:
        "Empty space on the sides of an article isn't wasted — it's a signal that the page hasn't decided what to do with the room. The fix isn't to stretch text edge to edge; it's to give the margins a job.\n\nWe kept the measure comfortable and let the flanks carry wayfinding instead of prose.",
    },
    {
      order: 2,
      type: "text",
      heading: "A comfortable reading measure",
      content:
        "Long lines tire the eye. We cap the column near 720px so a line holds roughly 70–80 characters, then center it between two quiet rails.",
    },
    {
      order: 3,
      type: "quote",
      heading: "Editorial principle",
      content:
        "Give every pixel a reason. If a region can't earn attention, let it hold the reader's place instead.",
    },
    {
      order: 4,
      type: "code",
      heading: "The grid, in one line",
      content: "grid-template-columns: 3rem minmax(0, 1fr) 16rem;",
      language: "css",
    },
    {
      order: 5,
      type: "text",
      heading: "Sticky wayfinding on the sides",
      content:
        "The left rail keeps sharing one thumb-reach away. The right rail tracks where you are in the piece and lets you jump — without ever crowding the words.",
    },
    {
      order: 6,
      type: "text",
      heading: "What we deliberately left out",
      content:
        "No decorative cards, no filler modules, no second navbar. The margins stay calm on purpose.",
    },
  ],
  comments: [],
};

export default function BlogPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;
  const isPreview = slug === "__preview";

  const [blog, setBlog] = useState(isPreview ? __PREVIEW_BLOG : null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(!isPreview);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    async function fetchOnce() {
      if (slug === "__preview") {
        setBlog(__PREVIEW_BLOG);
        setLoading(false);
        return;
      }
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

    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchOnce();
    }
  }, [slug]);

  const handleLike = async () => {
    if (!blog) return;
    try {
      const res = await blogsAPI.addInteraction(blog.id || blog._id, {
        type: "like",
      });
      if (res && res.data) {
        setIsLiked(!isLiked);
        setBlog((prev) => ({
          ...prev,
          likeCount: isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        }));
        toast.success(isLiked ? "Unliked" : "Liked!");
      }
    } catch {
      toast.error("Failed to update like");
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("blogBookmarks") || "[]");
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter((b) => b !== slug);
      toast.success("Removed from bookmarks");
    } else {
      updated = [...bookmarks, slug];
      toast.success("Added to bookmarks");
    }
    localStorage.setItem("blogBookmarks", JSON.stringify(updated));
    setIsBookmarked(!isBookmarked);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !blog) return;
    try {
      const res = await blogsAPI.addInteraction(blog.id || blog._id, {
        type: "comment",
        content: newComment,
      });
      if (res && res.data) {
        setComments((prev) => [res.data, ...prev]);
        setNewComment("");
        toast.success("Comment added!");
      }
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const sortedContent = useMemo(() => {
    if (!blog?.content) return [];
    return [...blog.content].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [blog]);

  const headings = useMemo(() => {
    return sortedContent
      .map((block, index) => ({ block, index }))
      .filter(
        ({ block }) =>
          ["text", "code", "image"].includes(block.type) &&
          typeof block.heading === "string" &&
          block.heading.trim().length > 0
      )
      .map(({ block, index }) => ({
        id: `section-${index}`,
        text: block.heading,
        level: block.type === "text" ? 2 : 3,
      }));
  }, [sortedContent]);

  const renderContentBlock = (block, index) => {
    const sectionId = `section-${index}`;
    switch (block.type) {
      case "text":
        return (
          <div key={block.order || index} className="mb-8">
            {block.heading && (
              <h2
                id={sectionId}
                className="text-2xl font-bold text-[#1A1F2C] mb-4"
              >
                {block.heading}
              </h2>
            )}
            {block.image && (
              <div className="mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.image}
                  alt={block.heading || "Blog image"}
                  className="w-full rounded-xl border border-[#DDE3EA]"
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
          <div key={block.order || index} className="mb-8">
            {block.heading && (
              <h3
                id={sectionId}
                className="text-xl font-semibold text-[#1A1F2C] mb-4"
              >
                {block.heading}
              </h3>
            )}
            <div className="rounded-xl overflow-hidden border border-[#DDE3EA] bg-[#0F172A]">
              <pre className="p-4 overflow-x-auto text-[#E2E8F0]">
                <code className={`language-${block.language || "text"} text-sm`}>
                  {block.content}
                </code>
              </pre>
            </div>
          </div>
        );
      case "image":
        return (
          <div key={block.order || index} className="mb-8">
            {block.heading && (
              <h3
                id={sectionId}
                className="text-xl font-semibold text-[#1A1F2C] mb-4"
              >
                {block.heading}
              </h3>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.image || block.url}
              alt={block.caption || block.heading || "Blog image"}
              className="w-full rounded-xl border border-[#DDE3EA]"
            />
            {block.caption && (
              <p className="text-center text-sm text-[#9AA5B8] mt-2 italic">
                {block.caption}
              </p>
            )}
          </div>
        );
      case "quote":
        return (
          <figure
            key={block.order || index}
            className="my-8 border-l-4 border-sky-600 bg-sky-50/50 p-6 rounded-r-xl"
          >
            <blockquote className="text-lg italic text-[#1A1F2C]">
              &ldquo;{block.content}&rdquo;
            </blockquote>
            {block.author && (
              <figcaption className="mt-2 text-sm text-[#9AA5B8]">
                &mdash; {block.author}
              </figcaption>
            )}
          </figure>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600 mx-auto" />
          <p className="text-[#9AA5B8] mt-3 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A1F2C] mb-2">
            Blog Not Found
          </h1>
          <p className="text-[#4B5565] mb-4">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blogs"
            className="inline-block bg-sky-600 text-white px-5 py-2.5 rounded-lg hover:bg-sky-700 font-medium"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <BlogDetailLayout
      slug={slug}
      title={blog.title}
      category={blog.category}
      headings={headings}
    >
      <article className="min-w-0">
        {/* Article Header */}
        <header className="mb-8">
          <span className="inline-block bg-sky-600 text-white px-3 py-1 rounded-md text-sm font-medium mb-4">
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1F2C] mb-4 leading-tight">
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="text-xl text-[#4B5565] mb-6 leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E2E8F0]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-semibold">
                {blog.author?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "N"}
              </div>
              <div>
                <p className="font-semibold text-[#1A1F2C] text-sm">
                  {blog.author?.name || "Neviri Team"}
                </p>
                <div className="flex items-center space-x-3 text-xs text-[#9AA5B8]">
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>&bull;</span>
                  <span>{blog.readTime || 5} min read</span>
                  <span>&bull;</span>
                  <span>{displayViews(blog)}</span>
                </div>
              </div>
            </div>

            {/* Interaction Buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleLike}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                  isLiked
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-[#E2E8F0] bg-white text-[#4B5565] hover:bg-gray-50"
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
                <span>{blog.likeCount || 0}</span>
              </button>

              <button
                type="button"
                onClick={handleBookmark}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                  isBookmarked
                    ? "border-sky-200 bg-sky-50 text-sky-600"
                    : "border-[#E2E8F0] bg-white text-[#4B5565] hover:bg-gray-50"
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
                <span>Save</span>
              </button>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="article-body">
          {sortedContent.map((block, index) =>
            renderContentBlock(block, index)
          )}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md bg-[#F1F5F9] text-xs font-medium text-[#4B5565]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Card */}
        <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
              {blog.author?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "N"}
            </div>
            <div>
              <h3 className="font-bold text-[#1A1F2C]">
                {blog.author?.name || "Neviri Cloud Team"}
              </h3>
              <p className="text-sm text-[#4B5565] mt-1">
                Engineering and cloud architecture insights from the Neviri Cloud team.
              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
          <h3 className="text-xl font-bold text-[#1A1F2C] mb-6">
            Comments ({comments.length})
          </h3>

          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full p-3.5 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 disabled:opacity-50 transition-colors"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id || comment._id}
                className="p-4 rounded-xl border border-[#E2E8F0] bg-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-[#1A1F2C]">
                    {comment.author?.name || "Reader"}
                  </span>
                  <span className="text-xs text-[#9AA5B8]">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Recently"}
                  </span>
                </div>
                <p className="text-sm text-[#4B5565]">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </BlogDetailLayout>
  );
}
