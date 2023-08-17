import { Divider } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard';

export default function FaveList() {
  const favoriteProducts = useSelector( state => state?.global?.favoriteProducts );  
  return (
    <div>
        {favoriteProducts?.map( product => <>
                <ProductCard key={product.id} passedProduct={product}/>
                <Divider style={{marginBottom:"1rem"}}></Divider>
            </> )}
    </div>
  )
}
