const headers = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Server",
    value: "Apache", // phony server
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "sameorigin",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "same-origin",
  },
  {
    key: "Permissions-Policy",
    value: "geolocation=*", // allow specified policies here
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
};
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["exam105.s3-ap-southeast-1.amazonaws.com"],
  },
};
