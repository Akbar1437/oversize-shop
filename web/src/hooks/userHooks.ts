import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../http/apiClient";
import { UserInfoType } from "../types/UserInfo";
import { UserType } from "../types/User";

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfoType>(`api/signin`, {
          email,
          password,
        })
      ).data,
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfoType>(`api/signup`, {
          name,
          email,
          password,
        })
      ).data,
  });

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) =>
      (
        await apiClient.put<UserInfoType>(`api/profile`, {
          name,
          email,
          password,
        })
      ).data,
  });

export const useGetUsersQuery = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => (await apiClient.get<[UserType]>(`api/users`)).data,
  });

export const useDeleteUserMutation = () =>
  useMutation({
    mutationFn: async (userId: string) =>
      (await apiClient.delete<{ message: string }>(`api/delete-user/${userId}`))
        .data,
  });

export const useUpdateUserMutation = () =>
  useMutation({
    mutationFn: async (user: {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    }) =>
      (
        await apiClient.put<{ user: UserType; message: string }>(
          `api/update-user/${user._id}`,
          user
        )
      ).data,
  });

export const useGetUserDetailsQuery = (userId: string) =>
  useQuery({
    queryKey: ["users", userId],
    queryFn: async () =>
      (await apiClient.get<UserType>(`api/details-user/${userId}`)).data,
  });
