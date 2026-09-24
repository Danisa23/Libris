<script setup>
import { ref } from 'vue'

const exploracionRegistrada = ref(false)
</script>

<template>
  <section class="home-view">
    <div class="container home-panel">
      <div class="hero-grid">
        <div class="hero-copy">
          <span class="hero-badge">◉ Biblioteca Digital</span>
          <h1>Tus libros, siempre<br />a un clic</h1>
          <p>Organiza tu colección, agrega nuevos libros y accede al detalle de cada uno con una experiencia simple y moderna.</p>
          <div class="hero-actions">
            <RouterLink to="/libros" class="button button-primary button-lg" @click.once="exploracionRegistrada = true">
              Explorar libros <span>→</span>
            </RouterLink>
            <RouterLink :to="{ path: '/libros', query: { nuevo: '1' } }" class="button button-outline button-lg">Agregar un libro</RouterLink>
          </div>
        </div>

        <div class="hero-image-wrap" aria-hidden="true">
          <img src="/libris-hero.png" alt="" class="hero-image" />
        </div>
      </div>

      <div class="feature-grid">
        <article class="feature-card">
          <img src="/icons/manage.svg" alt="" class="feature-icon-image" />
          <h3>Gestión simple</h3>
          <p>Agrega, edita y elimina libros fácilmente.</p>
        </article>
        <article class="feature-card">
          <img src="/icons/search.svg" alt="" class="feature-icon-image" />
          <h3>Búsqueda rápida</h3>
          <p>Encuentra lo que necesitas al instante.</p>
        </article>
        <article class="feature-card">
          <img src="/icons/catalog.svg" alt="" class="feature-icon-image" />
          <h3>Tu catálogo</h3>
          <p>Mantén tu biblioteca siempre actualizada.</p>
        </article>
      </div>
    </div>
  </section>
</template>
