// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Enable Nuxt 4 compatibility mode
  compatibilityVersion: 4,

  // ISR (Incremental Static Regeneration) configuration
  routeRules: {
    // Home page: static prerender
    '/': { prerender: true },

    // ISR demo page: ISR with on-demand revalidation
    // Set VERCEL_BYPASS_TOKEN env var on Vercel, then trigger with:
    //   curl -H "x-prerender-revalidate: YOUR_TOKEN" https://<app>.vercel.app/isr-demo
    '/isr-demo': { isr: true },
  },
  experimental: {
    inlineRouteRules: true,
    payloadExtraction: false, // ← disables _payload.json, inlines data into HTML
  },

  nitro: {
    vercel: {
      config: {
        // IMPORTANT: Set VERCEL_BYPASS_TOKEN env var in Vercel dashboard, then
        // use the SAME token in the x-prerender-revalidate header.
        bypassToken: process.env.VERCEL_BYPASS_TOKEN || 'dev-bypass-token',
      },
    },
    prerender: {
      routes: [
        '/',
      ],
      failOnError: true,
      crawlLinks: false,
    },
  },
});
