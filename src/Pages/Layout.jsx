import { Badge, Container } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { Outlet, NavLink } from 'react-router-dom'
import {Avatar} from '@mui/material'
import { useSelector } from "react-redux"

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

export default function Layout() {
    const cartSize = useSelector(state => state?.global?.cart?.length);

  return (
    <Container>
      <header className='top-menu' style={{justifyContent: "center", display:"flex", gap:"1rem", alignItems:"center", paddingTop:"1rem", paddingBottom:"1rem"}}>
        <NavLink to="/" style={{flex:"1"}}>Home</NavLink>
        <NavLink to="/categories" style={{flex:"1"}}>Categories</NavLink>
        <NavLink to="/favorites" style={{flex:"1"}}>Favorites</NavLink>
        <NavLink to="/cart" >
            <StyledBadge  badgeContent={cartSize} color="primary">
                <Avatar sx={{ bgcolor: "pink" }} alt="Cart">🛒</Avatar>
            </StyledBadge >
        </NavLink>
        
      </header>
      <Outlet></Outlet>
      <footer>2023</footer>
    </Container>
  )
}