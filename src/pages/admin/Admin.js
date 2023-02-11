import React, { useState, useEffect } from "react";
import AdminSass from "./Admin.module.sass";
import app, { storageX, db } from "../../firebase/config.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "../../components";

const Admin = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const collectionRef = collection(db, "products");
  const [docs, setDocs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collectionRef);
      setDocs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [() => handleUpload()]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleRemove = async (id, image) => {
    await deleteDoc(doc(db, "products", id));

    const imageRef = ref(storageX, image);
    deleteObject(imageRef)
      .then(() => {
        toast("File deleted successfully");
      })
      .catch((error) => {
        toast("Error deleting file", error);
      });
  };

  const handleUpload = () => {
    const storageRef = ref(storageX, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error("Error uploading file", error);
      },
      () => {
        getDownloadURL(ref(storageX, `images/${image.name}`)).then((url) => {
          setUrl(url);
          addDoc(collectionRef, {
            title: title,
            price: price,
            description: description,
            longDescription: longDescription,
            image: url,
            id: new Date().getTime(),
          });
        });
      }
    );
  };

  const openModal = (index) => {
    setModalIsOpen(true);
    setCurrentDocIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload();
  };
  

  return (
    <div className={AdminSass.products}>
      <ToastContainer />
      <h2>Insert products</h2>
      <form onSubmit={handleSubmit} className={AdminSass.insertProductsForm}>
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
        <button type="submit">ADD PRODUCT</button>
      </form>
      <div>
        {docs.map((doc, index) => (
          <div className={AdminSass.product} key={doc.id}>
            {modalIsOpen && (
              <Modal>
                <h2>{doc[currentDocIndex].title}</h2>
                <img src={doc[currentDocIndex].image} />
                <button onClick={() => setModalIsOpen(false)}>fechar</button>
              </Modal>
            )}
            <img src={doc.image} alt={doc.title} />
            <div className={AdminSass.details}>
              <p>Title: {doc.title}</p>
              <p>Price: {doc.price}</p>
              <p>Description: {doc.description}</p>
            </div>
            <div className={AdminSass.buttons}>
              <button onClick={() => openModal(index)}>Edit</button>
              <button onClick={() => handleRemove(doc.id, doc.image)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
