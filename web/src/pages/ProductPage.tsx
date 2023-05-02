import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { convertProductToCartItem, getError } from "../utils/utils";
import { ApiErrorType } from "../types/ApiError";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { Store } from "../Store";
import { toast } from "react-toastify";

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate();

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((item) => item._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product!.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success("Product added to the cart");
    navigate("/cart");
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiErrorType)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product not found</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="large" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>

            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>

            <ListGroup.Item>
              Description : <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
