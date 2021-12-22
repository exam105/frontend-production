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
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // {
  //   key: "Content-Security-Policy",
  //   value: "default-src *; img-src *; media-src *;",
  //   // value:
  //   // "default-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; frame-src 'none'; img-src 'none'; script-src 'none'; style-src 'none'; font-src 'none'; connect-src 'none'; media-src 'none'; object-src 'none'; plugin-types 'none'; child-src 'none'; frame-src 'none'; frame-ancestors 'none'; worker-src 'none'; manifest-src 'none';",
  // },
];
module.exports = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ["exam105.s3-ap-southeast-1.amazonaws.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
};
