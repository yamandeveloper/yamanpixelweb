/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 🚀 Bu satır statik HTML export'u aktif eder
  images: {
    unoptimized: true, // statik export'ta zorunlu
  },
};

module.exports = nextConfig;
