const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const EMAIL_ENDPOINT = {
  SEND_EMAIL: `${API_BASE_URL}/api/v1/support/send-email`,
};

export const blogsAPI = {
  // Public blog list — used by /blogs
  getPublic: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(
        `${API_BASE_URL}/api/v1/blog/public?${queryParams}`,
        { cache: "no-store" }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch public blogs");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // Single blog by slug — used by /blogs/[slug]
  getBySlug: async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/blog/slug/${slug}`, {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch blog");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // Like / comment on a blog — used by /blogs/[slug]
  addInteraction: async (blogId, interactionData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/blog/${blogId}/interaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(interactionData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add interaction");
      }

      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};
