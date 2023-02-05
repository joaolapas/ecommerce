import React, { useState, useEffect } from "react";
import AdminSass from "./Admin.module.sass";
import app, { storageX, db } from "../../firebase/config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

const Admin = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const collectionRef = collection(db, "products");
  const docRef = doc(db, "products", Date.now().toString());
  //const docSnap = getDoc(docRef);
  const [productData, setProductData] = useState([]);

  async function fetchData() {
    //const db = firebase.firestore();
    const docRef = db.collection('collectionName').doc('docId');
    
    try {
      const doc = await docRef.get();
      
      if (doc.exists) {
        console.log(doc.data());
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const productsList = fetchData();
  

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  

  const handleUpload = () => {
    const storageRef = ref(storageX, `images/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        getDownloadURL(ref(storageX, `images/${image.name}`))
          .then((url) => {
            setUrl(url);
            addDoc(collectionRef, {
              title: title,
              price: price,
              description: description,
              longDescription: longDescription,
              image: url,
            });
          });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload();
  };

  return (
    <div className={AdminSass.products}>
      <div>Insert products</div>
      <form onSubmit={handleSubmit}>
        Title:{" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        Price:{" "}
        <input
          type="number"
          name="price"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        Load an image:{" "}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {progress > 0 ? <progress value={progress} max="100" /> : ""}
        Description :{" "}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        Long Description :{" "}
        <textarea
          type="textarea"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
    {productData.map((product) => (
      <div key={product.id}>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <img src={product.image} alt={product.title} />
        
      </div>
    ))}
  </div>
     {productsList.map((product) => (<div>{product.name}</div>))} 
    </div>
  );
};

export default Admin;
