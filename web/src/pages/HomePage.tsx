import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils/utils";
import { ApiErrorType } from "../types/ApiError";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { ProductItem } from "../components/ProductItem";

export function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  // ---------------------------------------------------------------------------
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiErrorType)}</MessageBox>
  ) : (
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
  );
}
