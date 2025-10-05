import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const value = {
    orders,
    addToOrder: (product, size) => {
      setOrders((prev) => [...prev, { ...product, size, id: Date.now() }]);
    },
    removeFromOrder: (orderId) => {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    },
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
