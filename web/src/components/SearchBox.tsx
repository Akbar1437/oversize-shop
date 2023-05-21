import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export function SearchBox() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  // ---------------------------------------------------------------------------
  // useEffects
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (location.pathname === "/") {
      setQuery("");
    }
  }, [location.pathname]);

  // ---------------------------------------------------------------------------
  // function
  // ---------------------------------------------------------------------------

  function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    navigate(query ? `/search?search=${query}` : "/search");
  }

  // ---------------------------------------------------------------------------
  return (
    <Form className="flex-grow-1 d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></FormControl>
        <Button variant="outline-warning" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
