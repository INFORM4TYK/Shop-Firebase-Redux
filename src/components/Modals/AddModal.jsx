import { Link } from "react-router-dom";
import {
  ModalContainer,
  Modal,
  ButtonSection,
  ModalProductContainer,
} from "./ModalsStyles";
import { Button } from "../product/ProductStyles";
const AddToCart = ({ isOpen, setIsModalOpen, modalProduct, products }) => {

  if (!isOpen) return null;
  const filteredProducts = products.filter(
    (product) => product.title === modalProduct.title
  );
  
  return (
    <ModalContainer>
      <Modal>
        <h2>You added this product to cart successfully</h2>
        {filteredProducts.map((product, index) => {
          const { title, url, price, description, id } = product;
          return (
            <>
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
            </>
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
