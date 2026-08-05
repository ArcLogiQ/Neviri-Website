/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // Temporary (302) redirect
        source: "/solutions",
        destination: "/products",
        statusCode: 302,
      },
    ];
  },
};

export default nextConfig;
