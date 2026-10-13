<template>
  <!-- Rota interna -->
  <q-item
    v-if="to"
    clickable
    :to="to"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>

  <!-- Link externo -->
  <q-item
    v-else
    clickable
    tag="a"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  label: string
  caption?: string
  icon?: string
  to?: string
  href?: string
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  icon: ''
})
</script>
