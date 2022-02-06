import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

// Test and code checkbox / button
//    Test checkbox is unchecked by default
//    Test checking checkbox enables button
//    Test unchecking checkbox again disables button
//  Render <SummaryForm />
describe("Test T&C's checkbox and confirmation button", () => {
  test("'I agree' checkbox is unchecked to start", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole("button", {
      name: /confirm order/i,
    });
    expect(button).toBeDisabled();
  });

  test("Checking the 'I agree' checkbox will enable the button", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", {
      name: /confirm order/i,
    });

    userEvent.click(checkbox);
    expect(button).toBeEnabled();
  });

  test("Unchecking the 'I agree' checkbox will disable the order confirmation button", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", {
      name: /confirm order/i,
    });

    userEvent.click(checkbox);
    expect(button).toBeEnabled();
    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});

test("popover response to hover", async () => {
  render(<SummaryForm />);
  // popover is hidden to start
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
