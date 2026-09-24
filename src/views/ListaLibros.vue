<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Libro from '../components/Libro.vue'
import FormularioLibro from '../components/FormularioLibro.vue'
import { useBiblioteca } from '../composables/useBiblioteca'

const route = useRoute()
const router = useRouter()
const { state, agregarLibro, actualizarLibro, eliminarLibro, obtenerLibro } = useBiblioteca()

const busqueda = ref(String(route.query.q || ''))
const genero = ref('Todos los géneros')

watch(() => route.query.q, (valor) => {
  busqueda.value = String(valor || '')
})

const modoFormulario = computed(() => {
  if (route.query.editar) return 'editar'
  if (route.query.nuevo === '1') return 'crear'
  return null
})

const libroEdicion = computed(() => modoFormulario.value === 'editar' ? obtenerLibro(route.query.editar) : null)
const generos = computed(() => ['Todos los géneros', ...new Set(state.libros.map((libro) => libro.genero))])
const librosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()
  return state.libros.filter((libro) => {
    const coincideTexto = !texto || [libro.titulo, libro.autor, libro.genero].some((valor) => valor.toLowerCase().includes(texto))
    const coincideGenero = genero.value === 'Todos los géneros' || libro.genero === genero.value
    return coincideTexto && coincideGenero
  })
})

function abrirNuevo() {
  router.push({ path: '/libros', query: { nuevo: '1' } })
}

function cerrarFormulario() {
  router.push('/libros')
}

function guardar(libro) {
  if (modoFormulario.value === 'editar' && route.query.editar) {
    actualizarLibro(route.query.editar, libro)
  } else {
    agregarLibro(libro)
  }
  router.push('/libros')
}
</script>

<template>
  <section class="catalog-section">
    <div class="container">
      <template v-if="modoFormulario">
        <RouterLink to="/libros" class="back-link">← Volver a la lista</RouterLink>
        <div class="page-heading form-page-heading">
          <div>
            <h1>{{ modoFormulario === 'editar' ? 'Editar libro' : 'Agregar nuevo libro' }}</h1>
            <p>{{ modoFormulario === 'editar' ? 'Actualiza la información del libro seleccionado.' : 'Completa la información del libro para añadirlo a tu biblioteca.' }}</p>
          </div>
        </div>
        <FormularioLibro :modo="modoFormulario" :libro-inicial="libroEdicion" @guardar="guardar" @cancelar="cerrarFormulario" />
      </template>

      <template v-else>
        <div class="page-heading">
          <div>
            <h1>Catálogo de libros</h1>
            <p>Explora, filtra y administra tu colección.</p>
          </div>
          <button class="button button-primary add-book-button" type="button" @click="abrirNuevo"><span>＋</span> Agregar libro</button>
        </div>

        <div class="toolbar">
          <label class="search-box">
            <span>⌕</span>
            <input v-model="busqueda" type="search" placeholder="Buscar por título, autor o género..." />
          </label>
          <select v-model="genero" class="filter-select">
            <option v-for="item in generos" :key="item">{{ item }}</option>
          </select>
          <span class="result-count">{{ librosFiltrados.length }} {{ librosFiltrados.length === 1 ? 'libro' : 'libros' }}</span>
        </div>

        <div v-if="librosFiltrados.length" class="book-grid">
          <Libro v-for="libro in librosFiltrados" :key="libro.id" :libro="libro" @eliminar="eliminarLibro" />
        </div>

        <div v-else class="empty-state">
          <span>⌕</span>
          <h2>No encontramos libros</h2>
          <p>Prueba otro término de búsqueda o agrega un nuevo título.</p>
        </div>

        <p v-if="librosFiltrados.length" class="showing-count">Mostrando {{ librosFiltrados.length }} {{ librosFiltrados.length === 1 ? 'libro' : 'libros' }}</p>
      </template>
    </div>
  </section>
</template>
