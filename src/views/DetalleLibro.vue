<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBiblioteca } from '../composables/useBiblioteca'

const props = defineProps({ id: { type: String, required: true } })
const router = useRouter()
const { obtenerLibro, eliminarLibro } = useBiblioteca()
const libro = computed(() => obtenerLibro(props.id))

function eliminarActual() {
  if (!libro.value) return
  eliminarLibro(libro.value.id)
  router.push('/libros')
}

function editarActual() {
  if (!libro.value) return
  router.push({ path: '/libros', query: { editar: String(libro.value.id) } })
}
</script>

<template>
  <section class="detail-section">
    <div class="container">
      <RouterLink to="/libros" class="back-link">← Volver a la lista</RouterLink>

      <div v-if="libro" class="detail-card">
        <div class="detail-cover-column">
          <img :src="libro.portada" :alt="`Portada ilustrativa de ${libro.titulo}`" class="detail-cover" />
        </div>

        <div class="detail-main">
          <h1>{{ libro.titulo }}</h1>
          <span class="genre-pill detail-pill">{{ libro.genero }}</span>
          <div class="detail-meta-line"><span>♙</span><span>{{ libro.autor }}</span></div>
          <div class="detail-meta-line"><span>▣</span><span>{{ libro.anio }}</span></div>
          <p class="detail-description">{{ libro.descripcion || 'Este libro todavía no tiene una descripción registrada.' }}</p>
          <div class="detail-actions">
            <button type="button" class="button button-primary" @click="editarActual">✎ Editar</button>
            <button type="button" class="button button-danger" @click="eliminarActual">⌫ Eliminar</button>
          </div>
        </div>

        <aside class="info-panel">
          <div class="info-title"><span>ⓘ</span><strong>Información</strong></div>
          <dl>
            <div><dt>Título</dt><dd>{{ libro.titulo }}</dd></div>
            <div><dt>Autor</dt><dd>{{ libro.autor }}</dd></div>
            <div><dt>Género</dt><dd><span class="genre-pill">{{ libro.genero }}</span></dd></div>
            <div><dt>Año</dt><dd>{{ libro.anio }}</dd></div>
          </dl>
        </aside>
      </div>

      <div v-else class="empty-state">
        <span>!</span>
        <h1>Libro no encontrado</h1>
        <p>El registro solicitado no existe o fue eliminado.</p>
        <RouterLink to="/libros" class="button button-primary">Volver al catálogo</RouterLink>
      </div>
    </div>
  </section>
</template>
