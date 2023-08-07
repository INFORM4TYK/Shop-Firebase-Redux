import { React } from "react";
import { Button } from "../product/ProductStyles";
import {
  CartContainer,
  CartBox,
  Summary,
  MainContainer,
  QtySection,
  NotUserSection,
} from "./CartStyles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { fetchCart } from "../../store/CartSlice";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { handleIncrease, handleDecrease } from "../utils/IncDecCart";
import DeleteFromCart from "../Modals/DeleteModal";

const Cart = () => {
  const dispatch = useDispatch();
  const {
    data: cartData,
    error,
    totalCost,
  } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  const user = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState([]);
  const handleOpenModal = (itemID, cartData, user, qty) => {
    if (qty === 1) {
      setIsModalOpen(true);
      setModalProduct(itemID)
    } else {
      handleDecrease(itemID, cartData, user);
    }
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
                  ALL COST <p>{totalCost.toFixed(2)}&nbsp;USD </p>
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
                        <p>{TotalProductPrice.toFixed(2)}&nbsp;USD</p>
                      </section>
                      <QtySection>
                        <b>Amount:</b>
                        <section>
                          <AiOutlinePlusSquare
                            onClick={() =>
                              handleIncrease(itemID, cartData, user)
                            }
                          />
                          <p>{qty}</p>
                          <AiOutlineMinusSquare
                            onClick={() =>
                              handleOpenModal(itemID, cartData, user, qty)
                            }
                          />
                        </section>
                      </QtySection>
                      <Button
                        onClick={() => {
                          setIsModalOpen(true);
                          setModalProduct(itemID);
                        }}
                      >
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
          <h1>Go to login page to see your cart</h1>
          <Link to="/signin">
            <h5 style={{ color: "white" }}>Log In</h5>
          </Link>
        </NotUserSection>
      )}
      <DeleteFromCart
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalProduct={modalProduct}
        products={cartData}
      />
    </>
  );
};
export default Cart;
