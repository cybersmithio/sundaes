import { Button } from "react-bootstrap";
import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";
import { useEffect, useState } from "react";

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  const orderButtonDisabled = orderDetails.totals.scoops === "$0.00";

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        onClick={() => setOrderPhase("review")}
        disabled={orderButtonDisabled}
      >
        Order Sundae!
      </Button>
    </div>
  );
}
