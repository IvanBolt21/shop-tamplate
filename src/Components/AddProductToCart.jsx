import { Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from '../store/shopSlice'
import React, { useState } from 'react'

export default function AddProductToCart() {
    const dispatch = useDispatch();
    const [cartItem, setCartItem] = useState({product:{ID:""},amount:1})

    const onAmountChange = (e)=>{
        const newAmount = parseInt(e.target?.value);
        if(newAmount > 0)
        setCartItem( prev => { return {...prev, amount:newAmount } } )
        else 
        setCartItem( prev => { return {...prev, amount:"" } } )
    }

    const onIdChange = (e)=>{
        const newID = e.target?.value.trim();
        if(newID?.length>0)
        setCartItem( prev => { return {product:{...prev.product, ID:e.target?.value}, amount:prev.amount} } );
    }

    const addToCartClick = () => {
        if(cartItem.product?.ID?.length < 1 || cartItem.amount < 1) return;
        setCartItem({product:{ID:""}, amount:1})
        dispatch(addToCart(cartItem));
    }

  return (<>
        <TextField id="product-ID" label="Product id" variant='outlined' value={cartItem.product.ID} onChange={onIdChange}/>
        <TextField id="product-amount" label="Product amount" variant='outlined' type="number" value={cartItem.amount} onChange={onAmountChange}/>
        <Button variant='contained' onClick={addToCartClick}>Add to cart</Button>
    </>
  )
}
