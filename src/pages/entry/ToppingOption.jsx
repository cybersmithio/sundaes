import { Form, Col} from "react-bootstrap";

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        alt={`${name} topping`}
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          label={name}
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? 1 : 0);
          }}
        />
      </Form.Group>
    </Col>
  );
}
