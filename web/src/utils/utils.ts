import { ApiErrorType } from "../types/ApiError";

export const getError = (error: ApiErrorType) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
