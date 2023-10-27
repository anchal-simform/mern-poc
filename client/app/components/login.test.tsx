import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginForm, { LOGIN } from "./Login";
import { MockedProvider } from "@apollo/client/testing";

// Mock useRouter from next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("LoginForm", () => {
  it("renders the form and handles GraphQL mutation", async () => {
    const mocks = [
      {
        request: {
          query: LOGIN,
          variables: {
            email: "john@example.com",
            password: "securepassword",
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginForm />
      </MockedProvider>
    );

    // Find form elements
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Sign In");

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "securepassword" } });

    // Check if the form fields have been updated
    expect(emailInput.value).toBe("john@example.com");
    expect(passwordInput.value).toBe("securepassword");

    // Submit the form
    fireEvent.click(submitButton);
  });
});
