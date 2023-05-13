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
  const { data: products, isLoading, error } = useGetProductsQuery();

  // ---------------------------------------------------------------------------
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiErrorType)}</MessageBox>
  ) : (
    <div>
      <ControlledCarousel products={products!} />

      <Row>
        <Helmet>
          <title>Oversize shop</title>
        </Helmet>
        {products!.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
