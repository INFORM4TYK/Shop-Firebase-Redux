import { Link } from "react-router-dom";
import { ModalContainer, Modal, ButtonSection,ModalProductContainer } from "./ModalsStyles";
import { Button } from "../product/ProductStyles";
import { useSelector } from "react-redux";

const AddToCart = ({ isOpen, setIsModalOpen, modalProduct,products }) => {
  if (!isOpen) return null;
  console.log(modalProduct)
  const filteredProducts = products.filter(
    (product) => product.title === modalProduct.title
  );
  console.log(filteredProducts)
  return (
    <ModalContainer>
      <Modal>
        <h2>You added this product to cart successfully</h2>
        {filteredProducts.map((product, index) => {
          const { title, url, price, description } = product;
          return (
            <ModalProductContainer key={index}>
              <h3>{title}</h3>
              <ModalProductContainer>
                <img
                  src={url}
                  alt="product"
                  // onLoad={handleImageLoad}
                  // style={{ display: imageLoaded ? "block" : "none" }}
                  loading="lazy"
                />
                {/* {!imageLoaded && <Skeleton width={150} height={150} />} */}
                <p>{description}</p>
                <p>{price} USD</p>
              </ModalProductContainer>
            </ModalProductContainer>
          );
        })}
        <ButtonSection>
          <Button onClick={() => setIsModalOpen(false)}>
            Continue Shopping
          </Button>
          <Link to="/cart">
            <Button>Open Cart</Button>
          </Link>
        </ButtonSection>
      </Modal>
    </ModalContainer>
  );
};

export default AddToCart;
