import { ProductContainer, ProductCard, Button,RowSection} from "./ProductStyles";
const IndividualProduct = ({
  error,
  products,
  handleImageLoad,
  handleAddToCart,
  uid,
  user,
}) => {
  return (
    <ProductContainer>
      {!error &&
        products.map((product, index) => {
          const { title, url, price, description, author } = product;
          return (
            <ProductCard key={index}>
              <h3>{title}</h3>
              <div>
                <img src={url} alt="product" onLoad={handleImageLoad} />
                <p>{description}</p>
                <p>{price} USD</p>
                <RowSection>
                <Button onClick={() => handleAddToCart(product, uid)}>
                  Add To Cart
                </Button>
                {product.author === user &&
                 <Button onClick={() => handleAddToCart(product, uid)}>
                  Delete
                </Button>
                }
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
