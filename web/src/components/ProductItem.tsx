import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartItemType } from "../types/Cart";
import { ProductType } from "../types/Product";
import { convertProductToCartItem } from "../utils/utils";
import { useStore } from "../store-context";
import { Rating } from "./Rating";

export function ProductItem({ product }: { product: ProductType }) {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const { state, dispatch } = useStore();
  const {
    cart: { cartItems },
  } = state;

  // ---------------------------------------------------------------------------
  // function
  // ---------------------------------------------------------------------------

  function addToCartHandler(item: CartItemType) {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });

    toast.success("Product added to the cart");
  }

  // ---------------------------------------------------------------------------
  return (
    <Card style={{ marginBottom: "2rem", position: "relative" }}>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          width={400}
          height={300}
        />
        {product.isSale && (
          <div className="badge-overlay">
            <span className="top-right badge-sale red">Sale</span>
          </div>
        )}
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product.slug}`}
          style={{ textDecoration: "none" }}
        >
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
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
