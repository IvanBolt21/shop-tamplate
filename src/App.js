import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Link } from "react-router-dom";
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import Cart from './Pages/Cart';
import Categories from './Pages/Categories';
import CategoryProducts from './Pages/CategoryProducts';
import Product from './Pages/Product';
import Faves from './Pages/Faves';
import Search from './Pages/Search';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/favorites" element={<Faves/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/search/:searchInput" element={<Search/>}></Route>
          <Route path="/categories" element={<Categories/>}></Route>
          <Route path="/categories/:category" element={<CategoryProducts/>}></Route>
          <Route path="/product/:id" element={<Product/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
