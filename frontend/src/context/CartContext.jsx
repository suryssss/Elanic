import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

const buildLineId = (item) => {
  if (item?.lineId) return item.lineId;

  const parts = [
    item?.productId ?? item?.name ?? "unknown",
    item?.size ?? "default",
    item?.color ?? "default",
  ];

  return parts.join("::");
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((item) => {
    if (!item) return;

    const quantityToAdd = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
    const lineId = buildLineId(item);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((cartItem) => cartItem.lineId === lineId);

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingIndex];

        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantityToAdd,
        };

        return updatedItems;
      }

      return [
        ...prevItems,
        {
          ...item,
          lineId,
          quantity: quantityToAdd,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((lineId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.lineId === lineId
          ? {
              ...item,
              quantity: Math.max(1, newQuantity),
            }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((lineId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      subtotal,
      totalItems,
    }),
    [cartItems, addToCart, updateQuantity, removeItem, clearCart, subtotal, totalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};




