<script setup>
const props = defineProps({
  libro: { type: Object, required: true },
})

const emit = defineEmits(['eliminar'])
</script>

<template>
  <article class="book-card">
    <div class="book-cover-wrap">
      <img :src="libro.portada" :alt="`Portada ilustrativa de ${libro.titulo}`" class="book-cover" />
    </div>
    <div class="book-card-body">
      <span class="genre-pill">{{ libro.genero }}</span>
      <h3>{{ libro.titulo }}</h3>
      <p class="book-author">{{ libro.autor }}</p>
      <p class="book-year">{{ libro.anio }}</p>
      <div class="book-actions">
        <RouterLink :to="`/libros/${libro.id}`" class="button button-outline button-small"><span>↗</span> Ver</RouterLink>
        <button class="icon-button" type="button" @click="emit('eliminar', libro.id)" :aria-label="`Eliminar ${libro.titulo}`">⌫</button>
      </div>
    </div>
  </article>
</template>
