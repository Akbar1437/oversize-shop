import { Card, Col, ListGroup, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

export function ProductPageSkeleton() {
  return (
    <div>
      <Row>
        <Col md={6}>
          <Skeleton className="large" style={{ height: "70vh" }} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Skeleton count={4} />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Skeleton count={2} />
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Skeleton count={2} />
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Skeleton />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
