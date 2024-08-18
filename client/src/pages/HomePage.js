import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all semester
    const getAllSemester = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/semester/get-semester`
            );
            if (data?.success) {
                setSemesters(data?.semester);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllSemester();
        getTotal();
    }, []);

    //get books
    const getAllBooks = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/book/book-list/${page}`
            ); 
            setLoading(false);
            setBooks(data.books);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTotal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/book/book-count`
            );
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/book/book-list/${page}`
            );
            setLoading(false);
            setBooks([...books, ...data?.books]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by semester
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllBooks();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/book/book-filters`,
                {
                    checked,
                    radio,
                }
            );
            setBooks(data?.books);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={"All Products - Best offers "}>
            <div className="container-fluid row mt-3">
                <div className="col-md-2">
                    <h4 className="text-center">Filter By Semester</h4>
                    <div className="d-flex flex-column">
                        {semesters?.map((c) => (
                            <Checkbox
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    {/* price filter */}
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9 offset-1">
                    <h1 className="text-center">All Books</h1>
                    <div className="d-flex flex-wrap">
                        {books?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img
                                    src={`${process.env.REACT_APP_API}/api/v1/book/book-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text"> ₹ {p.price}</p>
                                    <button
                                        className="btn btn-primary ms-1"
                                        onClick={() => navigate(`/book/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button
                                        className="btn btn-secondary ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success("Item Added to cart");
                                        }}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {books && books.length < total && (
                            <button
                                className="btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;