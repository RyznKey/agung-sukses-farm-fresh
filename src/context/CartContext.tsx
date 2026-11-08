"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: number;
  nameEn: string;
  nameId: string;
  category: string;
  image: string;
  price: number | string;
  unit: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  hasUnpricedItems: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  addedNotice: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "agung_farm_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Muat keranjang dari localStorage saat inisialisasi client-side
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Gagal membaca cart dari localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Simpan perubahan keranjang ke localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Gagal menyimpan cart ke localStorage:", e);
    }
  }, [cart, isHydrated]);

  const addToCart = (product: Product, quantity: number = 1) => {
    const qtyToAdd = Math.max(1, quantity);
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prevCart, { product, quantity: qtyToAdd }];
    });

    setAddedNotice(product.nameId || product.nameEn);
    setTimeout(() => {
      setAddedNotice((curr) => (curr === (product.nameId || product.nameEn) ? null : curr));
    }, 2500);
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = cart.reduce((sum, item) => {
    const priceVal = typeof item.product.price === "number" ? item.product.price : 0;
    return sum + priceVal * item.quantity;
  }, 0);

  const hasUnpricedItems = cart.some((item) => typeof item.product.price !== "number");

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalAmount,
        hasUnpricedItems,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        addedNotice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

