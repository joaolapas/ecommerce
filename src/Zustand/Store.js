import React from "react";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const Store = (set) => ({
  cart: [],
  sum: 0,

  addToCart: (props) => {
    const { title, price, img, id, description, longDescription } = props;
    console.log('props em store', props);
    const quantity = 1;
    if (title !== "") {
      set((state) => {
        let exists = false;
        let updatedCart = state.cart.map((item) => {
          if (item.title === title) {
            exists = true;
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
        if (!exists) {
          updatedCart = [
            ...state.cart,
            { title:title, price, img, id, description, longDescription, quantity },
            
          ];
        }
        return {
          cart: updatedCart,
          sum: state.sum + quantity,
        };
      });
      
    }
  },

  resetCart: () => {
    set(() => ({
      cart: [],
      sum: 0,
    }));
  },

  deleteProduct: (id) => {
    set((state) => {
      let updatedCart = state.cart.filter((item) => item.id !== id);
      let deletedProduct = state.cart.find((item) => item.id === id);
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

  qtyAddOne: (id) => {
    set((state) => {
      let updatedCart = state.cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return {
        cart: updatedCart,
        sum: state.sum + 1,
      };
    });
  },

  qtySubtractOne: (id) => {
    set((state) => {
      let updatedCart = state.cart.map((item) => {
        if (item.id === id) {
          let updatedQuantity = item.quantity - 1;
          if (updatedQuantity === 0) {
            return;
          }
          return {
            ...item,
            quantity: updatedQuantity,
          };
        }
        return item;
      });
      updatedCart = updatedCart.filter((item) => item);
      return {
        cart: updatedCart,
        sum: state.sum - 1,
      };
    });
  },
});

const useStore = create(devtools(persist(Store, { name: "counter" })));
export default useStore;