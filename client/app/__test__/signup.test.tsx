import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SignupForm, { SIGNUP } from "../components/SignUp"; // Import your component
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";

// Mock useRouter from next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: SIGNUP,
      variables: {
        // Define your variables here based on the mutation's structure
      },
    },
    result: {
      data: {
        // Define the expected result data here
      },
    },
  },
];

describe("SignupForm", () => {
  it("renders the form and validates user input", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupForm />
      </MockedProvider>
    );

    // Find form elements
    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const usernameInput = screen.getByLabelText("Username");
    const genderInput = screen.getByLabelText("Gender");
    const submitButton = screen.getByTestId("submit-btn");

    // Simulate user input
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "securepassword" } });
    fireEvent.change(usernameInput, { target: { value: "johndoe123" } });
    fireEvent.change(genderInput, { target: { value: "Male" } });

    // Check if the form fields have been updated
    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(passwordInput.value).toBe("securepassword");
    expect(usernameInput.value).toBe("johndoe123");
    expect(genderInput.value).toBe("Male");

    // Submit the form
    fireEvent.click(submitButton);

    // Validate that the form was submitted correctly (you can adjust this as per your actual implementation)
    // For example, you can check for the presence of a loading spinner or a success message
  });
});
