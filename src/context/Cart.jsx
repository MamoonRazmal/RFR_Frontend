import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let stillhavingitems = localStorage.getItem("cart");
    if (stillhavingitems) setCart(JSON.parse(stillhavingitems));
  }, []);
  //axios.defaults.headers.common['Authorization'] = auth?.token

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
