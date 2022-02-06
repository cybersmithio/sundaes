import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scoop option from server", () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt test of images
  const altTest = scoopImages.map((element) => element.alt);
  expect(altTest).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
