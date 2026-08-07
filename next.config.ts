import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    next dev otherwise appends a generated block to CLAUDE.md on every run.
    That file is this project's operating rules and is outside the batch's
    bounded file list, and the generated text contains an em dash, which the
    house style forbids. Turning it off keeps both rules enforceable.
  */
  agentRules: false,
};

export default nextConfig;
