import React, { useState, useEffect} from "react";
import CartSass from "./Cart.module.sass";
import useStore from "../../Zustand/Store";
import { db } from "../../firebase/config.js";
import { collection, getDocs } from "firebase/firestore";


const Cart = () => {
  const cart = useStore((state) => state.cart);
  const resetCart = useStore((state) => state.resetCart);
  const deleteProduct = useStore((state) => state.deleteProduct);
  const qtyAddOne = useStore((state) => state.qtyAddOne);
  const qtySubtractOne = useStore((state) => state.qtySubtractOne);
  const sum = useStore(state=>state.sum);
  const collectionRef = collection(db, "products");
  
  console.log('cart  em cart ', cart);


  return (
    <div className={CartSass.container}>
      {sum== 0?<div>Your cart is empty!</div> :<div>Your cart:</div>}
      <div className={CartSass.list}>
        {cart.map((item) => (
          <div className={CartSass.listItem} key={item.id}>
            <img className={CartSass.listImg} src={item.img}></img>
            <div className={CartSass.listContent}>
              <div className={CartSass.listTittle}>
                <h2>{item.title}</h2>
              </div>
              <div>
                <div className={CartSass.buttons}>
                  <div className={CartSass.listQtyGroup}>
                    <button onClick={() => qtySubtractOne(item.id)}>
                      -
                    </button>
                    <div className={CartSass.listQty}>{item.quantity} un. </div>
                    <button onClick={() => qtyAddOne(item.id)}>
                      +
                    </button>{" "}
                  </div>
                  <button
                    className={CartSass.remove}
                    onClick={() => deleteProduct(item.id)}
                  >
                    remove item
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sum != 0 ? <button onClick={resetCart}>Reset</button> : ''}
    </div>
  );
};

export default Cart;
