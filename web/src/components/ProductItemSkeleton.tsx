import { Card, Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useStore } from "../store-context/store.hook";

export function ProductItemSkeleton({ cards }: { cards: number }) {
  const {
    state: { mode },
  } = useStore();

  return (
    <>
      <Row className="d-flex justify-content-center align-items-center">
        {Array(cards)
          .fill(0)
          .map((_, index) => (
            <Col key={index} sm="auto" md="auto" lg="auto">
              <Card style={{ marginBottom: "2rem", position: "relative" }}>
                <Skeleton
                  baseColor={mode === "light" ? "silver" : "#313131"}
                  highlightColor={mode === "light" ? "#eee" : "#525252"}
                  className="card-img-top"
                  style={{ width: "300px", height: "200px" }}
                />

                <Card.Body>
                  <Skeleton
                    count={3}
                    baseColor={mode === "light" ? "silver" : "#313131"}
                    highlightColor={mode === "light" ? "#eee" : "#525252"}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}
