import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("Order phases for happy path", async () => {
  // render app
  render(<App />);

  // add scoops and toppings
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, "3");

  const cherryTopping = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherryTopping);

  const grandTotal = await screen.findByText(/grand total: \$/i);
  expect(grandTotal).toHaveTextContent("7.50");

  // submit order (this should go to Mock Service Worker)
  const submitButton = await screen.findByRole("button");
  userEvent.click(submitButton);

  // check that summary info is correct
  const pageTitle = await screen.findByRole("heading", {
    name: /order summary/i,
  });
  expect(pageTitle).toBeInTheDocument();

  const scoopTotal = await screen.findByRole("heading", {
    name: /scoops: \$/i,
  });
  expect(scoopTotal).toHaveTextContent("6.00");

  const toppingTotal = await screen.findByRole("heading", {
    name: /toppings: \$/i,
  });
  expect(toppingTotal).toHaveTextContent("1.50");

  const orderSummaryTotal = await screen.findByRole("heading", {
    name: /grand total: \$/i,
  });
  expect(orderSummaryTotal).toHaveTextContent("7.50");

  expect(screen.getByText("3 Vanilla")).toBeInTheDocument();
  expect(screen.queryByText(/chocolate/i)).not.toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and confirm order
  const agreementCheckbox = screen.getByRole("checkbox", {
    name: /i agree to/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();

  userEvent.click(agreementCheckbox);
  expect(confirmButton).toBeEnabled();
  userEvent.click(confirmButton);

  const loadingMessage = screen.getByText(/loading/i);
  expect(loadingMessage).toBeInTheDocument();

  const thankYouMessage = await screen.findByText(/thank you/i);
  expect(thankYouMessage).toBeInTheDocument();

  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

  // confirm that order number is given
  const thankYou = await screen.findByRole("heading", { name: /thank you/i });
  expect(thankYou).toBeInTheDocument();
  const orderNumber = await screen.findByText(/your order number is/i);
  expect(orderNumber).toHaveTextContent(/[0-9][0-9][0-9][0-9][0-9][0-9]+/i);

  // start a new order
  const createNewOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(createNewOrderButton);

  // make sure order page is reset
  const orderEntryTitle = await screen.findByRole("heading", {
    name: /design your sundae!/i,
  });
  expect(orderEntryTitle).toBeVisible();
  const newGrandTotal = await screen.findByRole("heading", {
    name: /grand total: \$/i,
  });
  expect(newGrandTotal).toHaveTextContent("$0.00");

  // what do we need to await to avoid test errors?
  await screen.findByRole("spinbutton", { name: /Vanilla/i });
  await screen.findByRole("checkbox", { name: /Cherries/i });
});

test("happy path making sure that toppings section does not show if no topping were chosen", async () => {
  render(<App />);

  // add scoops but not toppings
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, "3");

  const grandTotal = await screen.findByText(/grand total: \$/i);
  expect(grandTotal).toHaveTextContent("6.00");

  // submit order (this should go to Mock Service Worker)
  const submitButton = await screen.findByRole("button");
  userEvent.click(submitButton);

  // check that summary info is correct
  const pageTitle = await screen.findByRole("heading", {
    name: /order summary/i,
  });
  expect(pageTitle).toBeInTheDocument();

  const scoopTotal = await screen.findByRole("heading", {
    name: /scoops: \$/i,
  });
  expect(scoopTotal).toHaveTextContent("6.00");

  const noToppingTotal = screen.queryByRole("heading", {
    name: /toppings: \$/i,
  });
  expect(noToppingTotal).not.toBeInTheDocument();

  const orderSummaryTotal = await screen.findByRole("heading", {
    name: /grand total: \$/i,
  });
  expect(orderSummaryTotal).toHaveTextContent("6.00");
});
