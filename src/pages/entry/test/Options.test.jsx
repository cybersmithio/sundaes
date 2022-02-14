import {
  screen,
  render,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import {
  OrderDetailsProvider,
  useOrderDetails,
} from "../../../context/OrderDetails";
import userEvent from "@testing-library/user-event";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altTest = scoopImages.map((element) => element.alt);
  expect(altTest).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Displays images for each topping option from server", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altTest = toppingImages.map((element) => element.alt);
  expect(altTest).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("invalid scoop values do not update scoop total", async () => {
  render(<Options optionType="scoops" />);

  const vanillaScoops = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  const chocolateScoops = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  const scoopsTotal = await screen.findByText(/scoops total/i);

  expect(scoopsTotal).toBeInTheDocument();
  expect(vanillaScoops).toBeInTheDocument();
  expect(chocolateScoops).toBeInTheDocument();
  expect(scoopsTotal).toHaveTextContent(/\$0.00/i);

  userEvent.clear(chocolateScoops);
  userEvent.type(chocolateScoops, "-1");
  expect(scoopsTotal).toHaveTextContent(/\$0.00/i);

  userEvent.clear(chocolateScoops);
  userEvent.type(chocolateScoops, "0.5");
  expect(scoopsTotal).toHaveTextContent(/\$0.00/i);

  userEvent.clear(vanillaScoops);
  userEvent.type(vanillaScoops, "12");
  expect(scoopsTotal).toHaveTextContent(/\$0.00/i);
});
