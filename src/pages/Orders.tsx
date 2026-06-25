import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

interface Product {
  _id: string;
  name: string;
}

export default function Orders() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");

      console.log(
        "PRODUCT RESPONSE:",
        res.data
      );

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

  const createOrder = async () => {
    try {
      if (!productId) {
        alert("Select product");
        return;
      }

      const res = await api.post(
        "/orders",
        {
          items: [
            {
              productId,
              quantity,
            },
          ],
        }
      );

      console.log(res.data);

      alert("Order created");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Order creation failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-5">
          New Order
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <select
              className="border w-full p-2 rounded mb-4"
              value={productId}
              onChange={(e) =>
                setProductId(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Product
              </option>

              {products.map((p) => (
                <option
                  key={p._id}
                  value={p._id}
                >
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(
                    e.target.value
                  )
                )
              }
              className="border p-2 w-full rounded mb-4"
            />

            <button
              onClick={createOrder}
              className="bg-black text-white px-5 py-2 rounded"
            >
              Create Order
            </button>
          </>
        )}
      </div>
    </>
  );
}