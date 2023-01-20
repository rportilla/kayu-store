import { useState } from 'react';
import { db } from "../db/firebase-config.js";
import {collection, addDoc, getDocs} from "firebase/firestore";

const Form = ({ setProducts }) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputPrice, setInputPrice] = useState(0);
  const [inputImage, setInputImage] = useState("");
  const [inputCategory, setInputCategory] = useState("");

  const createProduct = async (e) => {
      e.preventDefault();
      const product = {
        title: inputTitle,
        price: inputPrice,
        description: inputDescription,
        image: inputImage,
        category_id: inputCategory
      }
      const productsCollectionRef = collection(db, "products");
      addDoc(productsCollectionRef, product).then( ({id}) => {
        alert("Documento agregado con ID: " + id);
        console.log("Documento agregado con ID: ", id);
      });
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
      setInputTitle("");
      setInputDescription("");
      setInputPrice(0);
      setInputImage("");
      setInputCategory("");
  };

  // const deleteProduct = async (id) => {
  //   const docRef = doc(db, "products", id);
  //   await deleteDoc(docRef);
  //   const data = await getDocs(productsCollectionRef);
  //   setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
  // }
  //
  // const updateProduct = async (id) => {
  //   const docRef = doc(db, "products", id);
  //   await updateDoc(docRef, {price: 99900});
  //   const data = await getDocs(productsCollectionRef);
  //   setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
  // }
  
  return (
    <form onSubmit={createProduct}>
      <input type="text" placeholder="Titulo" onChange={(e) => setInputTitle(e.target.value)} value={inputTitle}/>
      <br />
      <input type="text" placeholder="Descripción" onChange={(e) => setInputDescription(e.target.value)} value={inputDescription}/>
      <br />
      <input type="number" placeholder="Price" onChange={(e) => setInputPrice(e.target.value)} value={inputPrice}/>
      <br />
      <input type="text" placeholder="Imagen" onChange={(e) => setInputImage(e.target.value)} value={inputImage}/>
      <br />
      <input type="text" placeholder="Categoría" onChange={(e) => setInputCategory(e.target.value)} value={inputCategory}/>
      <br />
      <button type="submit">Crear producto</button>
    </form>
  )
}

export default Form
