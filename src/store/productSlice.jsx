// productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    productList: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.productList.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.productList = state.productList.filter(product => product.id !== action.payload);
    },
  },
});

export const { addProduct, deleteProduct  } = productSlice.actions;
export const selectProducts = (state) => state.products.productList;
export default productSlice.reducer;
