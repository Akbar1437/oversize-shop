import { sampleProducts } from "./data";

function App() {
  return (
    <div>
      <header>TS Oversize</header>
      <main>
        <ul>
          {sampleProducts.map((product, index) => (
            <li key={index}>
              <img
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
              />
              <h2>{product.name}</h2>
              <p>{product.price}$</p>
            </li>
          ))}
        </ul>
      </main>
      <footer>All right reserved</footer>
    </div>
  );
}

export default App;
