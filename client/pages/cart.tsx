import { useCartState } from "app/store/cart";
import Link from "next/link";

export default function Cart() {
  const { cartProducts, removeProductFromCart } = useCartState();

  return (
    <div className="selection:bg-rose-500 selection:text-white bg-rose-100 p-5">
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
        </div>
      )}
    </div>
  );
}
