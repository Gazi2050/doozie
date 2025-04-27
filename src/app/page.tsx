"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    // e.preventDefault();
    setLoading(true);

    const postData = {
      rakuten_query_parameters: {
        keyword: "shirt",
        sort: "-itemPrice",
        hits: 20,
        condition: 1,
        imageFlag: 1,
        shipOverseasFlag: 1,
        shipOverseasArea: "US"
      },
      yahoo_query_parameters: {
        query: "shirt",
        results: 20,
        in_stock: true,
        is_discounted: false,
        sort: "-price",
        condition: 1,
        delivery_area: "13",
        delivery_day: 0,
        delivery_deadline: 24
      },
      from_scheduler: false
    };

    try {
      const res = await fetch('https://api.doozie.shop/v1/items/search', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const json = await res.json();
      setData(json);
      console.log(json);
    } catch (err) {
      console.error('Fetch error', err);
    }

    setLoading(false);
  };
  useEffect(() => {
    handleFetch()
  }, [])
  return (
    <ProductCard loading={loading} product={data} />
  );
};

export default Page;