import {render, screen} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { OrderDetailsProvider } from '../../../context/OrderDetails';

test('update scoop subtotal when scoops change', async() => {
    render(<Options optionType="scoops" />);

    // make sure total starts out at $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', {exact: false});
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent("2.00");

    // update chocolate scoops to 2 and check the subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {name: "Chocolate"})
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(scoopsSubtotal).toHaveTextContent("$6.00")
});

test('update topping subtotal changes when toppings are updated', async() => {
    render(<Options optionType="toppings" />);

    // Make sure the subtotal starts at $0.00
    const subtotal = screen.getByText('Toppings total: $', {exact: false});
    expect(subtotal).toHaveTextContent('$0.00');
    
    // Select one of the toppings and make sure the value updates correctly.

    const hotFudgeInput = await screen.findByRole('checkbox', { name: "Hot fudge"});
    userEvent.click(hotFudgeInput);
    expect(subtotal).toHaveTextContent('1.50');


    // Select another topping and make sure the value updates correctly.
    const mAndMsInput = await screen.findByRole('checkbox', { name: "M&Ms" });
    userEvent.click(mAndMsInput);
    expect(subtotal).toHaveTextContent('3.00');

    // Unselect the first topping and make sure the value updates correctly.
    userEvent.click(hotFudgeInput);
    expect(subtotal).toHaveTextContent('1.50');
});