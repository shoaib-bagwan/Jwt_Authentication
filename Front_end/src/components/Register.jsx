import axios from 'axios';
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextApi } from './ContextApi';

export default function Register() {
    const navigate=useNavigate();
    const apiUrl=useContext(ContextApi);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const get = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        try{
            const res=await axios.post(`${apiUrl}/api/user/register`,formData)
            console.log(res.data);
            setFormData({
            name: "",
            email: "",
            password: ""
        });
        alert("register successfully");

        }catch(e){
            alert("Network error")
            console.log(e);
        }
        
    }
    return (
        <div className='container mt-5'>
            <h1 className="text-center">Registration Form</h1><br />
            <form action="" className="d-flex flex-column gap-4" onSubmit={submitHandler}>
                <input type="text" name="name" id="name" placeholder="Enter your Name" className="form-control" onChange={get} />
                <input type="email" name="email" id="email" placeholder="Enter your Email" className="form-control" onChange={get} />
                <input type="password" name="password" id="password" placeholder="Enter your Password" className="form-control" onChange={get} />
                <input type="submit" name="sub" id="" value="Register" className="btn btn-primary" />
                <p>Already register <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}
