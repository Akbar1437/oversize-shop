import React from "react";
import { ProductType } from "../types/Product";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function ProductItem({ product }: { product: ProductType }) {
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>

        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            {" "}
            out of stock
          </Button>
        ) : (
          <Button>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
