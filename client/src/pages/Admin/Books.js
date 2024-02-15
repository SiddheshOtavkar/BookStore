import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);

    //get all books
    const getAllBooks = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/book/get-book`);
            setBooks(data.books);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Books List</h1>
                    <div className="d-flex">
                        {books?.map((p) => (
                            <Link
                                key={p._id}
                                to={`/dashboard/admin/book/${p.slug}`}
                                className="product-link"
                            >
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/book/book-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Books;
