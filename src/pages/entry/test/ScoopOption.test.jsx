import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOptions from "../ScoopOption";

test("that box is invalid if scoop value is invalid", () => {
  render(
    <ScoopOptions
      name="vanilla"
      imagePath="vanillaImage"
      updateItemCount={jest.fn()}
    />
  );

  //screen.debug();
  const scoopCount = screen.getByRole("spinbutton", {
    name: /vanilla/i,
  });

  expect(scoopCount).not.toHaveClass("is-invalid");
  userEvent.clear(scoopCount);
  userEvent.type(scoopCount, "1");
  expect(scoopCount).not.toHaveClass("is-invalid");

  userEvent.clear(scoopCount);
  userEvent.type(scoopCount, "-1");
  expect(scoopCount).toHaveClass("is-invalid");

  userEvent.clear(scoopCount);
  userEvent.type(scoopCount, "0.5");
  expect(scoopCount).toHaveClass("is-invalid");

  userEvent.clear(scoopCount);
  userEvent.type(scoopCount, "11");
  expect(scoopCount).toHaveClass("is-invalid");

  userEvent.clear(scoopCount);
  userEvent.type(scoopCount, "1");
  expect(scoopCount).not.toHaveClass("is-invalid");
});
