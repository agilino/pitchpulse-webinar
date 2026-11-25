<!-- Thin footer with the heptams logo on every slide except the cover, which has its own footer -->
<template>
  <div v-if="$page !== 1" class="hms-footer">
    <img
      :src="String($frontmatter.class ?? '').includes('dark') ? '/heptams-logo-light.svg' : '/heptams-logo.svg'"
      alt="heptams"
    >
  </div>
</template>

<style>
.hms-footer {
  position: absolute;
  right: 2.5rem;
  bottom: 0.9rem;
  pointer-events: none;
}
.hms-footer img {
  height: 18px;
  width: auto;
  display: block;
}
</style>
