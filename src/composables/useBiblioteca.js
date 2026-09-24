import { reactive } from 'vue'

const BASE_URL = import.meta.env.BASE_URL

const state = reactive({
  libros: [
    {
      id: 1,
      titulo: '1984',
      autor: 'George Orwell',
      genero: 'Ciencia ficción',
      anio: 1949,
      descripcion:
        'Una novela distópica que describe un futuro totalitario donde el gobierno controla todos los aspectos de la vida, incluyendo la información, el pensamiento y la historia.',
      portada: `${BASE_URL}covers/1984.png`,
    },
    {
      id: 2,
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      genero: 'Infantil',
      anio: 1943,
      descripcion:
        'Un relato breve y poético sobre la amistad, la responsabilidad y la forma en que miramos el mundo.',
      portada: `${BASE_URL}covers/principito.png`,
    },
    {
      id: 3,
      titulo: 'Hábitos Atómicos',
      autor: 'James Clear',
      genero: 'Desarrollo personal',
      anio: 2018,
      descripcion:
        'Una guía práctica para crear buenos hábitos, eliminar los malos y mejorar de forma gradual.',
      portada: `${BASE_URL}covers/habitos.png`,
    },
    {
      id: 4,
      titulo: 'Clean Code',
      autor: 'Robert C. Martin',
      genero: 'Tecnología',
      anio: 2008,
      descripcion:
        'Principios y prácticas para escribir código claro, mantenible y profesional.',
      portada: `${BASE_URL}covers/clean-code.png`,
    },
  ],
})

function normalizarTitulo(titulo = '') {
  return String(titulo)
    .trim()
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

const portadaPorTitulo = {
  '1984': `${BASE_URL}covers/1984.png`,
  'el principito': `${BASE_URL}covers/principito.png`,
  'habitos atomicos': `${BASE_URL}covers/habitos.png`,
  'clean code': `${BASE_URL}covers/clean-code.png`,
  'el nombre del viento': `${BASE_URL}covers/viento.png`,
}

function portadaPara(libro, portadaActual = '') {
  const portadaConocida = portadaPorTitulo[normalizarTitulo(libro?.titulo)]

  if (portadaConocida) return portadaConocida
  if (portadaActual) return portadaActual

  return `${BASE_URL}icons/book-preview.svg`
}

export function useBiblioteca() {
  const agregarLibro = (libro) => {
    const siguienteId = state.libros.length
      ? Math.max(...state.libros.map((item) => item.id)) + 1
      : 1

    state.libros.push({
      ...libro,
      id: siguienteId,
      anio: Number(libro.anio),
      portada: portadaPara(libro),
    })
  }

  const actualizarLibro = (id, cambios) => {
    const libro = state.libros.find((item) => item.id === Number(id))

    if (!libro) return

    Object.assign(libro, {
      ...cambios,
      anio: Number(cambios.anio),
      portada: portadaPara(cambios, libro.portada),
    })
  }

  const eliminarLibro = (id) => {
    const indice = state.libros.findIndex(
      (libro) => libro.id === Number(id)
    )

    if (indice >= 0) {
      state.libros.splice(indice, 1)
    }
  }

  const obtenerLibro = (id) => {
    return state.libros.find((libro) => libro.id === Number(id))
  }

  return {
    state,
    agregarLibro,
    actualizarLibro,
    eliminarLibro,
    obtenerLibro,
  }
}
