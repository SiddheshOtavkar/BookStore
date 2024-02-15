import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SemesterBook = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [semester, setSemester] = useState([]);

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
    }, [params?.slug]);

    const getPrductsByCat = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/book/book-semester/${params.slug}`
            );
            setBooks(data?.books);
            setSemester(data?.semester);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mt-3">
                <h4 className="text-center">Category - {semester?.name}</h4>
                <h6 className="text-center">{books?.length} result found </h6>
                <div className="row">
                    <div className="col-md-9 offset-1">
                        <div className="d-flex flex-wrap">
                            {books?.map((p) => (
                                <div
                                    className="card m-2"
                                    style={{ width: "18rem" }}
                                    key={p._id}
                                >
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
                                        <p className="card-text"> $ {p.price}</p>
                                        <button
                                            className="btn btn-primary ms-1"
                                            onClick={() => navigate(`/book/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
                                        <button className="btn btn-secondary ms-1">
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div className="m-2 p-3">
            {products && products.length < total && (
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
          </div> */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SemesterBook;