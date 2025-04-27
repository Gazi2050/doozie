"use client";
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/items', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const json = await res.json();
      setData(json);
      // console.log(json);
    } catch (err) {
      console.error('Fetch error', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="p-4">
      <ProductCard loading={loading} product={data} />
    </div>
  );
};

export default Page;
