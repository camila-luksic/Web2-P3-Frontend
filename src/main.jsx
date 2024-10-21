import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import FormTipo from './FormTipo.jsx'
import FormHabilidad from './FormHabilidad.jsx'
import ListaTipos from './ListTipos.jsx'
import ListaHabilidades from './ListHabilidades.jsx'
import FormPokemon from './FormPokemon.jsx'
import FotoPokemon from './FotoPokemon.jsx'
import ListaPokemones from './ListaPokemones.jsx'
import DetallePokemon from './detallePokemon.jsx'
import ResultadosBusqueda from './resultadosBusqueda.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buscador from './Buscador.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tipo",
    element: <ListaTipos />,
  },
  {
    path: "/Createtipo",
    element: <FormTipo />,
  },

  {
    path: "/tipo/:id",
    element: <FormTipo />,
  },
  {
    path: "/habilidad",
    element: <ListaHabilidades />,
  },
  {
    path: "/createhabilidad",
    element: <FormHabilidad />,
  },

  {
    path: "/habilidad/:id",
    element: <FormHabilidad />,
  },

  {
    path: "/createPokemon",
    element: <FormPokemon />,
  },
  {
    path: "/pokemon",
    element: <ListaPokemones />,
  },
  {
    path: "/pokemon/:id",
    element: <FormPokemon />,
  },

  {
    path: "/FotoPokemon/:id",
    element: <FotoPokemon />,
  },
  {
    path: "/Pokemones/:id",
    element: <DetallePokemon />,
  },
  {
    path: "/buscar",
    element: <Buscador />,
  },

  {
    path: "/resultados-busqueda",
    element: <ResultadosBusqueda />
  }

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)