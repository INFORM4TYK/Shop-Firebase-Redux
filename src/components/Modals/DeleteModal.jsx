import { auth } from "../../config/firebase";
import {
  ModalContainer,
  Modal,
  ButtonSection,
  ModalProductContainer,
} from "./ModalsStyles";
import { Button } from "../product/ProductStyles";
import { useSelector } from "react-redux";
import { handleDelete } from "../utils/IncDecCart";
import { useEffect } from "react";
const DeleteFromCart = ({ isOpen, setIsModalOpen, modalProduct }) => {
  if (!isOpen) return null;
  const { data: cartData } = useSelector((state) => state.cart);
  const filteredProducts = cartData.filter(
    (product) => product.itemID === modalProduct
  );
  return (
    <ModalContainer>
      <Modal>
        <h2>Are you sure you want to delete </h2>
        {filteredProducts.map((product, index) => {
          const { name, url, qty, TotalProductPrice, itemID } = product;

          return (
            <>
              <ModalProductContainer key={index}>
                <h3>{name}</h3>
                <ModalProductContainer>
                  <img src={url} alt="product" loading="lazy" />
                  <p>Amount: {qty}</p>
                  <div>
                    <h4>Total Price:</h4>
                    <p>{TotalProductPrice} USD</p>
                  </div>
                </ModalProductContainer>
              </ModalProductContainer>
              <ButtonSection>
                <Button
                  onClick={() => {
                    handleDelete(itemID, cartData, auth.currentUser);
                    setIsModalOpen(false);
                  }}
                >
                  YES
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>NO</Button>
              </ButtonSection>
            </>
          );
        })}
      </Modal>
    </ModalContainer>
  );
};

export default DeleteFromCart;
