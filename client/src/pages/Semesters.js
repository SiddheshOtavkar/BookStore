import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useSemester from "../hooks/useSemester";

const Semesters = () => {
  const semesters = useSemester();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {semesters.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/semester/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Semesters;