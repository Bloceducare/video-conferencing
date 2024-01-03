import { config } from './src/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== '/' ? config.base_path : '',
  trailingSlash: config.site.trailing_slash,
  images: {
    domains: ['res.cloudinary.com', 'i.pravatar.cc'],
  },
};

module.exports = nextConfig;
