import './App.css';
import Navbar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from "./components/ItemDetailContainer";
import Header from "./components/Header";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import data from "./data.json";

function App() {
  const { products } = data;
  return (
    <div>
      <Header/>
      <main>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ItemListContainer list={products} />} />
          <Route path="/category/:id" element={<ItemListContainer list={products} />} />
          <Route path="/item/:id" element={<ItemDetailContainer data={products} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
