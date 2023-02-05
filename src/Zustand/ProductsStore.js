import React from "react";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const Store = (set) => ({
  products: [],

  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },
});
