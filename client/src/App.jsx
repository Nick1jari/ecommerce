import Home from "./pages/Home";
import React from "react";
import ProductList from "./pages/Productlist";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App=()=>{
  const user=true;
  return (
      <Router >
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/products/:category" element={<ProductList/>}></Route>
          <Route exact path="/product/:id" element={<Product/>}></Route>
          <Route exact path="/cart" element={<Cart/>}></Route>
          <Route exact path="/login" element= {user ? <Navigate to ="/"/>: <Login/>}></Route>
          <Route exact path="/register" element={user ? <Navigate to ="/"/>: <Register/>}></Route>
        </Routes>
      </Router>
    );
};

export default App;
