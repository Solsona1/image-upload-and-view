import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './pages/layout/Layout'
import { UploaderPage } from './pages/uploader/UploaderPage'
import { GalleryPage } from './pages/gallery/GalleryPage'
import { ImagesLoaderFunction } from './pages/gallery/GalleryPage'
import { AuthPage } from './pages/auth/Auth'
import { UserProvider } from './context/UserContext'

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Layout/>, children: [
      { path: "/gallery", element: <GalleryPage/>, loader: ImagesLoaderFunction },
      { path: "/uploader", element: <UploaderPage/> },
      { index: true, element: <AuthPage/> },
    ]}
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  )
}

export default App