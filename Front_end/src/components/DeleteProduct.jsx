import { useContext, useEffect } from "react";
import api from "../api/axios";
import { ContextApi } from "./ContextApi";
function DeleteProduct() {
    
    const {apiUrl,fetchProducts,product} = useContext(ContextApi);
    
    const deleteProduct = async (id) => {
        try {
            const res = await api.delete(`/api/product/delete-product/${id}`);
            console.log(res.data);
            alert("product Deleted Successfully");
            fetchProducts();
        } catch (e) {
            console.log(e);
            alert("Network error");
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div className="container">
            <h1 className="text-center">Delete Product</h1>
            <div className="row justify-content-md-center">

                {
                    product.map(e => {
                        return (
                            <div className="col-lg-2 col-sm-6 col-md-4 card m-2 border border-2 rounded-3 shadow-sm" key={e._id}>
                                <p className="card-text">{e.pname}</p>
                                <p className="card-text">{e.price}</p>
                                <p className="card-text">{e.category}</p>
                                <div className="">
                                    <p className="btn btn-danger" onClick={()=>deleteProduct(e._id)}>Delete</p>
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    )
}

export default DeleteProduct