import { useEffect, useState } from "react";
import { auth, fs } from "../../config/firebase";
import { getDocs, collection, setDoc, doc, getDoc } from "firebase/firestore";
import {
  ProductContainer,
  Button,
  ProductCard,
  SortSection,
  Input,
  InputContainer,
  RangeSection,
} from "./ProductStyles";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { v4 as uuidv4 } from "uuid";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/CartSlice";
import { fetchCart } from "../../store/CartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.fullName);
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showMyProducts, setShowMyProducts] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState(false);
  const [range, setRange] = useState(false);
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(fs, "Products"));
    const productsData = [];
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      productsData.push(product);
    });
    setProducts(productsData);
    setOriginalProducts(productsData);
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
  };

  const handleShowMyProducts = () => {
    setShowMyProducts(true);
    if (user) {
      setProducts(
        originalProducts.filter((product) => product.author === user)
      );
    } else {
      navigate("/signin");
    }
  };

  const handleShowAllProducts = () => {
    setShowMyProducts(false);
    setProducts(originalProducts.filter((product) => product.author !== user));
  };

  
  const showRangeItems = () => {
    const minPriceValue = parseInt(minPrice);
    const maxPriceValue = parseInt(maxPrice);
  
    const filteredProducts = originalProducts.filter((product) => {
      if (maxPriceValue && minPriceValue) {
        return product.price >= minPriceValue && product.price <= maxPriceValue;
      } else if (maxPriceValue && !minPrice) {
        return product.price <= maxPriceValue;
      } else if (minPriceValue && !maxPrice) {
        return product.price >= minPriceValue;
      }
      return true;
    });
  
    setProducts(filteredProducts.length > 0 ? filteredProducts : originalProducts);
    setError(filteredProducts.length === 0);
  };
  const resetRangeItems = () => {
    setMaxPrice("");
    setMinPrice("");
    setError(false)
    setProducts(originalProducts);
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
        {showMyProducts ? "My Products" : "All Products"}
      </h1>
      <SortSection>
        <RangeSection>
          {showMyProducts ? (
            <Button onClick={handleShowAllProducts}>All&nbsp;Products</Button>
          ) : (
            <Button onClick={handleShowMyProducts}>My&nbsp;Products</Button>
          )}
        </RangeSection>
        <RangeSection>
          <Button>SOMETHING</Button>
        </RangeSection>
        <RangeSection>
          <Button>SOMETHING</Button>
        </RangeSection>
        <RangeSection>
          <Button onClick={() => setRange(!range)}>Set Price Range</Button>
          {range && (
            <>
              <InputContainer>
                <Input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </InputContainer>
              <Button onClick={showRangeItems}>Submit</Button>
              <Button onClick={resetRangeItems}>Reset</Button>
            </>
          )}
        </RangeSection>
      </SortSection>
        {error ? <h1 style={{textAlign: "center"}}>No Products Found</h1> : null}
      <ProductContainer>
        {!error && products.map((product) => {
          const { title, url, price, description, author } = product;
          return (
            <ProductCard key={title}>
              <h3>{title}</h3>
              <div>
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
