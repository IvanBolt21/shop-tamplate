
import { Alert, AlertTitle, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import useDeferedInput from '../Hooks/useDeferdInput'
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import {Autocomplete} from '@mui/material';
import axios from 'axios';
import searchFilter from '../Helpers/searchFilter';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from './ProductCard';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { Link as LinkRouter, useNavigate, useParams, useSearchParams } from 'react-router-dom';


const sortMethods = {
    "Price: high to low": (products) =>  products.sort((a,b) => b.price-a.price),
    "Price: low to high": (products) =>  products.sort((a,b) => a.price-b.price),
    "Rating: high to low": (products) =>  products.sort((a,b) => b.rating.rate-a.rating.rate),
    "Rating: low to high": (products) =>  products.sort((a,b) => a.rating.rate-b.rating.rate),
    "Popularity: high to low": (products) =>  products.sort((a,b) => b.rating.count-a.rating.count),
    "Popularity: low to high": (products) =>  products.sort((a,b) => a.rating.count-b.rating.count),
}

function filterSearchByParams(searchList, {ratingValue, ordersValue, priceValue}){
    const filteredSearch = searchList.filter( product => {
        if(ratingValue) {
            if( !(product?.rating?.rate >= ratingValue[0]) || 
                !(product?.rating?.rate <= ratingValue[1])) return false;
        }
        if(ordersValue) {
            if( !(product?.rating?.count >= ordersValue[0]) || 
                !(product?.rating?.count <= ordersValue[1])) return false;
        }
        if(priceValue) {
            if( !(product?.price >= priceValue[0]) || 
                !(product?.price <= priceValue[1])) return false;
        }
        return true;
    } )
    return filteredSearch
}

const filterMethods = {

}


export default function GlobalSearch() {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultSearchString = params.searchInput || "";
    // console.log("def searct = ", defaultSearchString)
    const [searchInput, deferedSearch, setSearchInput] = useDeferedInput(defaultSearchString, 350);
    const [allProducts, setAllProducts] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [sortMethod, setSortMethod] = useState(searchParams.get("sort") || "Price: low to high");
    const [currentSearch, setCurrentSearch] = useState([]);
    const [showSearch, setShowSearch] = useState(defaultSearchString.length > 0);
    const [ratingValue, setRatingValue] = React.useState([Number(searchParams.get("rateF")) || 0, Number(searchParams.get("rateT")) || 5]);
    const [ordersValue, setOrdersValue] = React.useState([Number(searchParams.get("ordersF")) || 0, Number(searchParams.get("ordersT")) || 500]);
    const [priceValue, setPriceValue] = React.useState([Number(searchParams.get("priceF")) || 0, Number(searchParams.get("priceT")) || 1000]);

    //console.log(ratingValue);

    const navigate = useNavigate();
    const [error, setError] = useState();
    const [value, setValue] = React.useState(defaultSearchString);

    useEffect(() => {
        if(!allProducts.length>0){
        axios.get(`https://fakestoreapi.com/products`)
            .then( (res) => {
                if(res?.data?.length < 1){
                    setError("Error")
                    return;
                }
                setAllProducts(res.data);
                const filteredOptions = searchFilter(res.data, deferedSearch);
                setSearchResult(filteredOptions);
                if(showSearch) {
                    const sortedSearch = sortMethods[sortMethod]([...filteredOptions]);
                    setCurrentSearch(filterSearchByParams(sortedSearch,{ratingValue,ordersValue,priceValue}));
                }
            } )
            .catch( error => setError("Error") ) 
        }
        else {
            setSearchResult(searchFilter(allProducts, deferedSearch));
        }
    }, [deferedSearch])


    useEffect(() => {
        // console.log("UPDATING FILTER ==================");
        setSearchInput(defaultSearchString);
        const newRating = [Number(searchParams.get("rateF")) || 0, Number(searchParams.get("rateT")) || 5];
        const newOrders = [Number(searchParams.get("ordersF")) || 0, Number(searchParams.get("ordersT")) || 500]
        const newPrice = [Number(searchParams.get("priceF")) || 0, Number(searchParams.get("priceT")) || 1000]
        setRatingValue(newRating);
        setOrdersValue(newOrders);
        setPriceValue(newPrice);
        const filteredOptions = searchFilter(allProducts, defaultSearchString);
        const sortedSearch = sortMethods[sortMethod]([...filteredOptions]);
        // console.log("NEW RATING ---- ", newRating)
        const filterResult = filterSearchByParams(sortedSearch,{ratingValue:newRating,ordersValue:newOrders,priceValue:newPrice});
        // console.log("FILER RESULT ++++++++++++ ", filterResult)
        setCurrentSearch(filterResult);                
    }, [defaultSearchString, searchParams.get("rateF"), searchParams.get("rateT"), searchParams.get("ordersF"), searchParams.get("ordersT"), searchParams.get("priceF"), searchParams.get("priceT") ])

    const openSearchList = (searchVal) =>{
        if(searchVal?.length<1 || allProducts?.length <1) return
        setShowSearch(true);
        const search = searchFilter(allProducts, searchVal);
        navigate(`/search/${searchVal}?${searchParams}`)   
        if(search?.length>0) {
            const sortedSearch = sortMethods[sortMethod]([...search]);
            setCurrentSearch( filterSearchByParams(sortedSearch,{ratingValue,ordersValue,priceValue}) );
            setSearchResult(search);
        }
        else {
            setCurrentSearch([]);
        }
    }

    const closeSearchList = () =>{
        setShowSearch(false);
    }

    const handleSortChange = (event) => {
        const newSortMethod = event.target.value;
        const searchObject = {};
        setSortMethod(newSortMethod);
        searchParams.forEach( (val, key) => searchObject[key] = val );
        setSearchParams({...searchObject, "sort":newSortMethod})
        if(currentSearch.length > 1){
            setCurrentSearch(sortMethods[newSortMethod]([...currentSearch]));
        }
      };
    
    const getFilterValues = ({ratingValue, ordersValue, priceValue})=>{
        //console.log("setting new pelmen");
        setRatingValue(ratingValue)
        setOrdersValue(ordersValue)
        setPriceValue(priceValue);
        const searchObject = {};
        searchParams.forEach( (val, key) => searchObject[key] = val );
        setSearchParams({...searchObject, "rateF":ratingValue[0], "rateT":ratingValue[1],
                        "ordersF":ordersValue[0],   "ordersT":ordersValue[1],
                        "priceF":priceValue[0],     "priceT":priceValue[1]});
        const sortedSearch = sortMethods[sortMethod]([...searchResult]);
        setCurrentSearch( filterSearchByParams([...sortedSearch],{ratingValue,ordersValue,priceValue}) );
    }

    return (
        <div>
          {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
          <div>{`inputValue: '${searchInput}'`}</div>
          <br />
          {"deffered = "} {deferedSearch} */}
          <Autocomplete
            freeSolo
            disablePortal
            value={value}
            onChange={(event, newValue) => {
                if(newValue?.label) return;
                if(!newValue) return;
              setValue(newValue);
              openSearchList(newValue);
            }}
            inputValue={searchInput}
            onInputChange={(event, newInputValue) => {
                setSearchInput(newInputValue);
            }}
            id="controllable-states-demo"
            options={deferedSearch.length > 0 ? searchResult.map( (product,index) => {
                return {
                    label: product.title,
                    id: product.id,
                }
            } ) : []}
            noOptionsText = "Not found"
            filterOptions = {(x) => x}
            // sx={{ width: 300 }}
            renderInput={(params) => 
                <TextField {...params} label="Search" 
                InputProps={{
                    ...params.InputProps,
                    endAdornment:<SearchButton onClick={()=>{
                        openSearchList(searchInput);
                    }}/>
                }}/>
            }
            renderOption = {(props, option) => {
                return <LinkRouter {...props} to={`/product/${option.id}`}>{option.label}</LinkRouter>
            }}
            />

            <SortSelector sortMethod={sortMethod} handleSortChange={handleSortChange}/>
            <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={9}>
            <SearchList isOpened={showSearch} searchResult={currentSearch}/>
            </Grid>
            <Grid item xs={3}>
            <SearchFilters getFilterValues={getFilterValues} passedOrders={ordersValue} passedPrice={priceValue} passedRating={ratingValue}/>
            </Grid>
        </Grid>
        </Box>
            
        </div>
      );


  return (
    <div>
        <TextField value={searchInput} onChange={(e)=>{setSearchInput(e.target.value)}} />
        <Box style={{backgroundColor:"Highlight", borderRadius:"20px", padding:"20px", marginTop:"20px", fontSize:"40px"}}>{deferedSearch}</Box>
        <ol>
            {searchResult.map( product => <li key={product.id}>{product.title}</li> )}
        </ol>
    </div>
  )
}



function SearchButton({onClick}){
    return <InputAdornment position="end">
      <IconButton
        aria-label="Search"
        edge="end"
        onClick={onClick}
      >
        <SearchIcon />
      </IconButton>
    </InputAdornment>
}


function SearchList({isOpened = false, searchResult = []}) {
    if(!isOpened || searchResult?.length<1) return <></>
    return <ol>
    {searchResult.map( product => <div key={product.id}>
            <ProductCard  passedProduct={product}/>
            <Divider style={{marginBottom:"1rem"}}/>
        </div> )}
</ol>
}

function SortSelector({sortMethod,handleSortChange}){
    return <Box sx={{ minWidth: 120 }} style={{marginTop:"1rem"}}>
        <FormControl fullWidth>
            <InputLabel id="sort-select-label">Sort by</InputLabel>
            <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortMethod}
            label="Sort by"
            onChange={handleSortChange}
            >                    
                {Object.keys(sortMethods).map( sortMethodName =>{
                return <MenuItem key={sortMethodName} value ={sortMethodName} >{sortMethodName}</MenuItem>
            } )}
            </Select>
        </FormControl>
    </Box>
}

