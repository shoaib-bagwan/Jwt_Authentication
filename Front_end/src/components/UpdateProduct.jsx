import axios from "axios";
import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { ContextApi } from "./ContextApi";
function UpdateProduct() {
    const [openForm, setOpenForm] = useState(false);
    const [pData, setPData] = useState({
        pname: "",
        price: "",
        category: ""
    });
    const [selectedId, setId] = useState();

    const { apiUrl, fetchProducts, product } = useContext(ContextApi);
    const UpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/api/product/update-product/${selectedId}`, pData)
            console.log(res.data);
            alert("Product Updated Successfully")
            fetchProducts();
            setPData({
                pname: "",
                price: "",
                category: ""
            })
        } catch (error) {
            alert("Network error");
            console.log(error)
        }
    }
    const fetchProductById = async (id) => {
        try {
            const res = await axios.get(`${apiUrl}/api/product/fetch-product/${id}`);
            console.log(res.data);
            setPData(res.data.product);
            setId(res.data.product._id)
        } catch (error) {
            console.log(error);
            alert("network error")
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div className="container">
            <h1 className="text-center">Update Product</h1>
            <div className="row justify-content-md-center">

                {
                    product.map(e => {
                        return (
                            <div className="col-lg-2 col-sm-6 col-md-4 card m-2 border border-2 rounded-3 shadow-sm" key={e._id}>
                                <p className="card-text">{e.pname}</p>
                                <p className="card-text">{e.price}</p>
                                <p className="card-text">{e.category}</p>
                                <div className="">
                                    <p className="btn btn-success" onClick={() => { fetchProductById(e._id); setOpenForm(true) }}>Update</p>
                                </div>
                            </div>
                        );
                    })
                }
                {openForm &&
                    (
                        <>
                            <form action="" onSubmit={UpdateProduct} className="d-flex flex-column gap-3">
                                <input type="text" name="pname" id="pname" onChange={(e) => { setPData({ ...pData, pname: e.target.value }) }} value={pData.pname} placeholder={pData.pname} className="form-control" />
                                <input type="text" name="price" id="price" onChange={(e) => { setPData({ ...pData, price: e.target.value }) }} value={pData.price} placeholder={product.price} className="form-control" />
                                <input type="text" name="category" id="category" onChange={(e) => { setPData({ ...pData, category: e.target.value }) }} value={pData.category} placeholder={product.category} className="form-control" />
                                <input type="submit" name="" id="sub" />
                            </form>
                        </>
                    )}

            </div>
        </div>
    )
}

export default UpdateProduct