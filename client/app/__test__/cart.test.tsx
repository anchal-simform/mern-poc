import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import Cart from "../../pages/cart";

// Mock the useRouter function
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the useMutation function
jest.mock("@apollo/client", () => ({
  gql: jest.fn(),
  useMutation: () => ({
    data: null,
    loading: false,
    error: null,
  }),
}));

const mockOrder = jest.fn();
jest.mock("@apollo/client", () => ({
  gql: jest.fn(),
  useMutation: () => [mockOrder, { data: null, loading: false, error: null }],
}));

describe("Cart", () => {
  it("renders an empty cart message when there are no products in the cart", () => {
    jest.mock("../store/cart", () => ({
      useCartState: () => ({
        cartProducts: [],
        removeProductFromCart: jest.fn(),
      }),
    }));
    // Render the Cart component with an empty cart
    render(<Cart />);

    // Assertions
    const emptyCartMessage = screen.getByText("Your cart is empty.");
    expect(emptyCartMessage).toBeInTheDocument();
  });

  it("Check data available for function when 'Place Order' button is clicked", async () => {
    // Mock the useCartState context
    jest.mock("@apollo/client", () => ({
      gql: jest.fn(),
      useMutation: () => ({
        data: null,
        loading: false,
        error: null,
        called: false,
        order: jest.fn(),
      }),
    }));

    jest.mock("../store/cart", () => ({
      useCartState: () => ({
        cartProducts: [
          {
            id: 1,
            price: 10,
            thumbnail: "image1.jpg",
            title: "Product 1",
            description: "Description of Product 1",
          },
        ],
        removeProductFromCart: jest.fn(),
      }),
    }));

    // Render the Cart component
    render(<Cart />);
  });
});
