import { createContext, useState } from "react";
import api from "../api/axios";
export const ContextApi =createContext();

const  ContextProvider=({children})=>{
    const [product,setProducts]=useState([]);
    const apiUrl="http://localhost:8000";
    const fetchProducts = async () => {
            try {
                const res = await api.get(`/api/product/all-product`);
                console.log(res.data.product)
                setProducts(res.data.product);
            } catch (error) {
                console.error(error);
                alert("Network error");
            }
        };
    return(
        <ContextApi.Provider value={{apiUrl ,fetchProducts,product,setProducts }}>
            {children}
        </ContextApi.Provider>
    )
}
export default ContextProvider
