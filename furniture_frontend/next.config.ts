import type { NextConfig } from "next";

/**
 * Standard Next.js configuration.
 * Removes 'output: export' to enable dynamic API fetching at runtime.
 */
const nextConfig: NextConfig = {
  // output: "export", // Removed to enable dynamic SSR/ISR and runtime API calls
};

export default nextConfig;