function SearchFilters({getFilterValues, passedRating, passedOrders, passedPrice}){
    //console.log("passed rating = ", passedRating)
    const [ratingValue, setRatingValue] = React.useState(passedRating||[0, 5]);
    const [ordersValue, setOrdersValue] = React.useState(passedOrders||[0, 500]);
    const [priceValue, setPriceValue] = React.useState(passedPrice||[0, 1000]);


    useEffect(()=>{
        //console.log("setting sobaka ====================");
        setRatingValue(passedRating);
        setOrdersValue(passedOrders);
        setPriceValue(passedPrice);

    },[passedRating,passedOrders,passedPrice])

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };
    const handleOrdersChange = (event, newValue) => {
        setOrdersValue(newValue);
    };
    const handlePriceChange = (event, newValue) => {
        setPriceValue(newValue);
    };
    return <Box>
        <Typography>Rating:</Typography>
        <Slider
        getAriaLabel={() => 'Rating range'}
        value={ratingValue}
        onChange={handleRatingChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={0.1}
        max={5}
        min={0}
      />
        <Typography>Orders:</Typography>
        <Slider
        getAriaLabel={() => 'Rating range'}
        value={ordersValue}
        onChange={handleOrdersChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={1}
        max={500}
        min={0}
      />
        <Typography>Price:</Typography>
        <Slider
        getAriaLabel={() => 'Rating range'}
        value={priceValue}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={1}
        max={1000}
        min={0}
      />
      <Button onClick={()=>{getFilterValues({ratingValue, ordersValue, priceValue})}}>Apply filter</Button>
    </Box>

    function valuetext(value) {
        return `${value}`;
    }
  
}