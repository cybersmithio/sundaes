import { screen, render } from "@testing-library/react";
import OrderConfirmation from "../OrderConfirmation.jsx";
import { OrderDetailsProvider } from "../../../context/OrderDetails";

test("Confirm Loading message appears and disappears for order confirmation", async () => {
  render(<OrderConfirmation setOrderPhase={jest.fn()} />, {
    wrapper: OrderDetailsProvider,
  });

  const loadingMessage = await screen.findByText(/loading/i);
  expect(loadingMessage).toBeInTheDocument();

  const thankYouMessage = await screen.findByText(/thank you/i);
  expect(thankYouMessage).toBeInTheDocument();

  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
