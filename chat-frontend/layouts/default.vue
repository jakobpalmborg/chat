<template>
  <div class="DefaultLayout">
    <body class="relative min-h-screen pb-32">
      <Header />
      <main class="flex justify-center mt-5 mb-5">
        <slot />
      </main>
      <Footer />
    </body>
  </div>
</template>
