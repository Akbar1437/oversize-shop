import { Card, Col, ListGroup, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useStore } from "../store-context/store.hook";

export function ProductPageSkeleton() {
  const {
    state: { mode },
  } = useStore();
  return (
    <div>
      <Row>
        <Col md={6}>
          <Skeleton
            className="large"
            style={{ height: "70vh" }}
            baseColor={mode === "light" ? "silver" : "#313131"}
            highlightColor={mode === "light" ? "#eee" : "#525252"}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Skeleton
                count={4}
                baseColor={mode === "light" ? "silver" : "#313131"}
                highlightColor={mode === "light" ? "#eee" : "#525252"}
              />
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
                      <Skeleton
                        count={2}
                        baseColor={mode === "light" ? "silver" : "#313131"}
                        highlightColor={mode === "light" ? "#eee" : "#525252"}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Skeleton
                        count={2}
                        baseColor={mode === "light" ? "silver" : "#313131"}
                        highlightColor={mode === "light" ? "#eee" : "#525252"}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Skeleton
                    baseColor={mode === "light" ? "silver" : "#313131"}
                    highlightColor={mode === "light" ? "#eee" : "#525252"}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
