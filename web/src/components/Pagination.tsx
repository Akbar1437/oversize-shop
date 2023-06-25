import { Pagination } from "react-bootstrap";
export function Paginate({
  total,
  current,
  onChange,
}: {
  total: number;
  current: number;
  onChange: (value: number) => void;
}) {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  let items = [];

  if (current > 1) {
    items.push(
      <Pagination.Prev key="prev" onClick={() => onChange(current - 1)} />
    );
  }

  for (let page = 1; page < total; page++) {
    items.push(
      <Pagination.Item
        key={page}
        data-page={page}
        active={page === current}
        onClick={() => onChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (current < total) {
    items.push(
      <Pagination.Next key="next" onClick={() => onChange(current + 1)} />
    );
  }

  // ---------------------------------------------------------------------------
  return <Pagination>{items}</Pagination>;
}
