const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [require('rehype-slug')],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  experimental: {
    appDir: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
})

module.exports = nextConfig
