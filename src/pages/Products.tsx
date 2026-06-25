import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

interface Product {
  _id: string;
  name: string;
  sku: string;
  salePrice: number;
  stock: number;
}

export default function Products() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      console.log("PRODUCTS:", res.data);

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (
        Array.isArray(res.data.products)
      ) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Products
        </h1>

        {loading && (
          <p>Loading...</p>
        )}

        {!loading &&
          products.length === 0 && (
            <p>
              No products found
            </p>
          )}

        <div className="grid md:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-xl p-5"
            >
              <h2 className="font-bold text-lg">
                {product.name}
              </h2>

              <p>
                SKU: {product.sku}
              </p>

              <p>
                Price: $
                {product.salePrice}
              </p>

              <p>
                Stock: {product.stock}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}