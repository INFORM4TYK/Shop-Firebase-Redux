import { useDebugValue, useEffect, useState } from "react";
import { auth, fs } from "../../config/firebase";
import { getDocs, collection, setDoc, doc, getDoc } from "firebase/firestore";
import { ProductContainer, Button, ProductCard } from "./ProductStyles";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { v4 as uuidv4 } from "uuid";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/CartSlice";
const Product = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(fs, "Products"));
    const productsData = [];
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      productsData.push(product);
    });
    setProducts(productsData);
  };
  useEffect(() => {
    getProducts();
  }, []);

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
    dispatch(addToCart(1));
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
                .then(() => {
                  console.log("Successfully updated cart");
                })
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
                url: product.url
              };
              setDoc(cartRef, { items: [...cartData.items, newItem] })
                .then(() => {
                  console.log("Successfully added to cart");
          
                })
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
              url: product.url
            };
            setDoc(cartRef, { items: [newItem] })
              .then(() => {

                console.log("Successfully added to cart");
              })
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
    console.log("handleaddtocart");
    addToCart2(product, uid);
  };
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "#FFFFFF",
          marginTop: "1.5rem",
        }}
      >
        Products
      </h1>
      <ProductContainer>
        {products.map((product) => {
          const { title, url, price, description, author } = product;
          return (
            <ProductCard key={title}>
              <h3>{title}</h3>
              <div>
                {!imageLoaded && <Skeleton height={150} width={150} />}
                <img src={url} alt="product" onLoad={handleImageLoad} />
                <p>{description}</p>
                <p>{price} USD</p>
                <Button onClick={() => handleAddToCart(product, uid)}>
                  Add To Cart
                </Button>
                <h4>Seller: {author ? author : "Anonymous"}</h4>
              </div>
            </ProductCard>
          );
        })}
      </ProductContainer>
    </>
  );
};

export default Product;
