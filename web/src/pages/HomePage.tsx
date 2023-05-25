import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { ControlledCarousel } from "../components/Carousel";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { ProductItem } from "../components/ProductItem";
import { useGetProductsQuery } from "../hooks/productHooks";
import { ApiErrorType } from "../types/ApiError";
import { getError } from "../utils/utils";

export function HomePage() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const { data: products, isLoading, error } = useGetProductsQuery();

  // ---------------------------------------------------------------------------
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiErrorType)}</MessageBox>
  ) : (
    <div>
      <ControlledCarousel products={products!} />

      <Row className="d-flex justify-content-center align-items-center">
        <Helmet>
          <title>Oversize shop</title>
        </Helmet>
        {products!.map((product) => (
          <Col key={product.slug} sm="auto" md="auto" lg="auto">
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
