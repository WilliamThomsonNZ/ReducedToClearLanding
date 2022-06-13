module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["files.cdn.printful.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
