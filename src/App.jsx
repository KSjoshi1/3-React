import NavBar from './components/NavBar'
import Home from './components/Home'
import Product from './components/Product'
import ProductDetails from './components/ProductDetails'
import PageNotFound from './components/PageNotFound'
import {Route, Routes, Navigate} from "react-router-dom"
import './App.css'

function App() {

  return (
    <>
     <NavBar></NavBar>
     <Home></Home>
     <Routes>
      <Route to="/" element={<Home></Home>}></Route>
      <Route to="/Product" element={<Product></Product>}></Route>
      <Route to="/product/:id" element={<ProductDetails></ProductDetails>}></Route>
      <Route to="/home" element={<Navigate to="/"></Navigate>}></Route>
      <Route to="*" element={<PageNotFound></PageNotFound>}></Route>
     </Routes>
    </>
  )
}

export default App
