import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UserInfoType } from "../types/UserInfo";

export const useSignMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfoType>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  });
