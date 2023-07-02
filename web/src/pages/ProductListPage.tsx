import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { Paginate } from "../components/Pagination";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../hooks/productHooks";
import { ApiErrorType } from "../types/ApiError";
import { getError } from "../utils/utils";

export function ProductListPage() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useGetProductsQuery(page);

  const { mutateAsync: createProduct, isLoading: loadingCreate } =
    useCreateProductMutation();

  const { mutateAsync: deleteProduct, isLoading: loadingDelete } =
    useDeleteProductMutation();

  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  async function createHandler() {
    if (window.confirm("Are you sure to create?")) {
      try {
        const data = await createProduct();
        await refetch();
        toast.success("Product created successfully");
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(err as ApiErrorType));
      }
    }
  }

  async function deleteHandler(id: string) {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await deleteProduct(id);
        await refetch();
        toast.success("Product deleted successfully");
      } catch (err) {
        toast.error(getError(err as ApiErrorType));
      }
    }
  }

  // ---------------------------------------------------------------------------
  return (
    <div>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              Create Product
            </Button>
          </div>
        </Col>
      </Row>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error as ApiErrorType)}
        </MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data!.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deleteHandler(product._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {data && data.pagination.totalCount > 1 && (
              <Paginate
                total={data.pagination.pageCount}
                current={page}
                onChange={(value) => setPage(value)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
