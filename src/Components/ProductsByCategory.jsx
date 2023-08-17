import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/shopSlice';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import AddedToCartSnackbar from './AddedToCartSnackbar';
import ProductRating from './ProductRating';

import { Box, Grid, Card, CardMedia, Typography, Button, CardContent, CardActions } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 360,
    maxWidth: 500,
    p:0,
    m:0,
  };

export default function ProductsByCategory() {
    const [product,setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [isModalOpened, setModalOpened] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const params = useParams();

    useEffect(()=>{
        axios.get(`https://fakestoreapi.com/products/category/${params.category}`)
            .then( (res) => {
                console.log(res?.data?.length);
                if(res?.data?.length < 1){
                    setError("Category not found")
                    return;
                }
                setProducts(res.data)
            } )
            .catch( error => setError("Category not found") )
    },
    [])

    const openModal = (image) =>{
        setModalImage(image);
        setModalOpened(true);
    }

  return (<>{error||<h2 style={{textDecoration:'capitalize'}}>{params?.category}</h2>}
        <Grid container spacing={2} style={{marginTop:"0", justifyContent:"center"}}>
            {product.map( product => <ProductCardCategory key={product?.id} product={product} openModal={openModal}/> )}
        </Grid>

      <Modal
        open={isModalOpened}
        onClose={()=> setModalOpened(false) }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} onClick={()=> setModalOpened(false) }>
          <img src={modalImage} style={{width: "100%"}}></img>
        </Box>
      </Modal>
    </>
  )
}

function ProductCardCategory({product, openModal}){
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();

    const handleSnackbarClose = () => {
      setOpenSnackbar(false);
    }

    const toCartClick = () => {
        dispatch(addToCart({product,amount:1}));
        setOpenSnackbar(true);
    }

    return <>
       <Grid item  >
        <Card sx={{ maxWidth: 345, height:"100%", display:"flex", flexDirection:"column"}}>
        <CardMedia
        sx={{ height: 220 }}
        image={product.image}
        title={product.title}
        onClick={()=>{openModal(product.image)}}
        />
        <CardContent style={{    flex: "1", padding:"4px", display:"flex", flexDirection:"column"}}>
        <ProductRating product={product} size="small" variant='h8'/>
        <Typography gutterBottom variant="h7" component="h3" style={{flex:"1"}} >
          <RouterLink to={`/product/${product.id}`}>  
            <Link>
            {product.title}
            </Link>
          </RouterLink>
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{height:"100%", maxHeight:"101px",columnWidth:"1500px"}}>
            {product.description}
            
        </Typography>
        
        </CardContent>
        <CardActions>
        <Typography variant="h5" color="text.secondary" style={{flex:1}}>
            {product.price} $
        </Typography>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon fontSize='large' />
        </IconButton>
        <IconButton aria-label="add to cart" onClick={toCartClick}>
          <AddShoppingCartIcon fontSize='large' />
        </IconButton>
        </CardActions>
    </Card>
  </Grid>
  <AddedToCartSnackbar openSnackbar={openSnackbar} handleSnackbarClose={handleSnackbarClose}/>


  </>
}
