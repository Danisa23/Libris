import { createRouter, createWebHashHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'inicio', component: InicioView },
    { path: '/libros', name: 'libros', component: ListaLibros },
    { path: '/libros/:id', name: 'detalle-libro', component: DetalleLibro, props: true },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
