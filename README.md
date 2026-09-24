# Libris

SPA minimalista de gestión de libros desarrollada con Vue 3, Vite y Vue Router.

## Ejecutar

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Luego abre la dirección que muestre Vite.

## Funcionalidades demostradas

- Componentes reutilizables con props y eventos.
- `v-bind`, `v-if`, `v-show` y `v-for`.
- Formularios con `v-model` en input, select y textarea.
- Eventos `@click`, Enter, `.prevent` y `.once`.
- Vue Router con `/`, `/libros` y `/libros/:id`.
- Alta, edición, búsqueda, filtrado y eliminación de libros.
- Portadas específicas para 1984, El Principito, Hábitos Atómicos, Clean Code y El nombre del viento.
- Diseño claro, minimalista y responsive.

## Nota de prueba

Al crear un libro con el título **El nombre del viento**, Libris asigna automáticamente `/covers/viento.png`. Los títulos desconocidos utilizan una portada genérica para evitar mostrar una carátula incorrecta.
