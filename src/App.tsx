import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './pages/layout/Layout'
import { UploaderPage } from './pages/uploader/UploaderPage'
import { GalleryPage } from './pages/gallery/GalleryPage'
import { ImagesLoaderFunction } from './pages/gallery/GalleryPage'
import { LoadingPage } from './pages/loading/LoadingPage'
import { AuthPage } from './pages/auth/Auth'
import { UserProvider } from './context/UserContext'

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Layout/>, children: [
      { index: true, element: <GalleryPage/>, loader: ImagesLoaderFunction, hydrateFallbackElement: <LoadingPage/> },
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