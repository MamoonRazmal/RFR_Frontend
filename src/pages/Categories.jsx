import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
//import Categories from './Categories';

const Categories = () => {
  const Categories = useCategory();
  return (
    <Layout title={"All categories"}>
      <div className="container">
        <div className="row">
          {Categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
