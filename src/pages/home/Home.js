import React, {useEffect} from "react";
import { Search } from "../../components";
import HomeSass from "./Home.module.sass";
import useStore from "../../Zustand/Store";
import img from '../../assets/product1.png'

const Card = (props) => {
  const addToCart = useStore((state) => state.addToCart);
  const resetCart = useStore((state) => state.resetCart);
  const cart = useStore((state) => state.cart);
  const [product, setProduct] = React.useState("");

  const handleClear = () => resetCart();
  const handleAdd = (p, q) => addToCart(p, q);
  return (
    <div className={HomeSass.card}>
      <img className={HomeSass.productImage} src={img}/>
      <h3 className={HomeSass.title}>Product {props.number}</h3>
      <h4 className={HomeSass.price}>€19.99</h4>
      <button className={HomeSass.addToCart} onClick={()=>handleAdd(props.product, 1)}>ADD TO CART</button>
    </div>
  );
};
const Home = () => {
  const addToCart = useStore((state) => state.addToCart);
  const resetCart = useStore((state) => state.resetCart);
  const showCount = useStore((state) => state.showCount);
  const cart = useStore((state) => state.cart);
  const [sum, setSum] = React.useState(0);
  
  useEffect(() => {
    setSum(0)
    cart.map((item) => {
        setSum((prev)=>prev+item.quantity)
      });
  }, [cart])
    
  


  const handleClear = () => (
    resetCart(),
    setSum(0)
  );
  //const handleAdd = (product, quantity) => addProduct(product, quantity);
  //---------------------------

  return (
    <div className={HomeSass.container}>
      
      <Card number={1} product='product 1'/>
      <Card number={2} product='product 2'/>
      <Card number={3} product='product 3'/>
      <Card number={4} product='product 4'/>
      <Card number={5} product='product 5'/>
      <button onClick={handleClear}>Clear</button>

      <div>{sum}</div>
      <div>{showCount}</div>
    </div>
  );
};

export default Home;
