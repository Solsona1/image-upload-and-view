import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './pages/layout/Layout'
import { UploaderPage } from './pages/uploader/UploaderPage'
import { GalleryPage } from './pages/gallery/GalleryPage'
import { ImagesLoaderFunction } from './pages/gallery/GalleryPage'
import { LoadingPage } from './pages/loading/LoadingPage'

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Layout/>, children: [
      { index: true, element: <GalleryPage/>, loader: ImagesLoaderFunction, hydrateFallbackElement: <LoadingPage/> },
      { path: "/uploader", element: <UploaderPage/> },
    ]}
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App