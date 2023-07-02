import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { ControlledCarousel } from "../components/Carousel";
import { MessageBox } from "../components/MessageBox";
import { Paginate } from "../components/Pagination";
import { ProductItem } from "../components/ProductItem";
import { ProductItemSkeleton } from "../components/ProductItemSkeleton";
import { useGetProductsQuery } from "../hooks/productHooks";
import { ApiErrorType } from "../types/ApiError";
import { getError } from "../utils/utils";

export function HomePage() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const [page, setPage] = useState(1);
  const { data: response, isLoading, error } = useGetProductsQuery(page);

  // ---------------------------------------------------------------------------
  return isLoading ? (
    <ProductItemSkeleton cards={8} />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiErrorType)}</MessageBox>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {page === 1 && (
        <ControlledCarousel products={(response && response.products) || []} />
      )}

      <Row className="d-flex justify-content-center align-items-center">
        <Helmet>
          <title>Oversize shop</title>
        </Helmet>
        {response &&
          response.products.length > 0 &&
          response.products.map((product) => (
            <Col key={product.slug} sm="auto" md="auto" lg="auto">
              <ProductItem product={product} />
            </Col>
          ))}
      </Row>
      {response && response.pagination.totalCount > 1 && (
        <Paginate
          total={response.pagination.pageCount}
          current={page}
          onChange={(value) => setPage(value)}
        />
      )}
    </div>
  );
}
