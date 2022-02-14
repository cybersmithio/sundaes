import { server } from "../../../mocks/server";
import { screen, render } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation.jsx";
import { rest } from "msw";

test("Confirm error message when order number cannot be loaded", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/orders", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alertMessage = await screen.findByRole("alert");

  expect(alertMessage).toHaveTextContent(
    "An unexpected error occurred. Please try again later."
  );
});
