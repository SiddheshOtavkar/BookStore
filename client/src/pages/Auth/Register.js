import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [role, setRole] = useState("1-Admin/2-User");
    const navigate = useNavigate();
    
    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                {
                    name,
                    email,
                    password,
                    phone,
                    address,
                    answer,
                    role
                }
            );
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Register - Ecommerce app"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Registration Page</h4>
                    <div className="mb-3">
                        <input
                            placeholder="Enter Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            placeholder="Enter Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            placeholder="Enter Phone Number"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail3"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            placeholder="Enter Address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail4"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            placeholder="Enter Your Mother's Name"
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail5"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            placeholder="Enter Your Role"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail6"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            placeholder="Enter Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword7"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
