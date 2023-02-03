import React from "react";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const Store = (set) => ({
  cart: [],
  sum: 0,

  addProduct: (product, quantity) => {
    if (product != "") {
      set((state) => {
        let exists = false;
        state.sum = 1;
        let updatedCart = state.cart.map((item) => {
          state.sum += item.quantity;
          if (item.product === product) {
            exists = true;
            return {
              product: item.product,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
        if (!exists) {
          updatedCart = [...updatedCart, { product, quantity }];
        }
        return { cart: updatedCart };
      });
    }
  },

  resetCart: () => {
    set(() => ({
      cart: [],
      sum: 0,
    }));
  },

  deleteProduct: (product) => {
    set((state) => {
      let updatedCart = state.cart.filter((item) => item.product !== product);
      let deletedProduct = state.cart.find((item) => item.product === product);
      let updatedSum = state.sum;
      if (deletedProduct) {
        updatedSum -= deletedProduct.quantity;
      }
      return {
        cart: updatedCart,
        sum: updatedSum,
      };
    });
  },

  qtyAddOne: (product) => {
    set((state) => {
      let updatedCart = state.cart.map((item) => {
        if (item.product === product) {
          state.sum += 1;
          return {
            product: item.product,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return { cart: updatedCart };
    });
  },

  qtySubtractOne: (product) => {
    set((state) => {
      let updatedCart = state.cart.map((item) => {
        if (item.product === product) {
          let updatedQuantity = item.quantity - 1;
          if (updatedQuantity === 0) {
            return;
          }
          return {
            product: item.product,
            quantity: updatedQuantity,
          };
        }
        return item;
      });
      updatedCart = updatedCart.filter((item) => item);
      state.sum -= 1;
      return { cart: updatedCart, sum: state.sum };
    });
  }
});
const useStore = create(devtools(persist(Store, { name: "counter" })));
export default useStore;
