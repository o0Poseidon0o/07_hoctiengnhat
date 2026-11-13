import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep the MongoDB driver out of the server bundle (native/optional deps).
  serverExternalPackages: ['mongodb'],
};

export default nextConfig;

