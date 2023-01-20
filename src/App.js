import './App.css';
import Navbar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from "./components/ItemDetailContainer";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react'
import { db } from "./db/firebase-config.js";
import {collection, getDocs, doc, getDoc} from "firebase/firestore";
import Form from "./components/Form";
import Checkout from "./components/Checkout";

function App() {
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  //Obtenemos los productos desde firebase
  const getProducts = async () => {
    const data = await getDocs(productsCollectionRef);
    console.log(data);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
  };

  useEffect(() =>  {
    getProducts();
  }, []);

  return (
    <div>
      <Header/>
      <main>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ItemListContainer list={products} />} />
          <Route path="/category/:key" element={<ItemListContainer list={products} />} />
          <Route path="/item/:id" element={<ItemDetailContainer data={products} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/create" element={<Form setProducts={setProducts}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
