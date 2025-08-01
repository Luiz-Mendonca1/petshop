// app.tsx
import { RouterProvider } from 'react-router'
import { router } from './router' // assumindo que seu arquivo de rotas está em ./router

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App