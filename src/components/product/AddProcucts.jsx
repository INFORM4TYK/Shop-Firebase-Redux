import { useRef, useState } from "react";
import { Button, FormAddContainer, AlertSection } from "./ProductStyles";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { auth, fs } from "../../config/firebase";
import { storage } from "../../config/firebase";
import { useSelector } from "react-redux";
const AddProcucts = () => {
  const user = useSelector((state) => state.auth.fullName);

  const titleRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [error, setError] = useState("");const types = ["image/png", "image/jpeg", "image/jpg", "image/PNG"];
  
  const handleProductImg = (e) => {
    e.preventDefault();
    let selectFile = e.target.files[0];
    if (selectFile) {
      if (selectFile && types.includes(selectFile.type)) {
        setImage(selectFile);
        setUploadError("");
      } else {
        setImage(null);
        setUploadError("Wrong file extension ");
      }
    } else {
      return null;
    }
  };
 
  const handleAddProducts = async (e) => {
    e.preventDefault();
    if(auth.currentUser.emailVerified){

      const title = titleRef.current.value;
      const description = descRef.current.value;
      const price = priceRef.current.value;
      const author = user;
      try {
        const storageRef = ref(storage, `product-images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on("state_changed", (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        });
        await new Promise((resolve, reject) => {
          uploadTask.on("state_changed", {
            error: (error) => reject(error),
            complete: resolve,
          });
        });
  
        const downloadURL = await getDownloadURL(storageRef);
  
        await addDoc(collection(fs, "Products"), {
          author,
          title,
          description,
          price: Number(price),
          url: downloadURL,
          uid: auth.currentUser.uid
        });
        setSuccessMsg("Product added successfully");
        titleRef.current.value = "";
        descRef.current.value = "";
        priceRef.current.value = "";
        fileInputRef.current.value = "";
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
      } catch (err) {
        setError(err);
      }
    }else{
      setSuccessMsg("Your account must be verified to add the product")
    }
  };
  return (
    <>
      <FormAddContainer onSubmit={handleAddProducts}>
        <h1>Add Product</h1>
        <label>
          Product Title
          <input type="text" ref={titleRef} required />
        </label>
        <label>
          Product Description
          <input type="text" ref={descRef} required />
        </label>
        <label>
          Product Price
          <input type="number" ref={priceRef} required  step="0.01" />
        </label>
        <label>
          Upload Product Image
          <input type="file" id="file" ref={fileInputRef} onChange={handleProductImg} required />
        </label>
        <AlertSection>
          {successMsg ? <p>{successMsg} </p> : null}
          {uploadError ? <p>{uploadError} </p> : null}
          {error ? <p>{error} </p> : null}
        </AlertSection>
        <Button disabled={image === null} type="submit">Add</Button>
      </FormAddContainer>
    </>
  );
};

export default AddProcucts;
