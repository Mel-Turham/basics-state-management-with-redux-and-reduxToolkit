import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import cartItems from '../../cartItems';
import axios from 'axios';

const url = 'https://www.course-api.com/react-useReducer-cart-project';
const initialState = {
	cart: [],
	amount: null,
	total: 0,
	isLoading: true,
	isError: false,
};

export const getCartItems = createAsyncThunk(
	'cart/getCartItems',
	async (ThunkAPI) => {
		try {
			const resp = await axios(url);
			return resp.data;
		} catch (error) {
			return ThunkAPI.rejectedWithValue('Error');
		}
	},
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,

	reducers: {
		clearCart: (state) => {
			state.cart = [];
		},
		removeItem: (state, action) => {
			console.log(action.payload);
			const idItem = action.payload;
			state.cart = state.cart.filter((item) => item.id !== idItem);
		},

		increase: (state, action) => {
			const idItem = action.payload;
			const singleItem = state.cart.find((item) => item.id === idItem);
			singleItem.amount = singleItem.amount + 1;
		},
		decrease: (state, action) => {
			const idItem = action.payload;
			const singleItem = state.cart.find((item) => item.id === idItem);
			singleItem.amount = singleItem.amount - 1;
		},

		calculateTotal: (state) => {
			let amount = 0;
			let total = 0;
			state.cart.forEach((item) => {
				amount += item.amount;
				total += item.amount * item.price;
			});

			state.amount = amount;
			state.total = total;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCartItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCartItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.cart = action.payload;
			})
			.addCase(getCartItems.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.log(action.error);
			});
	},
});

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
	cartSlice.actions;

export default cartSlice.reducer;
