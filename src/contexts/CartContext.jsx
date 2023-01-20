import { useState, createContext } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  //Calculamos el total del carro
  const getTotal = () => {
    return cartItems.reduce((sumItems, item) => sumItems + item.product.price * item.quantity, 0);
  };

  //Contamos los items agregados al carro
  const getItemsCount = () => {
    return cartItems.reduce((sumItems, item) => sumItems + item.quantity, 0);
  };

  //Vaciamos el carro
  const clearCart = () => {
    setCartItems([]);
  }

  //Agregamos un producto al carro
  const addToCart = (product, quantity) => {
    const itemNew = {
      product: product,
      quantity: quantity
    };
    setCartItems([...cartItems, itemNew]);
  }

  //Validamos si existe el producto en el carro
  const isInCart = (id) => {
    return !!cartItems.find((item) => item.product.id === id);
  }

  //Validamos si el carro esta vacío
  const isEmptyCart = () =>{
    return cartItems.length === 0;
  }

  //Eliminamos un producto del carro
  const removeCartItem = (id) => {
    setCartItems([...cartItems].filter((item) => item.product.id !== id));
  }

  return (
    <CartContext.Provider value={{  clearCart,
                                    addToCart,
                                    cartItems,
                                    isInCart,
                                    removeCartItem,
                                    getTotal,
                                    getItemsCount,
                                    isEmptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
