import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function SearchBox() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // ---------------------------------------------------------------------------
  // function
  // ---------------------------------------------------------------------------

  function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    navigate(query ? `/search?query=${query}` : "/search");
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
          onChange={(e) => setQuery(e.target.value)}
        ></FormControl>
        <Button variant="outline-warning" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
