import {
  UpdateUserRequest,
  User,
  UserInfoList,
} from '@/entities/mypage/model/user';
import { apiService } from '@/shared/service/ApiService';
import { queries } from '@/shared/service/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export function useUserData() {
  const { data: user, isLoading } = useQuery(queries.user.userInfo());

  return { user, isLoading };
}

export function useUserInfoList(user?: AxiosResponse<User, any>) {
  const [userInfoList, setUserInfoList] = useState<UserInfoList>([]);

  useEffect(() => {
    if (user) {
      const categoryMap: { [key: string]: string } = {
        email: 'E-mail.',
        companyName: 'company.',
      };
      const filterUserInfoList = Object.entries(user?.data)
        .map(([key, value]) =>
          categoryMap[key] ? { category: categoryMap[key], value } : null,
        )
        .filter(userInfo => userInfo !== null);
      setUserInfoList(
        filterUserInfoList.sort((a, b) => a.category.localeCompare(b.category)),
      );
    }
  }, [user]);

  return userInfoList;
}

export async function useUpdateUserInfo() {
  const mutation = useMutation({
    mutationFn: (updateUserRequest: UpdateUserRequest) => {
      return apiService.updateUser(updateUserRequest);
    },
    onSuccess: () => queries.user.userInfo(),
  });
  return mutation;
}
