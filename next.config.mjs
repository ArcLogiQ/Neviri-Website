/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        // Temporary (302) redirect
        source: "/solutions",
        destination: "/products",
        statusCode: 302,
      },
      {
        source: "/blog",
        destination: "/blogs",
        statusCode: 302,
      },
    ];
  },
};

export default nextConfig;
