import { Spinner } from "react-bootstrap";

export function LoadingBox() {
  // ---------------------------------------------------------------------------
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
