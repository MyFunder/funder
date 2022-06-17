/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// next.config.js
module.exports = {
  env: {
    MongoURi: process.env.MongoURi,
  },
  images: {
    loader: "akamai",
    path: "",
  },
};
