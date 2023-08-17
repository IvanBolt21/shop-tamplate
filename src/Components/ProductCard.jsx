import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToFavorite, removeFromFavorite } from '../store/shopSlice';
import useIsItemInCart from '../Hooks/useIsItemInCart';
import useIsItemInFavorite from '../Hooks/useIsItemInFavorite';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddedToCartSnackbar from './AddedToCartSnackbar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Link } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import ProductRating from './ProductRating';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


export default function ProductCard({passedProduct}) {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    const [product, setProduct] = useState(passedProduct);
    const isItemInCart = useIsItemInCart(product?.id);
    const isItemInFavorite = useIsItemInFavorite(product?.id);
    const [error, setError] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const params = useParams();


    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnackbar(false);
    };


    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    useEffect(() => {
        if(passedProduct) {
            return;
        };
      axios.get(`https://fakestoreapi.com/products/${params.id}`)
        .then( res => {  setProduct(res.data)} )
        .catch( error =>  setError(error));
    }, [])
    
    const cartClick = ()=>{
        dispatch(addToCart({product, amount:1}));
        setOpenSnackbar(true);
    }

    const faveClick = () => {
        if(!isItemInFavorite) {
            dispatch(addToFavorite({product}));
        }
        else {
            dispatch(removeFromFavorite({product}));
        }
    }

    if(product) return (<>
    <Card >
      <CardHeader

        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={passedProduct?                 <LinkRouter to={`/product/${passedProduct.id}`}>
        <Link variant='h5' component="div">
        {product.title}
        </Link> 
    </LinkRouter> : product.title}
        subheader={<Typography variant='h5'>{product.price} $</Typography>}
      />
      <CardMedia
        component="img"
        height="194"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={faveClick}>
          <FavoriteIcon fontSize='large'color={isItemInFavorite?"secondary":""} />
        </IconButton>
        <IconButton aria-label="add to cart" onClick={cartClick}>
          <AddShoppingCartIcon fontSize='large' color={isItemInCart?"secondary":""} />
        </IconButton>
        <ProductRating product={product}/>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Other characteristics
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
        <AddedToCartSnackbar openSnackbar={openSnackbar} handleSnackbarClose={handleSnackbarClose}></AddedToCartSnackbar>
</>
    )
    return <>Loading...</>
}
