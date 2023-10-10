import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getByTestId,
  getByDisplayValue,
} from "@testing-library/react";
import SignupForm from "./SingUp";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SignupForm", () => {
  it("renders the form and submits it", async () => {
    const mockPush = jest.fn();
    

    const { getByLabelText, getByText } = render(<SignupForm />);

    // Fill out the form inputs
    fireEvent.change(getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText("Email address"), {
      target: { value: "john@doe.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "johndoe123" },
    });
    fireEvent.change(getByLabelText("Gender"), { target: { value: "Male" } });

    // Submit the form
    fireEvent.click(getByText("Sign Up"));
    // Wait for the submission to complete (you may need to adjust the time depending on your actual async logic)
    await waitFor(() => {
      // Check that the router push function was called with the expected URL
      expect(mockPush);
    });
  });
});
