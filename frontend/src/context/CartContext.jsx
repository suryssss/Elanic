import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchCart, 
  addProductToCart, 
  updateProductInCart, 
  removeProductFromCart,
  mergeCart 
} from "../redux/slices/cartSlice";

const CartContext = createContext(null);

const buildLineId = (item) => {
  if (item?.lineId) return item.lineId;

  const parts = [
    item?.productId?.toString() ?? item?.name ?? "unknown",
    item?.size ?? "default",
    item?.color ?? "default",
  ];

  return parts.join("::");
};

// Transform backend cart format to CartContext format
const transformCartItems = (backendCart) => {
  if (!backendCart || !backendCart.products || !Array.isArray(backendCart.products)) {
    return [];
  }
  
  return backendCart.products.map((product) => ({
    ...product,
    lineId: buildLineId(product),
    productId: product.productId?.toString() || product.productId,
    price: Number(product.price) || 0, // Ensure price is a number
  }));
};

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart: backendCart } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from backend on mount and when userId/guestId changes
  useEffect(() => {
    const loadCart = async () => {
      if (!user && !guestId) return;
      
      setIsLoading(true);
      try {
        await dispatch(fetchCart({ userId: user?._id, guestId })).unwrap();
      } catch (error) {
        // Cart might not exist yet, which is fine
        console.log("Cart not found or error loading cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [dispatch, user?._id, guestId]);

  // Sync CartContext state with backend cart
  useEffect(() => {
    if (backendCart) {
      const transformedItems = transformCartItems(backendCart);
      setCartItems(transformedItems);
    } else {
      setCartItems([]);
    }
  }, [backendCart]);

  // Merge cart when user logs in (only once per login)
  useEffect(() => {
    const mergeCartsOnLogin = async () => {
      if (user?._id && guestId) {
        try {
          const token = localStorage.getItem("userToken");
          if (token) {
            await dispatch(mergeCart({ guestId, userId: user._id })).unwrap();
            // Reload cart after merge using userId
            await dispatch(fetchCart({ userId: user._id, guestId: undefined })).unwrap();
          }
        } catch (error) {
          console.error("Error merging carts:", error);
        }
      }
    };

    // Only merge if we have both user and guestId (user just logged in)
    if (user?._id && guestId) {
      mergeCartsOnLogin();
    }
  }, [dispatch, user?._id]);

  const addToCart = useCallback(async (item) => {
    if (!item) return;

    const quantityToAdd = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
    const productId = item.productId || item._id;
    
    if (!productId) {
      console.error("Product ID is required to add to cart");
      return;
    }

    try {
      await dispatch(
        addProductToCart({
          productId,
          quantity: quantityToAdd,
          size: item.size || "default",
          color: item.color || "default",
          guestId,
          userId: user?._id,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }, [dispatch, guestId, user?._id]);

  const updateQuantity = useCallback(async (lineId, newQuantity) => {
    const item = cartItems.find((i) => i.lineId === lineId);
    if (!item) return;

    const productId = item.productId;
    const finalQuantity = Math.max(1, newQuantity);

    try {
      await dispatch(
        updateProductInCart({
          productId,
          quantity: finalQuantity,
          size: item.size || "default",
          color: item.color || "default",
          guestId,
          userId: user?._id,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    }
  }, [dispatch, cartItems, guestId, user?._id]);

  const removeItem = useCallback(async (lineId) => {
    const item = cartItems.find((i) => i.lineId === lineId);
    if (!item) return;

    const productId = item.productId;

    try {
      await dispatch(
        removeProductFromCart({
          productId,
          size: item.size || "default",
          color: item.color || "default",
          guestId,
          userId: user?._id,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  }, [dispatch, cartItems, guestId, user?._id]);

  const clearCart = useCallback(() => {
    // Clear cart by removing all items one by one
    cartItems.forEach((item) => {
      const productId = item.productId;
      dispatch(
        removeProductFromCart({
          productId,
          size: item.size || "default",
          color: item.color || "default",
          guestId,
          userId: user?._id,
        })
      ).catch((error) => {
        console.error("Error clearing cart item:", error);
      });
    });
  }, [dispatch, cartItems, guestId, user?._id]);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0),
    [cartItems],
  );

  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + (item.quantity || 0), 0),
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
      isLoading,
    }),
    [cartItems, addToCart, updateQuantity, removeItem, clearCart, subtotal, totalItems, isLoading],
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





