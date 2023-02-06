import React, {useEffect, useState} from "react";
import { Search } from "../../components";
import HomeSass from "./Home.module.sass";
import useStore from "../../Zustand/Store";
import img from '../../assets/product1.png';
import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import app, { storageX, db } from "../../firebase/config.js";

const Card = (props) => {
  const addToCart = useStore((state) => state.addToCart);
  const resetCart = useStore((state) => state.resetCart);
  const cart = useStore((state) => state.cart);
  const [product, setProduct] = React.useState("");
  const handleAdd = (props) => addToCart(props);
  

  return (
    <div className={HomeSass.card}>
      <img className={HomeSass.productImage} src={props.img}/>
      <h3 className={HomeSass.title}>{props.title}</h3>
      <h4 className={HomeSass.price}>€{props.price}</h4>
      <button className={HomeSass.addToCart} onClick={()=>handleAdd(props)}>ADD TO CART</button>
    </div>
  );
};
const Home = () => {
  const addToCart = useStore((state) => state.addToCart);
  const resetCart = useStore((state) => state.resetCart);
  const showCount = useStore((state) => state.showCount);
  const cart = useStore((state) => state.cart);
  const [sum, setSum] = React.useState(0);
  const collectionRef = collection(db, "products");
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collectionRef);
      setDocs(querySnapshot.docs.map((doc) => ({ ...doc.data()})));
    };
    fetchData();
  }, []);
  
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
      
    {docs.map((doc) => (
      <Card 
        key={doc.id}
        title={doc.title}
        price={doc.price}
        img={doc.image}
        description={doc.description}
        id={doc.id}
      />
    ))}
     
    </div>
  );
};

export default Home;
