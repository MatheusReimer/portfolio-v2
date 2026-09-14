<template>
  <div class="site">
    <a class="px-skip" href="#main">Skip to content</a>

    <SiteHeader />

    <main id="main">
      <NuxtPage />
    </main>

    <SiteFooter />

    <div class="px-scanlines" aria-hidden="true" />
  </div>
</template>

<style>
.site {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#main {
  flex: 1;
}
</style>
