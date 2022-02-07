import { screen, render, waitFor } from "../../../test-utils/testing-library-utils";

import Options from "../Options";
import { OrderDetailsProvider } from '../../../context/OrderDetails';

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
  render(<Options optionType="toppings" />, {wrapper: OrderDetailsProvider});

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
