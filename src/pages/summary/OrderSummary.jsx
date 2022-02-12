import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Array.from(orderDetails.toppings.keys());
  const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {orderDetails.totals.toppings === "$0.00" ? (
        <div />
      ) : (
        <div>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul>{toppingList}</ul>
        </div>
      )}
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
