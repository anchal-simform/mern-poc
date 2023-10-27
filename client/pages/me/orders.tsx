"use client";

import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import HeaderDropdown from "app/components/HeaderDropdown";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loader } from "../../app/components/Loader";
import { isAuthenticated } from "../../utils";

const MY_ORDERS = gql`
  query Query {
    myOrders {
      _id
      products {
        id
        price
        thumbnail
        title
        description
        buyQty
      }
      total
      userId
    }
  }
`;

export default function MyProfile() {
  const router = useRouter();
  const [getData, { loading, error, data }] = useLazyQuery(MY_ORDERS);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/");
    } else {
      getData();
    }
  }, []);

  const orders = data?.myOrders;
  if (loading) return <Loader />;
  if (error) return <div>Submission error! ${error.message}</div>;

  return (
    <div className="selection:bg-rose-500 selection:text-white">
      <div className="flex min-h-screen items-center justify-center bg-rose-100">
        <HeaderDropdown />
        <div className="flex-1 py-5">
          <div className="mx-auto w-1/2 overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="rounded-tr-4xl bg-white px-10 py-14">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                My Orders
              </h1>
              {(orders || [])?.map((order: any) => (
                <div className="border-4 border-rose-300 rounded mb-2">
                  <p className="text-center mt-1">OrderId - {order?._id}</p>
                  {order?.products.map((product: any, idx) => (
                    <div
                      key={product?.id}
                      className="bg-white rounded shadow-md px-3 py-4 text-center relative"
                    >
                      <div className="h-32 m-auto">
                        <img
                          src={product?.thumbnail}
                          alt={product?.title}
                          className="h-full inline-block"
                        />
                      </div>
                      <h2 className="text-lg font-semibold truncate">
                        {product?.title}
                      </h2>
                      <p className="text-rose-500 font-semibold mt-2">
                        ${product?.price} (Qty - {product?.buyQty})
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
