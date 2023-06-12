import { Button } from "../product/ProductStyles";
import { CartContainer, CartBox, Summary, MainContainer } from "./CartStyles";
import { Link } from "react-router-dom";
import { fs, auth } from "../../config/firebase";
import withAuthentication from "../utils/HOC";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const Cart = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          getDoc(doc(fs, "users", user.uid)).then((snapshot) => {
            setUser(snapshot.data());
          });
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    }, []);

    return user;
  }

  const user = GetCurrentUser();

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const cartCollectionRef = collection(fs, "cart");
        const unsubscribeCart = onSnapshot(cartCollectionRef, (snapshot) => {
          const newCartProducts = [];
          snapshot.forEach((doc) => {
            doc.data().items.forEach((item) => {
              const cartItem = {
                itemID: item.itemID,
                price: item.price,
                qty: item.qty,
                TotalProductPrice: item.TotalProductPrice,
                name: item.name,
                url: item.url,
              };
              newCartProducts.push(cartItem);
            });
          });
          setCartProducts(newCartProducts);
        });
        return () => unsubscribeCart();
      } else {
        console.log("User is not signed in to retrieve cart.");
      }
    });

    return () => unsubscribe();
  }, []);
  const totalCost = cartProducts.reduce(
    (accumulator, product) => accumulator + product.TotalProductPrice,
    0
  );
  const totalQty = cartProducts.reduce(
    (accumulator, product) => accumulator + product.qty,
    0
  );
  console.log(totalQty);
  return (
    <>
      <MainContainer>
        <Summary>
          {cartProducts.length < 1 ? (
            <>
              <h1>Your Cart is empty</h1>
              <Link to="/">
                <Button>Go to shop</Button>
              </Link>
            </>
          ) : (
            <>
              <h2>
                ALL COST <p>{totalCost}&nbsp;USD</p>
              </h2>
              <Button>Buy</Button>
            </>
          )}
        </Summary>
        <CartContainer>
          {cartProducts.map((product, index) => {
            const { itemID, qty, TotalProductPrice, url, name } = product;
            return (
              <CartBox key={itemID}>
                <h2>{name}</h2>
                <div>
                  {url ? (
                    <img src={url} alt={name} />
                  ) : (
                    <Skeleton height={150} width={150} />
                  )}
                </div>
                <div>
                  <section>
                    <b>Total cost:</b>
                    <p>{TotalProductPrice}&nbsp;USD</p>
                  </section>
                  <section>
                    <b>Amount:</b>
                    <p>{qty}</p>
                  </section>
                  <Button onClick={() => handleDelete(id)}>Delete</Button>
                </div>
              </CartBox>
            );
          })}
        </CartContainer>
      </MainContainer>
    </>
  );
};

export default withAuthentication(Cart);
