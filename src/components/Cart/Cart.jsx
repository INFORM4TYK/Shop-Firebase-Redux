import { Button } from "../product/ProductStyles";
import { CartContainer, CartBox, Summary, MainContainer } from "./CartStyles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { fetchCart } from "../../store/CartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const { data: cartData, error, loading,totalCost } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  console.log(cartData);
  return (
    <>
      <MainContainer>
        <Summary>
          {!cartData ? (
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
          {loading ? <p>Loading...</p> : null }

          
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

export default Cart;
