// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Enable Nuxt 4 compatibility mode
  compatibilityVersion: 4,

  // ISR (Incremental Static Regeneration) configuration
  routeRules: {

    // ISR demo page: revalidates every 60 seconds (time-based)
    // Also supports on-demand revalidation via x-prerender-revalidate header
    "/**": { isr: true },
  },

  // On-demand ISR revalidation via bypass token
  // Set BYPASS_TOKEN env var on Vercel, then trigger with:
  //   curl -H "x-prerender-revalidate: YOUR_TOKEN" https://<app>.vercel.app/isr-demo
  nitro: {
    vercel: {
      config: {
        bypassToken: process.env.BYPASS_TOKEN || 'dev-bypass-token',
      },
    },
    prerender : {
     routes: [
      "/isr-demo",
      "/",
     ],
     failOnError : true,
     crawlLinks  : false,
   },
  },
});
