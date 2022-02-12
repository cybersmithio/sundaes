import { Button } from "react-bootstrap";
import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";
import { useEffect, useState } from "react";

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  const [disableButton, setDisableButton] = useState(1);

  useEffect(() => {
    if (orderDetails.totals.scoops === "$0.00") {
      setDisableButton(1);
    } else {
      setDisableButton(0);
    }
  }, [orderDetails.totals.scoops]);

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase("review")} disabled={disableButton}>
        Order Sundae!
      </Button>
    </div>
  );
}
