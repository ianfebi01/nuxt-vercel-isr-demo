<template>
  <div class="isr-demo">
    <h1>🔄 ISR (Incremental Static Regeneration) Demo</h1>

    <section class="info-box">
      <h2>How it works</h2>
      <ul>
        <li>This page fetches data from <code>jsonplaceholder.typicode.com</code></li>
        <li>The response is cached via <strong>ISR</strong> (Incremental Static Regeneration)</li>
        <li>Revalidation is <strong>on-demand only</strong> via bypass token header</li>
        <li>Trigger revalidation with curl (see instructions below)</li>
      </ul>
    </section>

    <!-- Error state -->
    <section v-if="error" class="error-box">
      <h2>❌ Error</h2>
      <p>{{ error }}</p>
    </section>

    <!-- Data display - always rendered on server, client hydrates from Nuxt payload -->
    <section v-if="data" class="data-section">
      <div class="timestamp">
        ⏱️ <strong>Page generated at:</strong> {{ data.generatedAt }}
      </div>

      <h2>📋 Blog Posts (from JSONPlaceholder)</h2>
      <div class="posts-grid">
        <article v-for="post in data.posts" :key="post.id" class="post-card">
          <span class="post-id">#{{ post.id }}</span>
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </article>
      </div>
    </section>

    <!-- On-demand revalidation instructions -->
    <section class="revalidation-box">
      <h2>⚡ Trigger On-Demand Revalidation</h2>
      <p>Send a GET request with the bypass token header:</p>
      <pre><code>curl -H "x-prerender-revalidate: c335a6c586248ce185bd68855b1e70a1f108e7d1d3b32af81202173ee8daa0b6" \
  https://your-app.vercel.app/isr-demo</code></pre>
      <p class="hint">
        Revalidation happens <strong>in the background</strong>. The response
        to the curl may still show old content — refresh the page in the browser
        and check the <code>generatedAt</code> timestamp above to verify!
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
// useAsyncData with explicit key ensures the server-rendered data is
// serialized into the Nuxt payload (window.__NUXT__) and the client
// hydrates from that payload — never re-fetches, avoiding hydration mismatches.
const { data, error } = await useAsyncData(
  'isr-demo-data',
  () => $fetch('/api/isr-data'),
)
</script>

<style scoped>
.isr-demo {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h2 {
  font-size: 1.25rem;
  margin: 1rem 0 0.5rem;
}

.info-box, .revalidation-box {
  background: #f0f4ff;
  border: 1px solid #c3dafe;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.info-box ul {
  margin: 0.5rem 0 0 1.25rem;
  line-height: 1.7;
}

code {
  background: #e8e8e8;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.error-box {
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 1.25rem;
  color: #c00;
  margin-bottom: 1.5rem;
}

.loading-box {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.timestamp {
  background: #2d3748;
  color: #68d391;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-family: 'SF Mono', 'Fira Code', monospace;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.posts-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  transition: box-shadow 0.2s;
}

.post-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.post-id {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.post-card h3 {
  font-size: 1.05rem;
  margin: 0.25rem 0;
  text-transform: capitalize;
}

.post-card p {
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-top: 0.5rem;
}

pre {
  background: #1a202c;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
}

code {
  background-color: #1a202c69;
}

.hint {
  font-size: 0.85rem;
  color: #718096;
  margin-top: 0.75rem;
}
</style>
