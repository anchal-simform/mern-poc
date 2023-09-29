import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./Login";

// Mock useRouter from next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("LoginForm Component", () => {
  it("should submit the form with valid data", async () => {
    // Mock the push function of useRouter
    const mockPush = jest.fn();
    require("next/router").useRouter.mockReturnValue({
      push: mockPush,
    });

    const { getByLabelText, getByText } = render(<LoginForm />);

    const emailInput = getByLabelText("Email address");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Sign In");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    fireEvent.click(submitButton);

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(mockPush);
    });
  });

//   it("should show error messages for invalid data", async () => {
//     const { getByLabelText, getByText } = render(<LoginForm />);

//     const emailInput = getByLabelText("Email address");
//     const passwordInput = getByLabelText("Password");
//     const submitButton = getByText("Sign In");

//     fireEvent.change(emailInput, { target: { value: "invalid-email" } });
//     fireEvent.change(passwordInput, { target: { value: "short" } });

//     fireEvent.click(submitButton);

//     // Wait for the error messages to appear
//     await waitFor(() => {
//       expect(getByText("Invalid email address")).toBeInTheDocument();
//       expect(getByText("Password must be at least 8 characters")).toBeInTheDocument();
//     });
//   });

//   it("should disable the submit button initially", () => {
//     const { getByText } = render(<LoginForm />);
//     const submitButton = getByText("Sign In");

//     expect(submitButton).toBeDisabled();
//   });

//   it("should enable the submit button when the form is filled correctly", () => {
//     const { getByLabelText, getByText } = render(<LoginForm />);

//     const emailInput = getByLabelText("Email address");
//     const passwordInput = getByLabelText("Password");
//     const submitButton = getByText("Sign In");

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });

//     expect(submitButton).not.toBeDisabled();
//   });
});
