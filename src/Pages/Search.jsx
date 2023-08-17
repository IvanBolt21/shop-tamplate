import React from 'react'
import { useParams } from 'react-router';
import GlobalSearch from '../Components/GlobalSearch';

export default function Search() {
    const params = useParams();
  return (
    <GlobalSearch/>
  )
}
