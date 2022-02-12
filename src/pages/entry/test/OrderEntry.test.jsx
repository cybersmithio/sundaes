import {
  screen,
  render,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";
import {
  OrderDetailsProvider,
  useOrderDetails,
} from "../../../context/OrderDetails";

test("handles errors for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />, {
    wrapper: OrderDetailsProvider,
  });

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("Check that no scoops will disable order button", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />, {
    wrapper: OrderDetailsProvider,
  });

  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  const vanillaScoops = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaScoops);
  userEvent.type(vanillaScoops, "2");
  expect(orderButton).toBeEnabled();

  userEvent.clear(vanillaScoops);
  userEvent.type(vanillaScoops, "0");
  expect(orderButton).toBeDisabled();
});
