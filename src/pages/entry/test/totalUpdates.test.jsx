import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../context/OrderDetails";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("$6.00");
});

test("update topping subtotal changes when toppings are updated", async () => {
  render(<Options optionType="toppings" />);

  // Make sure the subtotal starts at $0.00
  const subtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(subtotal).toHaveTextContent("$0.00");

  // Select one of the toppings and make sure the value updates correctly.

  const hotFudgeInput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeInput);
  expect(subtotal).toHaveTextContent("1.50");

  // Select another topping and make sure the value updates correctly.
  const mAndMsInput = await screen.findByRole("checkbox", { name: "M&Ms" });
  userEvent.click(mAndMsInput);
  expect(subtotal).toHaveTextContent("3.00");

  // Unselect the first topping and make sure the value updates correctly.
  userEvent.click(hotFudgeInput);
  expect(subtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);

    //searching by heading role and search by name
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherryTopping = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    userEvent.click(cherryTopping);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    const cherryTopping = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    userEvent.click(cherryTopping);
    expect(grandTotal).toHaveTextContent("1.50");

    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });

    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, "3");
    expect(grandTotal).toHaveTextContent("7.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });
    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });
    const cherryTopping = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, "2");
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, "3");
    userEvent.click(cherryTopping);
    expect(grandTotal).toHaveTextContent("11.50");

    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, "2");
    expect(grandTotal).toHaveTextContent("9.50");

    userEvent.click(cherryTopping);
    expect(grandTotal).toHaveTextContent("8.00");
  });
});
