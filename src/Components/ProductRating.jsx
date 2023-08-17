import React from 'react'
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/system';

export default function ProductRating({product, size = "medium", variant = "h6"}) {
  return (
    <Box style={{display:"flex", alignItems:"center", justifyContent:"center"}}>        
        <Rating name="read-only" size={size} precision={0.1} value={product?.rating?.rate} readOnly />
        <Typography  component="span" variant={variant} style={{marginLeft:"0.5ch", lineHeight:"0.9"}}>{product?.rating?.count || 0}</Typography>
    </Box>
  )
}
