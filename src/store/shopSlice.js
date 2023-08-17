import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"shop",
    initialState: {
        cart:[],
        favoriteProducts:[],
    },
    reducers:{
        addToCart(state,action){
            const {product, amount} = action.payload;
            const productAlreadyInCart = state.cart.find( cartItem => cartItem.product.id === product.id);
            if(productAlreadyInCart){
                productAlreadyInCart.amount += amount;
            }
            else{
                state.cart.push({product, amount});
            }
        },
        removeFromCart(state,action){
            const {product, amount} = action.payload;
            const cartItemToRemove = state.cart.find( cartItem => product.id === cartItem.product.id )

            if(!cartItemToRemove) return;

            cartItemToRemove.amount -= amount;
            if(cartItemToRemove.amount < 1){
                state.cart = state.cart.filter( cartItem => cartItem.amount > 0 );
            }
        },
        addToFavorite(state,action){
            const {product} = action.payload;
            state.favoriteProducts.push(product);
        },
        removeFromFavorite(state,action){
            const {product} = action.payload;
            state.favoriteProducts = state.favoriteProducts.filter( faveProduct => faveProduct.id !== product.id );
        },
    }
})

export const {addToCart, removeFromCart, addToFavorite, removeFromFavorite} = slice.actions;
export default slice.reducer