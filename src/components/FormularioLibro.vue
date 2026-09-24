<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  libroInicial: { type: Object, default: null },
  modo: { type: String, default: 'crear' },
})

const emit = defineEmits(['guardar', 'cancelar'])

const formulario = reactive({ titulo: '', autor: '', genero: '', anio: '', descripcion: '' })

function cargarInicial() {
  Object.assign(formulario, {
    titulo: props.libroInicial?.titulo || '',
    autor: props.libroInicial?.autor || '',
    genero: props.libroInicial?.genero || '',
    anio: props.libroInicial?.anio || '',
    descripcion: props.libroInicial?.descripcion || '',
  })
}

watch(() => props.libroInicial, cargarInicial, { immediate: true })

const mostrarAyuda = computed(() => formulario.descripcion.length > 0 && formulario.descripcion.length < 25)
const hayVistaPrevia = computed(() => formulario.titulo || formulario.autor || formulario.genero || formulario.anio)

function limpiar() {
  Object.assign(formulario, { titulo: '', autor: '', genero: '', anio: '', descripcion: '' })
}

function enviar() {
  if (!formulario.titulo || !formulario.autor || !formulario.genero || !formulario.anio) return
  emit('guardar', { ...formulario })
  if (props.modo === 'crear') limpiar()
}
</script>

<template>
  <div class="form-layout">
    <form class="book-form" @submit.prevent="enviar" @keydown.enter.prevent="enviar">
      <div class="form-grid compact-form-grid">
        <label class="full-width">
          <span>Título <b>*</b></span>
          <input v-model.trim="formulario.titulo" type="text" placeholder="Ej. El nombre del viento" required />
        </label>

        <label class="full-width">
          <span>Autor <b>*</b></span>
          <input v-model.trim="formulario.autor" type="text" placeholder="Ej. Patrick Rothfuss" required />
        </label>

        <label>
          <span>Género <b>*</b></span>
          <select v-model="formulario.genero" required>
            <option disabled value="">Selecciona un género</option>
            <option>Novela</option>
            <option>Ciencia ficción</option>
            <option>Infantil</option>
            <option>Desarrollo personal</option>
            <option>Tecnología</option>
            <option>Historia</option>
          </select>
        </label>

        <label>
          <span>Año <b>*</b></span>
          <input v-model.number="formulario.anio" type="number" min="0" max="2100" placeholder="Ej. 2020" required />
        </label>

        <label class="full-width">
          <span>Descripción</span>
          <textarea v-model.trim="formulario.descripcion" rows="4" placeholder="Escribe una breve descripción del libro..."></textarea>
        </label>
      </div>

      <p v-show="mostrarAyuda" class="form-help">Una descripción un poco más amplia hará más útil la ficha del libro.</p>

      <div class="form-actions">
        <button type="submit" class="button button-primary">{{ modo === 'editar' ? 'Guardar cambios' : 'Agregar libro' }}</button>
        <button type="button" class="button button-soft" @click="modo === 'editar' ? emit('cancelar') : limpiar()">{{ modo === 'editar' ? 'Cancelar' : 'Limpiar' }}</button>
      </div>
    </form>

    <aside class="form-preview-panel">
      <img src="/icons/book-preview.svg" alt="" class="preview-book-icon" />
      <h3>Vista previa</h3>
      <template v-if="hayVistaPrevia">
        <strong>{{ formulario.titulo || 'Título pendiente' }}</strong>
        <p>{{ formulario.autor || 'Autor pendiente' }}</p>
        <div class="preview-meta">
          <span>{{ formulario.genero || 'Género pendiente' }}</span>
          <span>{{ formulario.anio || 'Año pendiente' }}</span>
        </div>
      </template>
      <p v-else>Completa los campos para ver la vista previa del libro.</p>

      <div class="tip-card">
        <span>💡</span>
        <div><strong>Tip</strong><p>Usa Enter para agregar rápidamente.</p></div>
      </div>
    </aside>
  </div>
</template>
