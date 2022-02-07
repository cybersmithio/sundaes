import { Form, Col} from "react-bootstrap";

export default function ToppingOption({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        alt={`${name} topping`}
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group>
        <Form.Label>{name}</Form.Label>
        <Form.Check/>
      </Form.Group>
    </Col>
  );
}
