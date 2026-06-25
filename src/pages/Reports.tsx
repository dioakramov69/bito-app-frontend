import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Reports() {
  const [report, setReport] =
    useState<any>(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    const res = await api.get(
      "/reports/sales?from=2020-01-01&to=2030-01-01"
    );

    setReport(res.data);
  };

  if (!report)
    return (
      <>
        <Navbar />
        Loading...
      </>
    );

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Sales Report
        </h1>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white shadow p-5 rounded-xl">
            <h2 className="font-semibold">
              Revenue
            </h2>

            <p className="text-4xl font-bold">
              $
              {
                report.totals?.[0]
                  ?.totalRevenue
              }
            </p>
          </div>

          <div className="bg-white shadow p-5 rounded-xl">
            <h2 className="font-semibold">
              Margin
            </h2>

            <p className="text-4xl font-bold">
              $
              {
                report.totals?.[0]
                  ?.totalMargin
              }
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="font-bold text-xl mb-4">
            Top Products
          </h2>

          {report.topProducts?.map(
            (product: any) => (
              <div
                key={product._id}
                className="flex justify-between py-2 border-b"
              >
                <span>
                  {product._id}
                </span>

                <span>
                  {product.quantity}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}