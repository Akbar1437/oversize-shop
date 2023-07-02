import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { MessageBox } from "../components/MessageBox";
import { ProductItem } from "../components/ProductItem";
import { ProductItemSkeleton } from "../components/ProductItemSkeleton";
import { useSearchProductQuery } from "../hooks/productHooks";
import { ApiErrorType } from "../types/ApiError";
import { getError } from "../utils/utils";

export function SearchProductPage() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const { search } = useLocation();
  const query = search.split("=").slice(-1)[0];

  const { data: products, isLoading, error } = useSearchProductQuery(query);

  // ---------------------------------------------------------------------------
  return isLoading ? (
    <ProductItemSkeleton cards={8} />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiErrorType)}</MessageBox>
  ) : (
    <div>
      <Row>
        <Helmet>
          <title>Oversize shop</title>
        </Helmet>
        {products && products.length ? (
          <>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3}>
                <ProductItem product={product} />
              </Col>
            ))}
          </>
        ) : (
          <div className="mb-3 d-flex align-items-center">
            <h4 style={{ marginRight: "1rem" }}> No search result</h4>{" "}
            <Link to={`/`}>Go back</Link>
          </div>
        )}
      </Row>
    </div>
  );
}
