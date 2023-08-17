export default function searchFilter(products, searchInput = "") {
    if(searchInput?.length < 1 || typeof(searchInput) !== "string" ) return products;
    searchInput = searchInput?.toLowerCase();
    return products.filter( 
        product => {
            return product?.title?.toLowerCase()?.includes(searchInput) || 
             product?.description?.toLowerCase()?.includes(searchInput)
        } );
}