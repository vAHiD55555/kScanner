/** @type {import("next").NextConfig} */
const config = {
  output: 'export',
  images: {   
    unoptimized: true,
  },  
  reactStrictMode: true,
  basePath: "/cloudflare-scanner",
};
export default config;
