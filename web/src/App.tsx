import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCategoriesQuery } from "./hooks/productHooks";
import { ListGroup } from "react-bootstrap";
import { useStore } from "./store-context";
import { LoadingBox } from "./components/LoadingBox";
import { MessageBox } from "./components/MessageBox";
import { SearchBox } from "./components/SearchBox";
import { getError } from "./utils/utils";
import { ApiErrorType } from "./types/ApiError";

export function App() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const { state, dispatch } = useStore();
  const { mode, fullBox, cart, userInfo } = state;
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [sidebarIsOpen, setSidebarOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // effects
  // ---------------------------------------------------------------------------

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  // ---------------------------------------------------------------------------
  // function
  // ---------------------------------------------------------------------------

  function signOutHandler() {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  }

  // ---------------------------------------------------------------------------
  return (
    <div
      className={
        sidebarIsOpen
          ? fullBox
            ? "site-container active-cont d-flex flex-column full-box"
            : "site-container active-cont d-flex flex-column"
          : fullBox
          ? "site-container d-flex flex-column full-box"
          : "site-container d-flex flex-column"
      }
    >
      <ToastContainer position="top-left" closeOnClick={true} limit={1} />
      <header>
        <Navbar
          className="d-flex flex-column align-items-stretch p-2 pb-0 mb-3 "
          bg="dark"
          variant="dark"
          expand="lg"
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex justify-content-between align-items-center">
              <LinkContainer to="/" className="header-link">
                <Navbar.Brand>Oversize XXL</Navbar.Brand>
              </LinkContainer>
              <SearchBox />
            </div>
            <Navbar.Collapse>
              <Nav className="w-100 justify-content-end">
                <Link
                  to="#"
                  className="nav-link header-link"
                  onClick={() => dispatch({ type: "SWITCH_MODE" })}
                >
                  <i
                    className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}
                  ></i>{" "}
                  {mode === "light" ? "Light" : "Dark"}
                </Link>

                {userInfo ? (
                  <NavDropdown
                    className="header-link"
                    title={`${userInfo.name}`}
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signOutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <NavDropdown className="header-link" title={`sign in`}>
                    <LinkContainer to="/signin">
                      <NavDropdown.Item>Sign In</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown className="header-link" title="Admin">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                <Link to="/orderhistory" className="nav-link header-link">
                  Orders
                </Link>
                <Link to="/cart" className="nav-link header-link p-0">
                  {
                    <span className="cart-badge">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  }

                  <svg
                    fill="#ffffff"
                    viewBox="130 150 200 300"
                    width="40px"
                    height="40px"
                  >
                    <path d="M 110.164 188.346 C 104.807 188.346 100.437 192.834 100.437 198.337 C 100.437 203.84 104.807 208.328 110.164 208.328 L 131.746 208.328 L 157.28 313.233 C 159.445 322.131 167.197 328.219 176.126 328.219 L 297.409 328.219 C 306.186 328.219 313.633 322.248 315.951 313.545 L 341.181 218.319 L 320.815 218.319 L 297.409 308.237 L 176.126 308.237 L 150.592 203.332 C 148.426 194.434 140.675 188.346 131.746 188.346 L 110.164 188.346 Z M 285.25 328.219 C 269.254 328.219 256.069 341.762 256.069 358.192 C 256.069 374.623 269.254 388.165 285.25 388.165 C 301.247 388.165 314.431 374.623 314.431 358.192 C 314.431 341.762 301.247 328.219 285.25 328.219 Z M 197.707 328.219 C 181.711 328.219 168.526 341.762 168.526 358.192 C 168.526 374.623 181.711 388.165 197.707 388.165 C 213.704 388.165 226.888 374.623 226.888 358.192 C 226.888 341.762 213.704 328.219 197.707 328.219 Z M 197.707 348.201 C 203.179 348.201 207.434 352.572 207.434 358.192 C 207.434 363.812 203.179 368.183 197.707 368.183 C 192.236 368.183 187.98 363.812 187.98 358.192 C 187.98 352.572 192.236 348.201 197.707 348.201 Z M 285.25 348.201 C 290.722 348.201 294.977 352.572 294.977 358.192 C 294.977 363.812 290.722 368.183 285.25 368.183 C 279.779 368.183 275.523 363.812 275.523 358.192 C 275.523 352.572 279.779 348.201 285.25 348.201 Z" />
                  </svg>

                  <span>Cart</span>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <div
            style={{ background: "#252e3d" }}
            className="sub-header d-flex justify-content-start align-items-center mt-3 mb-3 p-1"
          >
            <div className="d-flex align-items-center">
              <Link
                to="#"
                className="nav-link header-link p-1 px-3"
                onClick={() => setSidebarOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Link>
              {["DEALS", "SALE", "PRESENT"].map((item) => (
                <Link
                  key={item}
                  className="nav-link header-link p-1 px-3"
                  to={`/search?tag=${item}`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </Navbar>
      </header>
      {sidebarIsOpen && (
        <div
          onClick={() => setSidebarOpen(!sidebarIsOpen)}
          className="side-navbar-backdrop"
        ></div>
      )}
      <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column"
        }
      >
        <ListGroup variant="flush">
          <ListGroup.Item action className="side-navbar-user">
            <div className="d-flex justify-content-between align-items-center">
              {" "}
              <LinkContainer
                to={userInfo ? `/profile` : `/signin`}
                onClick={() => setSidebarOpen(!sidebarIsOpen)}
              >
                <span>{userInfo ? userInfo.name : `sign in`}</span>
              </LinkContainer>
              <Button
                variant={mode}
                onClick={() => setSidebarOpen(!sidebarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
          </ListGroup.Item>

          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as ApiErrorType)}
            </MessageBox>
          ) : (
            categories!.map((category) => (
              <ListGroup.Item action key={category}>
                <LinkContainer
                  to={{ pathname: "/search", search: `category=${category}` }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>
      <main style={{ flexGrow: "1", marginBottom: "3rem" }}>
        <Container fluid>
          <Outlet />
        </Container>
      </main>
      <footer
        className="footer"
        style={{ background: "#252e3d", zIndex: 9999 }}
      >
        <div
          className="text-center"
          style={{ color: "silver", padding: "1rem" }}
        >
          Copyright @2023 | All rights reserved
        </div>
      </footer>
    </div>
  );
}
