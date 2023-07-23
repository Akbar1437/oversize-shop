import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { Modalize } from "../components/Modal";
import { Paginate } from "../components/Pagination";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUploadProductMutation,
} from "../hooks/productHooks";
import { ApiErrorType } from "../types/ApiError";
import { ProductInputType } from "../types/Product";
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

  const { mutateAsync: uploadProduct, isLoading: loadingUpload } =
    useUploadProductMutation();

  const [modalShow, setModalShow] = useState(false);
  const defaultInput: ProductInputType = {
    name: "",
    slug: "",
    price: 0,
    image: "",
    category: "",
    countInStock: 0,
    brand: "",
    description: "",
  };

  const [productInput, setProductInput] = useState(defaultInput);
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

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

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const data = await createProduct({ ...productInput });
      await refetch();
      toast.success("Product created successfully");
      navigate(`/admin/product/${data.product._id.toString()}`);
    } catch (err) {
      toast.error(getError(err as ApiErrorType));
    }
    setModalShow(false);
    setProductInput(defaultInput);
  }

  async function uploadFileHandler(event: React.FormEvent<HTMLInputElement>) {
    const file = event.currentTarget.files![0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);

    try {
      const data = await uploadProduct(bodyFormData);

      setProductInput((prev) => ({
        ...prev,
        image: data.secure_url,
      }));

      toast.success("Image uploaded successfully. click Update to apply it");
    } catch (err) {
      toast.error(getError(err as ApiErrorType));
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
            <Button type="button" onClick={() => setModalShow(true)}>
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
                <tr key={product._id.toString()}>
                  <td>{product._id.toString()}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        navigate(`/admin/product/${product._id.toString()}`)
                      }
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deleteHandler(product._id.toString())}
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

      <Modalize show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={productInput.name}
                onChange={(e) =>
                  setProductInput((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={productInput.description}
                onChange={(e) =>
                  setProductInput((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="slug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                value={productInput.slug}
                onChange={(e) =>
                  setProductInput((prev) => ({ ...prev, slug: e.target.value }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={productInput.price}
                onChange={(e) =>
                  setProductInput((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image File</Form.Label>
              <Form.Control
                value={productInput.image}
                onChange={(e) =>
                  setProductInput((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imageFile">
              <Form.Label>Upload Image</Form.Label>
              <input type="file" onChange={uploadFileHandler}></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={productInput.category}
                onChange={(e) =>
                  setProductInput((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={productInput.brand}
                onChange={(e) =>
                  setProductInput((prev) => ({
                    ...prev,
                    brand: e.target.value,
                  }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                value={productInput.countInStock}
                onChange={(e) =>
                  setProductInput((prev) => ({
                    ...prev,
                    countInStock: Number(e.target.value),
                  }))
                }
                required
              />
            </Form.Group>

            <div className="mb-3 d-flex w-100 justify-content-end align-items-center">
              <Button
                style={{ marginRight: "1rem" }}
                variant="secondary"
                onClick={() => setModalShow(false)}
              >
                Close
              </Button>

              <Button disabled={loadingCreate} variant="primary" type="submit">
                Create
              </Button>
              {loadingCreate && <LoadingBox />}
            </div>
          </Form>
        </Modal.Body>
      </Modalize>
    </div>
  );
}
