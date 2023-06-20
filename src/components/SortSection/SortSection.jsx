import { useState } from "react";
import {
  SortSection,
  RangeSection,
  Input,
  InputContainer,
  ExpandContainer,
} from "./SortStyles";
import { Button } from "../product/ProductStyles";
import { useNavigate } from "react-router-dom";

const Sort = ({
  user,
  originalProducts,
  setProducts,
  setError,
  setShowMyProducts,
  showMyProducts,
  products,
  setProductStatus
}) => {
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [range, setRange] = useState(false);
  const handleShowMyProducts = () => {
    setShowMyProducts(true);
  
    if (user) {
      const filteredProducts = originalProducts.filter(
        (product) => product.author === user
      );
      setProducts(filteredProducts);

      if (filteredProducts.length === 0) {
        setProductStatus(true);
      }
    } else {
      navigate("/signin");
    }
  };
  const handleShowAllProducts = () => {
    setShowMyProducts(false);
    setProducts(originalProducts);
  };

  const showRangeItems = () => {
    const minPriceValue = parseInt(minPrice);
    const maxPriceValue = parseInt(maxPrice);

    const filteredProducts = originalProducts.filter((product) => {
      if (maxPriceValue && minPriceValue) {
        return (
          product.price >= minPriceValue &&
          product.price <= maxPriceValue &&
          product.author !== user
        );
      } else if (maxPriceValue && !minPrice) {
        return product.price <= maxPriceValue && product.author !== user;
      } else if (minPriceValue && !maxPrice) {
        return product.price >= minPriceValue && product.author !== user;
      }
      return true;
    });
    setProducts(
      filteredProducts.length > 0 ? filteredProducts : originalProducts
    );
    setError(filteredProducts.length === 0);
  };
  const resetRangeItems = () => {
    setMaxPrice("");
    setMinPrice("");
    setError(false);
    setProducts(originalProducts);
  };
  return (
    <SortSection>
      <RangeSection>
        {showMyProducts ? (
          <Button onClick={handleShowAllProducts}>All&nbsp;Products</Button>
        ) : (
          <Button onClick={handleShowMyProducts}>My&nbsp;Products</Button>
        )}
      </RangeSection>
      <RangeSection>
        <Button>SOMETHING</Button>
      </RangeSection>
      <RangeSection>
        <Button>SOMETHING</Button>
      </RangeSection>
      <RangeSection>
        <Button onClick={() => setRange(!range)}>
          {range ? <p>&Chi;</p> : <p>Pirce Range</p>}
        </Button>
        <ExpandContainer expanded={range}>
          <InputContainer>
            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </InputContainer>
          <Button onClick={showRangeItems}>Submit</Button>
          <Button onClick={resetRangeItems}>Reset</Button>
        </ExpandContainer>
      </RangeSection>
    </SortSection>
  );
};

export default Sort;
