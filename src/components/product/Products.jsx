import { useEffect, useState } from "react";
import { auth, fs } from "../../config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { Button } from "./ProductStyles";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/CartSlice";
import IndividualProduct from "./IndividualProduct";
const Products = ({
  products,
  showMyProducts,
  error,
  setImageLoaded,
  productStatus,
  setProductStatus,
  user,
  imageLoaded
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  const GetUserUid = () => {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
        }
      });
      return () => {
        unsubscribe();
      };
    }, []);

    return uid;
  };
  const addToCart2 = (product, uid) => {
    if (uid !== null) {
      const cartRef = doc(fs, `cart/${uid}`);
      getDoc(cartRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const cartData = docSnapshot.data();
            const existingItemIndex = cartData.items.findIndex(
              (item) => item.name === product.title
            );
            if (existingItemIndex > -1) {
              const updatedCartItems = [...cartData.items];
              updatedCartItems[existingItemIndex].qty += 1;
              updatedCartItems[existingItemIndex].TotalProductPrice =
                updatedCartItems[existingItemIndex].qty *
                updatedCartItems[existingItemIndex].price;
              setDoc(cartRef, { items: updatedCartItems })
                .then(() => {})
                .catch((error) => {
                  console.log("Error updating cart:", error);
                });
            } else {
              const newItem = {
                itemID: uuidv4(),
                name: product.title,
                qty: 1,
                price: product.price,
                TotalProductPrice: 1 * product.price,
                url: product.url,
              };
              setDoc(cartRef, { items: [...cartData.items, newItem] })
                .then(() => {})
                .catch((error) => {
                  console.log("Error adding to cart:", error);
                });
            }
          } else {
            const newItem = {
              itemID: uuidv4(),
              name: product.title,
              qty: 1,
              price: product.price,
              TotalProductPrice: product.price,
              url: product.url,
            };
            setDoc(cartRef, { items: [newItem] })
              .then(() => {})
              .catch((error) => {
                console.log("Error adding to cart:", error);
              });
          }
        })
        .catch((error) => {
          console.log("Error retrieving cart:", error);
        });
    } else {
      navigate("/signin");
    }
  };

  const uid = GetUserUid();

  const handleAddToCart = (product, uid) => {
    dispatch(addProduct(1));
    addToCart2(product, uid);
    console.log("add to cart")
  };
  if (products.length > 0) {
    setProductStatus(false);
  }
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "#FFFFFF",
          marginTop: "1.5rem",
        }}
      >
        {!productStatus ? showMyProducts ? "My Products" : "All Products" : null}
        {productStatus ? (
          <>
            <h5 style={{ marginTop: "1rem" }}>You don't have any products</h5>
            <Link to="/add-products">
              <Button>Click here to add products</Button>
            </Link>
          </>
        ) : null}
      </h1>
      {error ? (
        <h1 style={{ textAlign: "center" }}>No Products Found</h1>
      ) : null}
      <IndividualProduct
        user={user}
        error={error}
        products={products}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        // handleImageLoad={handleImageLoad}
        uid={uid}
        handleAddToCart={handleAddToCart}
      />
    </>
  );
};

export default Products;
