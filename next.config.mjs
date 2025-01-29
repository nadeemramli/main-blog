import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    unoptimized: true, // Required for static export
  },
  engines: {
    node: ">=18.18.0"
  }
};

export default withMDX(nextConfig);
