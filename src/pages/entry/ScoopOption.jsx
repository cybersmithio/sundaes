import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [validValue, setValidValue] = useState(true);

  const handleChange = (event) => {
    const currentValue = parseFloat(event.target.value);
    const valueIsValid =
      currentValue >= 0 &&
      currentValue <= 10 &&
      Math.floor(currentValue) === currentValue;

    setValidValue(valueIsValid);

    if (valueIsValid) {
      updateItemCount(name, event.target.value);
    } else {
      updateItemCount(name, 0);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!validValue}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
