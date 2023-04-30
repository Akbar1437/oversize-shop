import axios from "axios";
import { Reducer, useEffect, useReducer } from "react";
import { Col, Row } from "react-bootstrap";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { ApiErrorType } from "../types/ApiError";
import { ProductType } from "../types/Product";
import { getError } from "../utils/utils";
import { Helmet } from "react-helmet-async";

type State = {
  products: ProductType[];
  loading: boolean;
  error: string;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: ProductType[] }
  | { type: "FETCH_FAIL"; payload: string };

const initialState: State = {
  products: [],
  loading: true,
  error: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      console.log("req", action);

      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      console.log("success", action);
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      console.log("fail", action);
      return { ...state, error: action.payload, loading: false };
    default:
      console.log("def", state);

      return state;
  }
};

export default function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer<
    Reducer<State, Action>
  >(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err as ApiErrorType),
        });
      }
    };
    fetchData();
  }, []);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>Oversize shop</title>
      </Helmet>
      {products.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
}
