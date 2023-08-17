import React, {useState} from 'react'
import { useSelector, useStore } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';



export default function useIsItemInCart(productID) {
    const foundInCart = useSelector(state => state?.global?.cart?.find( cartItem => cartItem.product.id === productID));
    return Boolean(foundInCart)
}
