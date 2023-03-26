import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Cart, CategoryProducts, Home, ProductDetails, Search } from './pages'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './App.scss'
import Sidebar from './components/sidebar/Sidebar'

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <Sidebar />
        <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/category/:category",
        element: <CategoryProducts />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/search/:searchTerm",
        element: <Search />
      }
    ],
  },
])

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
