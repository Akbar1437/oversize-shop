import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { getError } from "../utils/utils";
import { ApiErrorType } from "../types/ApiError";
import { useDeleteOrderMutation, useGetOrdersQuery } from "../hooks/orderHooks";
import { useState } from "react";
import { Paginate } from "../components/Pagination";

export function OrderListPage() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetOrdersQuery(page);

  const { mutateAsync: deleteOrder, isLoading: loadingDelete } =
    useDeleteOrderMutation();

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------

  async function deleteHandler(id: string) {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await deleteOrder(id);
        await refetch();
        toast.success("Order deleted successfully");
      } catch (err) {
        toast.error(getError(err as ApiErrorType));
      }
    }
  }

  // ---------------------------------------------------------------------------
  return (
    <div>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <h1>Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error as ApiErrorType)}
        </MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data!.orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user ? order.user.name : "DELETED USER"}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>

                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deleteHandler(order._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {data && data.pagination.totalCount > 1 && (
              <Paginate
                total={data.pagination.pageCount}
                current={page}
                onChange={(value) => setPage(value)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
