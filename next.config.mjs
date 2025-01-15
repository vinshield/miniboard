/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "*.miniboard.site" }],
        destination: "/u/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        // port: "",
        // pathname: "/account123/**",
        // search: "",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  webpack(config) {
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // added for 'cannot resolve fs' error
      async_hooks: false, // added for 'cannot resolve async_hooks' error
    };

    config.module.rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] });

    return config;
  },
};

export default nextConfig;
