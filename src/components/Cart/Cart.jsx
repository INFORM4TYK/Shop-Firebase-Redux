import { Button } from "../product/ProductStyles";
import {
  CartContainer,
  CartBox,
  Summary,
  MainContainer,
  QtySection,
  NotUserSection
} from "./CartStyles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { fetchCart } from "../../store/CartSlice";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { collection, doc, updateDoc } from "firebase/firestore";
import { fs } from "../../config/firebase";
const Cart = () => {
  const dispatch = useDispatch();
  const {
    data: cartData,
    error,
    loading,
    totalCost,
  } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  const user = useSelector((state) => state.auth.user);

  const updateCartData = (ItemID, updateFn) => {
    const productIndex = cartData.findIndex(
      (product) => product.itemID === ItemID
    );

    if (productIndex >= 0) {
      const updatedCartData = cartData
        .map((product, index) => {
          if (index === productIndex) {
            return updateFn({ ...product });
          }
          return product;
        })
        .filter((product) => product.qty > 0);

      if (user) {
        const cartRef = doc(collection(fs, "cart"), user.uid);
        updateDoc(cartRef, { items: updatedCartData })
          .then(() => {
            console.log("Updated cart");
          })
          .catch((error) => {
            console.log("Error updating cart:", error);
          });
      } else {
        console.log("User is not logged in to update the cart");
      }
    }
  };

  const handleIncrease = (ItemID) => {
    updateCartData(ItemID, (product) => {
      product.qty += 1;
      product.TotalProductPrice = product.qty * product.price;
      return product;
    });
  };

  const handleDecrease = (ItemID) => {
    updateCartData(ItemID, (product) => {
      product.qty -= 1;
      product.TotalProductPrice = product.qty * product.price;
      return product;
    });
  };

  const handleDelete = (ItemID) => {
    updateCartData(ItemID, (product) => {
      product.qty = 0;
      return product;
    });
  };

  return (
    <>
      {user ? (
        <MainContainer>
          <Summary>
            {cartData === undefined || cartData.length < 1 ? (
              <>
                <h1>Your Cart is empty</h1>
                <Link to="/">
                  <Button>Go to shop</Button>
                </Link>
              </>
            ) : (
              <>
                <h2>
                  ALL COST <p>{totalCost}&nbsp;USD </p>
                </h2>
                <Button>Buy</Button>
              </>
            )}
          </Summary>
          <CartContainer>
            {error && error}
            {cartData &&
              cartData.map((product) => {
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
                      <QtySection>
                        <b>Amount:</b>
                        <section>
                          <AiOutlinePlusSquare
                            onClick={() => handleIncrease(itemID)}
                          />
                          <p>{qty}</p>
                          <AiOutlineMinusSquare
                            onClick={() => handleDecrease(itemID)}
                          />
                        </section>
                      </QtySection>
                      <Button onClick={() => handleDelete(itemID)}>
                        Delete
                      </Button>
                    </div>
                  </CartBox>
                );
              })}
          </CartContainer>
        </MainContainer>
      ) : (
        <NotUserSection>
        <h1>
          Go to login page to see your cart
        </h1>
          <Link to="/signin"><h5 style={{color:"white"}}>Log In</h5></Link>
        </NotUserSection>
      )}
    </>
  );
};
export default Cart;
