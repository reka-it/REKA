import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // GitHub Pages only serves static files, so the app runs in SPA mode.
  ssr: false,
} satisfies Config;
