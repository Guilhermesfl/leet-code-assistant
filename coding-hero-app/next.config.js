/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/problem-tracker",
        destination: "/progress?tab=problems",
        permanent: true,
      },
      {
        source: "/theory-tracker",
        destination: "/progress?tab=theory",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
