import React from 'react'
import { useSelector } from 'react-redux';



export default function useIsItemInFavorite(productID) {
    const foundInCart = useSelector(state => state?.global?.favoriteProducts?.find( faveProduct => faveProduct.id === productID));
    return Boolean(foundInCart)
}
