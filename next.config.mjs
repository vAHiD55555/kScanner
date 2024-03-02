/** @type {import("next").NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const config = {
  output: 'export',
  images: {   
    unoptimized: true,
  },  
  reactStrictMode: true,
  basePath: "/cloudflare-scanner",
  assetPrefix: isProd ? '/cloudflare-scanner' : undefined,
};
export default config;
