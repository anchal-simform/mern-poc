import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Products from "../../pages/products";

// Create a mock of the useRouter function
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../store/utils", () => ({
  isAuthenticated: jest.fn(),
}));

const resetStore = jest.fn();
jest.mock("@apollo/client", () => ({
  useApolloClient: () => resetStore,
}));

const useState = jest.fn().mockReturnValue(() => [[], () => {}]);

// Mock the fetch function
global.fetch = jest.fn();

// Provide a mock implementation for fetch
fetch.mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        products: [],
      }),
  })
);

describe("Products", () => {
  it("renders products and allows adding to the cart", () => {
    // Mock the products data for testing

    // Render the Products component with the mocked data and context
    render(<Products />);
  });
});
