import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { ProductType } from "../types/Product";

export function ControlledCarousel({ products }: { products: ProductType[] }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };
  // ---------------------------------------------------------------------------
  return (
    <Carousel
      style={{ width: "80%" }}
      activeIndex={index}
      onSelect={handleSelect}
    >
      {products.map((product) => (
        <Carousel.Item
          key={product._id}
          style={{ height: "100%", marginBottom: "3rem" }}
        >
          <img
            className="d-block w-100"
            src={product.image}
            alt={product.name}
            width={"500"}
            height={"500"}
            style={{ objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
