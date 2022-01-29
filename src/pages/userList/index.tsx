import React, { useEffect, useState, ReactDOM } from 'react';
import { message, Table } from 'antd';
import { userListRequest } from '@/apis/user';
import type { UserItem } from '@/apis/user';
import type { UserListParam, UserListResponse } from '@/apis/user';
import type { RequestConfig } from '@/utils/commonTypes';
import type { RequestError } from '@/utils/request';

const UserList: React.FC = (props) => {
  const [userList, setUserList] = useState<UserItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [cur, setCur] = useState<number>(1);
  useEffect(() => {
    async function getUserList(): Promise<void> {
      const config: RequestConfig<UserListParam> = {
        api: 'api/admin/userList/getUserList',
        method: 'get',
        params: {
          current: cur,
        },
      };
      try {
        const response = await userListRequest(config);
        const { total, userList } = response;
        setTotal(total);
        setUserList(userList);
      } catch (e) {
        const err: RequestError = e as RequestError;
        message.error(err.message);
      }
    }
    getUserList();
  }, []);
  return <div className='user-list'>This is User List page</div>;
};

export default UserList;
