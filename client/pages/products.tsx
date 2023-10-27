import { useState } from "react";
import update from "immutability-helper";
import { useCartState } from "../app/store/cart";
import { useRouter } from "next/router";

export default function Products({ productsList }: any) {
  if (!Array.isArray(productsList)) {
    // Handle the case where products is not an array, e.g., display an error message
    return (
      <div>
        <p>Error: Products data is not available.</p>
      </div>
    );
  }
  productsList.forEach((product) => {
    product.buyQty = 1;
  });
  const router = useRouter();
  const [products, setProducts] = useState(productsList);
  const { cartProducts, addProductToCart } = useCartState();

  return (
    <div className="selection:bg-rose-500 selection:text-white bg-rose-100">
      <div className="flex justify-end pt-2">
        <div
          className="fixed inline-flex items-center mr-8 cursor-pointer"
          onClick={() => {
            router.push(`/cart`);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l3.7 13.6a2 2 0 0 0 1.9 1.4h8.8a2 2 0 0 0 1.9-1.4L23 6H6" />
          </svg>
          <span className="absolute -top-1 -right-2 bg-rose-500 text-white rounded-full px-2 py-1 text-xs">
            {cartProducts?.length || 0}
          </span>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center bg-rose-100 p-10">
        <div className="container mx-auto">
          {/* Product Listing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, idx) => (
              <div
                key={product?.id}
                className="bg-white rounded shadow-md px-3 py-4 text-center relative"
              >
                <div className="h-32 m-auto mb-5">
                  <img
                    src={product?.thumbnail}
                    alt={product?.title}
                    className="h-full inline-block"
                  />
                </div>
                <h2 className="text-lg font-semibold truncate">
                  {product?.title}
                </h2>
                <p className="text-gray-700 truncate-lines-2">
                  {product?.description}
                </p>
                <p className="text-rose-500 font-semibold mt-2">
                  ${product?.price}
                </p>
                <div className="flex mt-2 justify-center">
                  <button
                    className="px-4 py-1 bg-rose-500 text-white rounded-l"
                    onClick={() => {
                      setProducts(
                        update(products, {
                          [idx]: {
                            buyQty: {
                              $set: product.buyQty > 0 ? product.buyQty - 1 : 0,
                            },
                          },
                        })
                      );
                    }}
                  >
                    -
                  </button>
                  <input
                    className="pl-4 py-1 border border-gray-300 text-gray-700 w-10"
                    value={product?.buyQty}
                    min={1}
                    max={99}
                    onChange={({ target }) => {
                      setProducts(
                        update(products, {
                          [idx]: {
                            buyQty: {
                              $set:
                                Number(target?.value) > 0 &&
                                Number(target?.value) <= 99
                                  ? Number(target?.value)
                                  : product.buyQty,
                            },
                          },
                        })
                      );
                    }}
                    type="number"
                  />

                  <button
                    className="px-4 py-1 bg-rose-500 text-white rounded-r"
                    onClick={() => {
                      setProducts(
                        update(products, {
                          [idx]: {
                            buyQty: {
                              $set:
                                product.buyQty < 99
                                  ? product.buyQty + 1
                                  : product.buyQty,
                            },
                          },
                        })
                      );
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="px-4 py-1 border-2 border-rose-500 bg-rose-100 hover:bg-rose-500 hover:text-white text-black rounded mt-2"
                  onClick={() => {
                    addProductToCart(product);
                  }}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch data from the API
    const resData = await fetch("https://dummyjson.com/products");

    if (!resData.ok) {
      throw new Error("API request failed");
    }

    const res = await resData.json();
    if (!Array.isArray(res?.products)) {
      throw new Error("API response is not an array");
    }

    return {
      props: {
        productsList:
          res?.products?.map((pd: any) => ({
            id: pd.id,
            price: pd.price,
            thumbnail: pd.thumbnail,
            title: pd.title,
            description: pd.description,
          })) || [],
      },
    };
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return {
      props: {
        productsList: [],
        error: error.message, // Pass the error message to the component
      },
    };
  }
}
