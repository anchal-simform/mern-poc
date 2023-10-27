import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useCartState } from "../app/store/cart";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Loader } from "../app/components/Loader";
import HeaderDropdown from "../app/components/HeaderDropdown";


const ORDER = gql`
  mutation Order($products: [ProductInput], $total: Float) {
    order(products: $products, total: $total) {
      total
      products {
        id
        title
        description
        thumbnail
        buyQty
      }
    }
  }
`;

export default function Cart() {
  const router = useRouter();
  const client = useApolloClient();

  const { cartProducts, removeProductFromCart } = useCartState();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [order, { data, loading, error }] = useMutation(ORDER);

  const handlePlaceOrder = async () => {
    await order({
      variables: {
        products: cartProducts,
        total: cartProducts?.reduce(
          (accumulator: number, currentProduct: any) => {
            return accumulator + currentProduct.buyQty * currentProduct.price;
          },
          0
        ),
      },
    });
    setPaymentSuccess(true);
  };

  if (loading) {
    return <Loader />;
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-500">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-lg text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="mx-auto text-green-500 h-20 w-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800 mt-6">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-4">
            Thank you for your order. Your payment has been successfully
            processed.
          </p>
          <button
            onClick={() => {
              router.push(`/products`);
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 mt-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="selection:bg-rose-500 selection:text-white bg-rose-100 p-5">
      <HeaderDropdown />

      <div
        className="bg-rose-500 fixed right-0 top-4 inline-flex items-center mr-20 px-4 py-2 rounded-lg cursor-pointer"
        onClick={() => {
          client.resetStore();
          localStorage.removeItem("token");
          router.push("/");
        }}
      >
        Logout
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 text-center">
        Shopping Cart
        <Link
          className="inline-block ml-5 text-center text-sm font-medium text-rose-600 underline hover:bg-rose-100 px-2 py-0.5 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"
          href="/products"
        >
          Shop more
        </Link>
      </h1>
      {cartProducts.length === 0 ? (
        <div className="min-h-screen bg-rose-100 p-10">
          <div className="flex justify-center gap-4">
            <p>Your cart is empty.</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-rose-100 p-10">
          <div className="flex justify-center gap-10 flex-wrap">
            {cartProducts.map((product: any) => (
              <div
                key={product.id}
                className="bg-white rounded shadow-md px-3 py-4 text-center relative w-1/4"
              >
                <div className="h-32 m-auto mb-5">
                  <img
                    src={product?.thumbnail}
                    alt={product?.title}
                    className="h-full inline-block"
                  />
                </div>
                <h2 className="text-lg font-semibold truncate">
                  {product.title}
                </h2>
                <p className="text-gray-700 truncate-lines-2">
                  {product.description}
                </p>
                <p className="text-rose-500 font-semibold mt-2">
                  ${product.price} - {product.buyQty} qty
                </p>
                <p
                  className="inline-block cursor-pointer text-rose-500 font-semibold mt-2 underline hover:bg-rose-100 px-3 py-1 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"
                  onClick={() => removeProductFromCart(product?.id)}
                >
                  Remove
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button
              data-testid="place-order"
              onClick={handlePlaceOrder}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in transform hover:scale-105 focus:outline-none"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
