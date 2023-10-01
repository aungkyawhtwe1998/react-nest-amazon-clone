import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "./models/Cart";
import { ProductDocument } from "./models/Product";
import productService from "./services/product.service";
interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface ProductState extends AsyncState {
  products: ProductDocument[];
  cart: Cart;
}

const initialState: ProductState = {
  products: [],
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const modifyQtyByOne = (
  cart: Cart,
  selectedProduct: ProductDocument,
  modificationType: "INCREMENT" | "DECREMENT"
) => {
  //copy cart
  const previousCart = [...cart];

  //find product to check that has already existed or not
  const productInCart = previousCart.find(
    (product) => product._id === selectedProduct._id
  );
  let newCart = [];

  //if new product
  if (!productInCart) {
    //allow to add new item
    previousCart.push({ ...selectedProduct, quantity: 1 });
    newCart = previousCart;
  } else {
    //if already exist, filter out the existing product from the cart;
    const filteredCart = previousCart.filter(
      (p) => p._id !== productInCart._id
    );

    //check increment or decrement
    const modification = modificationType === "INCREMENT" ? 1 : -1;

    //modify quantity to existing product
    productInCart.quantity = productInCart.quantity + modification;

    //check the quantity is 0, just copy the filteredCart
    if (productInCart.quantity === 0) {
      newCart = [...filteredCart];
    } else {
      //add the modified product
      newCart = [...filteredCart, productInCart];
    }
  }
  return newCart;
};

export const getProducts = createAsyncThunk("product", async () => {
  try {
    return await productService.getProducts();
  } catch (error) {
    console.log("Error: ", error);
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    incrementProduct: (state, action: PayloadAction<ProductDocument>) => {
      const modifiedCart = modifyQtyByOne(
        state.cart,
        action.payload,
        "INCREMENT"
      );
      state.cart = modifiedCart;
    },

    decrementProduct: (state, action: PayloadAction<ProductDocument>) => {
      const modifiedCart = modifyQtyByOne(
        state.cart,
        action.payload,
        "DECREMENT"
      );
      state.cart = modifiedCart;
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload?.data || [];
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.products = [];
      });
  },
});

export const { incrementProduct, decrementProduct, resetCart } =
  productSlice.actions;

export default productSlice.reducer;
