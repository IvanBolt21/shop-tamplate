import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Checkbox, Avatar, Container, Box, Button, TextField, Typography } from '@mui/material';
import { removeFromCart, addToCart } from '../store/shopSlice';
import {IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { Divider } from '@mui/material';
 
const amountStyle = {width:"2rem", padding:"0", border: "none", textAlign:"center", fontSize:"18px", width: "4ch"};

export default function CartList() {
    const cart = useSelector(state => state?.global?.cart);

  return (<>
    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {cart?.map( cartItem => <CartItem key={cartItem?.product?.id} cartItem={cartItem} /> )}
    </List>
    <Typography variant='h3'>Total price = {cart.reduce( (acc, curr) => { return acc+= curr.product.price * curr.amount }, 0)} $</Typography>
    </>
  )
}
function CartItem({cartItem}) {
  const dispatch = useDispatch();
  const {product, amount} = cartItem;

  const onDeleteClick = (product, amount) => {
      dispatch(removeFromCart({product,amount}))
  }

  const amountChange = (product, amountNumber) => {
      if(amount+amountNumber < 1) return;
      if(amount > 0)    dispatch(addToCart({product,amount:amountNumber}))
      if(amount < 0)    dispatch(removeFromCart({product,amount:Math.abs(amountNumber)}))
  }

   return <>
    <ListItem
      // key={value}
      secondaryAction={<>
        {/* <Checkbox edge="end" /> */}
        <IconButton edge="end" aria-label="delete" onClick={()=>{onDeleteClick(product,amount)}}>
          <Delete fontSize="large" />
      </IconButton>
      </>
      }
      disablePadding
    >
      <ListItemButton style={{display:"flex",flexDirection:"column"}}>
        <ListItemAvatar style={{display:"flex", flex:"1", width:"100%", alignItems:"center"}}>
          <Avatar variant="square" style={{minWidth:"70px", minHeight:"70px", width:"12vw", height:"12vw"}}
            alt={`Image ${cartItem.product.title}`}
            src={cartItem.product.image}
          />
          
            <Typography variant="h6" style={{textAlign:"start", marginLeft:"3ch", marginRight:"2ch"}}> 
              <RouterLink to={`/product/${product.id}`}>
              <Link component="div">
                {product.title}
                </Link>
              </RouterLink>
            </Typography>
          
        </ListItemAvatar>
        
        <Box style={{flex: "1", width:"100%", display:"flex", alignItems:"center"}}>
          <Box style={{display:"flex", alignItems: "center", marginLeft:"clamp(0,0.5vw,7ch)"}}>
            <IconButton  aria-label='decrease' onClick={()=>{ amountChange(product,-1) }}>
              <RemoveCircleIcon fontSize="large"></RemoveCircleIcon>
            </IconButton>
            <Typography variant='h5' style={{verticalAlign:"center"}}>{amount}</Typography>
            <IconButton aria-label='increase' onClick={()=>{ amountChange(product,1) }}>
              <AddCircleIcon fontSize="large"></AddCircleIcon>
            </IconButton>
          </Box>
          <Typography variant="h6" style={{flex:"1",textAlign:"end", marginRight:"3ch", minWidth:"8ch"}}> 
            {amount*product.price} $ 
          </Typography>

        </Box>
      </ListItemButton>

    </ListItem>
    <Divider/>
</>
}
