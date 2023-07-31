import { doc, deleteDoc } from "firebase/firestore";
import { auth, fs } from "../../config/firebase";
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
  getProducts,
  setShowMyPorducts
}) => {
  const handleImageLoad = () => {
    // setImageLoaded(true);
  };
  const handleDelete = async (product) => {
    if (user === product.author) {
      const productRef = doc(fs, "Products", product.id);
      deleteDoc(productRef)
        .then(() => {
          setShowMyPorducts(false)
          getProducts();
          console.log("Delete Product Successfully");
        })
        .catch((error) => {
          console.log("Error deleting product:", error);
        });
    } else {
      console.log("User is not authorized to delete the product");
    }
  };
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
                  {auth.currentUser ? (
                    product.uid === auth.currentUser.uid ? (
                      <Button onClick={() => handleDelete(product)}>
                        Delete
                      </Button>
                    ) : (
                      <Button onClick={() => handleAddToCart(product, uid)}>
                        Add To Cart
                      </Button>
                    )
                  ) : (
                    <Button onClick={() => handleAddToCart(product, uid)}>
                      Add To Cart
                    </Button>
                  )}
                </RowSection>
                <RowSection>
                  <h4>
                    {auth.currentUser && product.uid === auth.currentUser.uid
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
