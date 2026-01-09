import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ContextApi } from "./ContextApi";

function Dashboard() {
    const [productStatus, setProductStatus] = useState();
    const [searchProduct,setSearchProduct]=useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pname: "",
        price: "",
        category: ""
    });
    const [search, setSearch] = useState();
    const { apiUrl, fetchProducts, product, } = useContext(ContextApi);


    const get = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    }
    const addDataToForm = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`/api/product/add-product`, formData);
            console.log(res.data);
            alert("product added successfully");
            setFormData({
                pname: "",
                price: "",
                category: ""
            })
        }
        catch (e) {
            alert("network alert")
            console.log(e)
        }
    }
    const fetchProfile = async () => {
        try {
            const res = await api.get("/api/user/profile");
            console.log(res.data)
        } catch (e) {
            alert("error while authentication")
            console.log(e);
        }
    }
    const searchHandler = async (e) => {
        e.preventDefault()
        try {
            console.log(search)
            if (!search) alert("please enter the category");

                const res = await axios.get(`${apiUrl}/api/product/fetch-product/category/${search}`);
                if(res.data.length==0){
                    alert("no category found")
                }
                console.log(res.data);
                setSearchProduct(res.data.product)
                setProductStatus("searchData");
            
        } catch (error) {
            console.log(error);
            alert("network Error")
        }
    }

    useEffect(() => {
        fetchProfile();
        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h1 className="mt-5 text-center">Welcome to my project</h1>
            <form action="" className="d-flex flex-row justify-content-around" onSubmit={searchHandler}>
                <input type="text" name="search" id="search" className="w-100 form-control border border-primary" placeholder="Search Product By Category" onChange={(e) => setSearch(e.target.value)} />
                <input type="submit" name="" id="sub" value="Search" className="btn btn-success ms-2" />
            </form>
            <div className="d-flex flex-column gap-3 mt-4">
                <button
                    className="btn btn-success"
                    onClick={() => setProductStatus("addProduct")}
                >
                    Add Products
                </button>
                <button className="btn btn-success"
                    onClick={() => { setProductStatus("deleteProduct"); navigate('/delete-product') }
                    }
                >Delete Products</button>
                <button className="btn btn-success"
                    onClick={() => { setProductStatus("updateProduct"); navigate('/update-product') }}
                >Update Products</button>
                <button className="btn btn-success"
                    onClick={() => { setProductStatus("viewProduct") }}
                >View all Products</button>
            </div>


            {productStatus === 'addProduct' && (
                <form className="mt-5 d-flex flex-column gap-3 w-50 border border-3 shadow-lg p-4" onSubmit={addDataToForm}>
                    <input
                        type="text"
                        name="pname"
                        placeholder="Enter product name"
                        onChange={get}
                        className="form-control border border-2"
                    />
                    <input
                        type="text"
                        name="price"
                        onChange={get}
                        placeholder="Enter product price"
                        className="form-control border border-2"
                    />
                    <input
                        type="text"
                        name="category"
                        onChange={get}
                        placeholder="Enter product category"
                        className="form-control border border-2"
                    />
                    <input type="submit" name="sub" id="sub" className="btn btn-success" value="Submit" />
                </form>
            )
            }

            {productStatus === 'viewProduct' && (
                <div className="mt-5">
                    {product.length > 0 ? (
                        product.map((e) => (
                            <div
                                key={e._id}
                                className="border p-3 mb-3 shadow-sm"
                            >
                                <p><b>Name:</b> {e.pname}</p>
                                <p><b>Price:</b> {e.price}</p>
                                <p><b>Category:</b> {e.category}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-4">
                            No products found
                        </p>
                    )}
                </div>
            )}
            
            {productStatus === 'searchData' && (
                <div className="mt-5">
                    {searchProduct.length > 0 ? (
                        searchProduct.map((e) => (
                            <div
                                key={e._id}
                                className="border p-3 mb-3 shadow-sm"
                            >
                                <p><b>Name:</b> {e.pname}</p>
                                <p><b>Price:</b> {e.price}</p>
                                <p><b>Category:</b> {e.category}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-4">
                            No products found
                        </p>
                    )}
                </div>
            )}


        </div>
    );
}

export default Dashboard;
