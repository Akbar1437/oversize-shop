import { Card, Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

export function ProductItemSkeleton({ cards }: { cards: number }) {
  return (
    <>
      <Row className="d-flex justify-content-center align-items-center">
        {Array(cards)
          .fill(0)
          .map((_, index) => (
            <Col key={index} sm="auto" md="auto" lg="auto">
              <Card style={{ marginBottom: "2rem", position: "relative" }}>
                <Skeleton
                  className="card-img-top"
                  style={{ width: "300px", height: "200px" }}
                />

                <Card.Body>
                  <Skeleton count={3} />
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}
