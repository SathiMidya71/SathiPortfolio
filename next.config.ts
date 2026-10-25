import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Opportunities and Proposals became one shared supplier module (Oct 2026)
  async redirects() {
    return [
      { source: "/work/scinode/researcher/opportunities", destination: "/work/scinode/suppliers/opportunities-proposals", permanent: true },
      { source: "/work/scinode/researcher/proposals", destination: "/work/scinode/suppliers/opportunities-proposals", permanent: true },
      { source: "/work/scinode/manufacturer/opportunities-proposals", destination: "/work/scinode/suppliers/opportunities-proposals?from=manufacturer", permanent: true },
    ];
  },
};

export default nextConfig;
