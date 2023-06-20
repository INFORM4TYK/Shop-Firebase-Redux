import Product from "../product/Product";
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
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
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
      />
      <Product
        products={products}
        showMyProducts={showMyProducts}
        error={error}
        setImageLoaded={setImageLoaded}
      />
    </>
  );
};

export default Home;
