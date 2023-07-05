import Products from "../product/Products";
import Sort from "../SortSection/SortSection";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCart } from "../../store/CartSlice";
import { getDocs, collection } from "firebase/firestore";
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
  useEffect(() => {
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
    getProducts();
  }, []);

  return (
    <>
      <Sort
        setProducts={setProducts}
        originalProducts={originalProducts}
        user={user}
        setError={setError}
        setShowMyProducts={setShowMyProducts}
        showMyProducts={showMyProducts}
        products={products}
        setProductStatus={setProductStatus}
      />
      <Products
        imageLoaded={imageLoaded}
        setProductStatus={setProductStatus}
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
