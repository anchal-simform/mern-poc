import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Products from "../../pages/products";

// Create a mock of the useRouter function
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const resetStore = jest.fn();
jest.mock("@apollo/client", () => ({
  useApolloClient: () => resetStore,
}));

describe("Products", () => {
  it("renders products and allows adding to the cart", () => {
    // Mock the products data for testing
    const productsList = [
      {
        id: 1,
        price: 10,
        thumbnail: "image1.jpg",
        title: "Product 1",
        description: "Description of Product 1",
      },
      // Add more product data as needed
    ];

    // Render the Products component with the mocked data and context
    render(<Products productsList={productsList} />);

    // Assertions for the rendered products
    productsList.forEach((product) => {
      const title = screen.getByText(product.title);
      const description = screen.getByText(product.description);
      const price = screen.getByText(`$${product.price}`);
      const addToCartButton = screen.getByText("Add to cart");

      // Your specific assertions here

      // Example assertion: Check if the product title is in the document
      expect(title).toBeInTheDocument();

      // Example assertion: Simulate clicking the "Add to cart" button
      fireEvent.click(addToCartButton);
    });
  });
});
