<template>
  <div>
    <Suspense>
      <NuxtPage />
      <template #fallback>
        <!-- optional: loading state during page transitions -->
         <div>loading...</div>
      </template>
    </Suspense>
  </div>
</template>
