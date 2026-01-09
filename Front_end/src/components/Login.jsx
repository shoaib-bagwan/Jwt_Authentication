
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextApi } from './ContextApi';

function Login() {
    const navigate=useNavigate();
    const {apiUrl} = useContext(ContextApi);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const get = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${apiUrl}/api/user/login`, formData)
            console.log(res.data);
            localStorage.setItem("token",res.data.token)
            setFormData({
                email: "",
                password: ""
            });
            alert("Login Successfully");
            navigate('/dashboard')

        } catch (e) {
            alert("Network error")
            console.log(e);
        }
    }
    useEffect(()=>{
            console.log(apiUrl);
        },[])
    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Login Form </h1>
            <form action="" className='d-flex flex-column gap-3' onSubmit={submitHandler}>
                <input type="email" name="email" id="email" placeholder='Enter your email' className="form-control" onChange={get} />
                <input type="password" name="password" id="pas" placeholder='Enter your password' className="form-control" onChange={get} />
                <p className="ms-5">New User ? <Link to='/register'>Register</Link></p>
                <input type="submit" name="sub" id="sub" value="Login" className="btn btn-success" />
            </form>
        </div>
    )
}

export default Login