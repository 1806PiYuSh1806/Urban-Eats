import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const CART_KEY = "cart";
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const CartProvider = ({ children }) => {
  const initCart = getCartFromLocalStorage();

  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  useEffect(() => {
    const totalPrice = sum(cartItems.map((item) => item.price));
    const totalCount = sum(cartItems.map((item) => item.quantity));

    setTotalCount(totalCount);
    setTotalPrice(totalPrice);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      })
    );
  }, [cartItems]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        localStorage.removeItem(CART_KEY); // Clear the corrupted data
        return EMPTY_CART;
      }
    }
    return EMPTY_CART;
  }

  const sum = (items) => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
  };

  const removeFromCart = (foodId) => {
    const filteredCartItems = cartItems.filter(
      (item) => item.food.id !== foodId
    );
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const { food } = cartItem;
    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };

    setCartItems(
      cartItems.map((item) =>
        item.food.id === food.id ? changedCartItem : item
      )
    );
  };

  const addToCart = (food) => {
    const cartItem = cartItems.find((item) => item.food.id === food.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);