import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"fave",
    initialState: {
        favoriteProducts:[],
    },
    reducers:{
        addToFavorite(state,action){
            const {product} = action.payload;
            state.favoriteProducts.push(product);
        },
        removeFromFavorite(state,action){
            const {product} = action.payload;
            state.favoriteProducts = state.favoriteProducts.filter( faveProduct => faveProduct.id === product.id );
        },
    }
})

export const {addToFavorite, removeFromFavorite} = slice.actions;
export default slice.reducer