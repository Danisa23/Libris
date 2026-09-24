<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const busquedaGlobal = ref('')

function buscar() {
  const q = busquedaGlobal.value.trim()
  router.push({ path: '/libros', query: q ? { q } : {} })
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <div class="header-left">
        <RouterLink to="/" class="brand" aria-label="Libris - Inicio">
          <img src="/libris-logo.svg" alt="Libris" />
        </RouterLink>
        <nav class="nav" aria-label="Navegación principal">
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/libros">Libros</RouterLink>
        </nav>
      </div>

      <form class="header-search" @submit.prevent="buscar">
        <input v-model="busquedaGlobal" type="search" placeholder="Buscar libros..." aria-label="Buscar libros" />
        <button type="submit" aria-label="Buscar">⌕</button>
      </form>
    </div>
  </header>
</template>
