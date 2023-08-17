import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import {Grid} from '@mui/material';

const linkStyle = {display:"flex", alignItems:"center", justifyContent:"center", minWidth:"200px", minHeight:"200px"};

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        axios.get("https://fakestoreapi.com/products/categories")
            .then((res)=>{
                console.log(res.data);
                setCategories(res.data)
            })
            .catch((err)=>{
                console.log(err);
            });
    },[])

    return (
    <Grid container spacing={2}>
        {categories.map( category => 
            <Grid item key={category} xs={12} md={6} >
                
                <LinkRouter to={category}>
                    <Link style={linkStyle} variant='h4' component="div">
                    {category}
                    </Link> 
                </LinkRouter>
                
            </Grid>
        )}
    </Grid>
  )
}
