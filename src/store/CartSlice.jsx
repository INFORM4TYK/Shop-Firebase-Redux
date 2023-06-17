import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { fs } from "../config/firebase";
const initialState = {
  data: [],
  totalCost: 0,
  totalQty: 0,
  error: false,
  loading: false,
};
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { dispatch }) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const cartCollectionRef = collection(fs, "cart");
        const unsubscribeCart = onSnapshot(cartCollectionRef, (snapshot) => {
          const newCartProducts = [];
          snapshot.forEach((doc) => {
            if (doc.id === user.uid) {
              doc.data().items.forEach((item) => {
                const cartItem = {
                  itemID: item.itemID,
                  price: item.price,
                  qty: item.qty,
                  TotalProductPrice: item.TotalProductPrice,
                  name: item.name,
                  url: item.url,
                };
                newCartProducts.push(cartItem);
              });
            }
          });
          dispatch(fetchCart.fulfilled(newCartProducts));
        });
        return () => unsubscribeCart();
      } else {
        console.log("User is not signed in to retrieve cart.");
      }
    });
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.totalQty = action.payload;
    },
    removeFromCart: (state, action) => {
      state.totalQty = action.payload;
    },
    addProduct: (state, action) => {
      state.totalQty + 1;
    },
    clearCart: (state, action) => {
      state.data = [];
      state.totalQty = 0;
      state.totalCost = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.totalQty = action.payload.reduce(
            (accumulator, product) => accumulator + product.qty,
            0
          );
          state.totalCost = action.payload.reduce(
            (accumulator, product) => accumulator + product.TotalProductPrice,
            0
          );
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
export const { addToCart, removeFromCart, addProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCart());
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};
