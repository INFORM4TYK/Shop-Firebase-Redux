import { addDoc,collection } from "firebase/firestore";
import { fs } from "../../config/firebase";
import {
  ProductContainer,
  ProductCard,
  Button,
  RowSection,
} from "./ProductStyles";

const IndividualProduct = ({
  error,
  products,
  handleAddToCart,
  uid,
  user,
  imageLoaded,
  setImageLoaded,
}) => {
  const handleImageLoad = () => {
    // setImageLoaded(true);
  };

  const handleDelete = async (product) => {
    console.log(product)
  };

  console.log(imageLoaded);

  return (
    <ProductContainer>
      {!error &&
        products.map((product, index) => {
          const { title, url, price, description, author } = product;
          return (
            <ProductCard key={index}>
              <h3>{title}</h3>
              <div>
                <img
                  src={url}
                  alt="product"
                  onLoad={handleImageLoad}
                  // style={{ display: imageLoaded ? "block" : "none" }}
                  loading="lazy"
                />
                {/* {!imageLoaded && <Skeleton width={150} height={150} />} */}

                <p>{description}</p>
                <p>{price} USD</p>
                <RowSection>
                  {product.author === user ? (
                     <Button onClick={() => handleDelete(product)}>
                      Delete
                    </Button>
                  ) : (
                    <Button onClick={() => handleAddToCart(product, uid)}>
                      Add To Cart
                    </Button>
                  )}
                </RowSection>
                <RowSection>
                  <h4>
                    {author === user
                      ? "Its Your Product"
                      : author
                      ? `Seller: ${author}`
                      : "Seller: Anonymous"}
                  </h4>
                </RowSection>
              </div>
            </ProductCard>
          );
        })}
    </ProductContainer>
  );
};

export default IndividualProduct;