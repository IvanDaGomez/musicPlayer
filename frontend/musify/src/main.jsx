import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/main/App.jsx'
import Playlist from './routes/playlists/Playlist.jsx'
import CreatePlaylist from './routes/playlists/CreatePlaylist.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/errorPage.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>
  },
  {
    path:"/playlists/:id",
    element: <Playlist />
  },
  {
    path: "playlists/create",
    element: <CreatePlaylist />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
