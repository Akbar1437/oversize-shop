import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductMutation,
} from "../hooks/productHooks";
import { ApiErrorType } from "../types/ApiError";
import { ProductInputType } from "../types/Product";
import { getError } from "../utils/utils";

export function ProductEditPage() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId!);

  console.log("product", product);

  const { mutateAsync: updateProduct, isLoading: loadingUpdate } =
    useUpdateProductMutation();

  const { mutateAsync: uploadProduct, isLoading: loadingUpload } =
    useUploadProductMutation();

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
  // effects
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (product) {
      setProductInput(product);
    }
  }, [product]);

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      await updateProduct({
        ...productInput,
        _id: product!._id,
      });
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(getError(err as ApiErrorType));
    }
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
    <Container className="small-container">
      <Helmet>
        <title>Edit Product {productId}</title>
      </Helmet>
      <h1>Edit Product {productId}</h1>

      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error as ApiErrorType)}
        </MessageBox>
      ) : (
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
                setProductInput((prev) => ({ ...prev, image: e.target.value }))
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
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
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
          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  );
}
