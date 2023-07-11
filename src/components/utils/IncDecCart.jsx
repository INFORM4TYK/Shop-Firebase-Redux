import { collection, doc, updateDoc } from "firebase/firestore";
import { fs } from "../../config/firebase";

export const updateCartData = (ItemID, updateFn, cartData, user) => {
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

export const handleIncrease = (ItemID, cartData, user) => {
  updateCartData(
    ItemID,
    (product) => {
      console.log(ItemID);
      product.qty += 1;
      product.TotalProductPrice = product.qty * product.price;
      return product;
    },
    cartData,
    user
  );
};

export const handleDecrease = (ItemID, cartData, user) => {
  updateCartData(
    ItemID,
    (product) => {
      product.qty -= 1;
      product.TotalProductPrice = product.qty * product.price;
      return product;
    },
    cartData,
    user
  );
};

export const handleDelete = (ItemID, cartData, user) => {
  updateCartData(
    ItemID,
    (product) => {
      product.qty = 0;
      return product;
    },
    cartData,
    user
  );
};
