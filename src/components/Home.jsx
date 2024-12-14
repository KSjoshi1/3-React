import React, { useState, useEffect } from 'react'
import { FaHandPointUp } from "react-icons/fa";
import { FaHandPointDown } from "react-icons/fa";

function inComparator(product1,product2){
    if(product1.price > product2.price){
        return 1
    }else{
        return -1
    }
}

function decComparator(product1,product2){
    if(product1.price < product2.price){
        return 1 
    }else{
        return -1
    }
}

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState(null);
    const [sortDir,setSortDir] = useState(0);
    const [categories,setCategories] = useState([]);
    const [currCategory, setCurrCategory] = useState("All categoris")

    useEffect(()=>{
        (async function (){
            const resp = await fetch(`https://fakestoreapi.com/products`)
            const productData = await resp.json();
            // productData.forEach((elem)=>
            //  console.log(elem.title));
            setProducts(productData); 
        })()
    },[]);

    //fetch the categories ->api->dynamic
    useEffect(()=> {
        (async function(){
            const resp = await fetch('https://fakestoreapi.com/products/categories');
            const categoriesData = await resp.json();
            //console.log(categoriesData);
            setCategories(categoriesData);
        })()
    },[])


/* Sorting -> rea.raging */
    let filterArr = products;
    if(searchTerm != ""){
        filterArr = filterArr.filter((products)=> {
            let lowerSearchTerm = searchTerm.toLocaleLowerCase();
            let lowerTitle = products.title.toLowerCase();
            return lowerTitle.includes(lowerSearchTerm);
        })
    }
   /* Sorting -> rear. */
    let filteredSortedArr = filterArr;
    if(sortDir != 0){
        if(sortDir == 1){
            filteredSortedArr = filteredSortedArr.sort(inComparator);
        }else{
            filteredSortedArr = filteredSortedArr.sort(decComparator)
        }
    } 
    /* Categorization */
    let filteredSortedByArr = filteredSortedArr;
    if(currCategory != "All categoris"){
        console.log(`executed for ${currCategory}`)
        filteredSortedByArr = filteredSortedByArr.filter((product)=>{
            return product.category == currCategory;
        });
        console.log(filteredSortedByArr);
    }

    return(
        <>
        <header className='nav_wrapper'>
            <div className='search_sortWrapper'>
            <input 
            className='search_input'
            type='text'
            value={searchTerm}
            onChange={(e)=>{ setSearchTerm(e.target.value)}} />
            <div className='icons_container'>
                 <FaHandPointUp style={{color: "#38cc0f",}}  fontSize="large"
                 onClick={()=>{setSortDir(1)}} />
                 <FaHandPointDown style={{color: "#0be3ea",}}  fontSize="large"
                 onClick={()=>{setSortDir(-1)}} />
            </div>
            </div>
            <div className='cat_wrapper'>
            <button className='category_option'>All Categories</button>
            {categories.map((category)=>{
                return <button className='category_option'
                onClick={()=> {
                    setCurrCategory(category);
                }}>{category}</button>
            })}
                
            </div>
        </header>
        <main className='product_wrapper'>
            {filteredSortedByArr == null ?  <h2>Loading....</h2>:
            filteredSortedByArr.map((product)=>{
                return(<div className='product'>
                    <img src={product.image} alt='product_img'
                    className='product_image' />
                    <div className='product_meta'>
                        <p className='product_meta'>{product.title}</p>
                        <p className='price'>$ {product.price}</p>
                    </div>
                </div>)
            })}
        </main>
        </>
    )
}
export default Home