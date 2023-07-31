import Products from "../product/Products";
import Sort from "../SortSection/SortSection";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCart } from "../../store/CartSlice";
import { collection,onSnapshot } from "firebase/firestore";
import { fs } from "../../config/firebase";
const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.fullName);
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [error, setError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showMyProducts, setShowMyProducts] = useState(false);
  const [productStatus, setProductStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  const getProducts = () => {
    const productsCollectionRef = collection(fs, "Products");
    onSnapshot(productsCollectionRef, (snapshot) => {
      const productsData = [];
      snapshot.forEach((doc) => {
        const product = doc.data();
        const productId = doc.id;
        const productWithId = { ...product, id: productId };
        productsData.push(productWithId);
      });
      setProducts(productsData);
      setOriginalProducts(productsData);
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Sort
        showMyProducts={showMyProducts}
        setProducts={setProducts}
        originalProducts={originalProducts}
        user={user}
        setError={setError}
        setShowMyProducts={setShowMyProducts}
        products={products}
        setProductStatus={setProductStatus}
      />
      <Products
        getProducts={getProducts}
        imageLoaded={imageLoaded}
        setProductStatus={setProductStatus}
        setShowMyProducts={setShowMyProducts}
        user={user}
        products={products}
        showMyProducts={showMyProducts}
        error={error}
        setImageLoaded={setImageLoaded}
        productStatus={productStatus}
      />
    </>
  );
};

export default Home;
