import { Link, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { getError } from "../utils/utils";
import { ApiErrorType } from "../types/ApiError";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAdminProdcutsQuery,
} from "../hooks/productHooks";

export function ProductListPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = Number(sp.get("page") || 1);

  const { data, isLoading, error, refetch } = useGetAdminProdcutsQuery(page);

  const { mutateAsync: createProduct, isLoading: loadingCreate } =
    useCreateProductMutation();

  const createHandler = async () => {
    if (window.confirm("Are you sure to create?")) {
      try {
        const data = await createProduct();
        refetch();
        toast.success("Product created successfully");
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(err as ApiErrorType));
      }
    }
  };
  const { mutateAsync: deleteProduct, isLoading: loadingDelete } =
    useDeleteProductMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        deleteProduct(id);
        refetch();
        toast.success("Product deleted successfully");
      } catch (err) {
        toast.error(getError(err as ApiErrorType));
      }
    }
  };

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
          <div>
            {[...Array(data!.pages).keys()].map((x) => (
              <Link
                className={
                  x + 1 === Number(data!.page) ? "btn text-bold" : "btn"
                }
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
