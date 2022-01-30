import React, { useEffect, useState, ReactDOM, ReactElement } from 'react';
import { message, Table, Tag, Button } from 'antd';
import { userListRequest } from '@/apis/user';
import type { UserItem } from '@/apis/user';
import type { UserListParam, UserListResponse } from '@/apis/user';
import type { RequestConfig } from '@/utils/commonTypes';
import type { RequestError } from '@/utils/request';
import type { ColumnsType } from 'antd/lib/table';

import './index.scss';

interface RoleTagMap {
  [propname: string]: ReactElement;
}

const roleNameMap: RoleTagMap = {
  admin: <Tag color='red'>管理员</Tag>,
  test: <Tag color='cyan'>管理员</Tag>,
  user: <Tag color='blue'>管理员</Tag>,
};

const columns: ColumnsType<UserItem> = [
  {
    title: '头像',
    key: 'avatar',
    dataIndex: 'avatar',
    align: 'center',
    render: (text) => <img className='avatar-img' src={text} />,
  },
  {
    title: '昵称',
    key: 'nickname',
    dataIndex: 'nickname',
    align: 'center',
  },
  {
    title: '用户角色',
    key: 'roleName',
    dataIndex: 'roleName',
    align: 'center',
    render: (text: string) => roleNameMap[text],
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    key: 'operation',
    render: () => <Button type='primary'>编辑</Button>,
    align: 'center',
  },
];

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
        const response: UserListResponse = await userListRequest(config);
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
  return (
    <div className='user-list-content'>
      <Table columns={columns} dataSource={userList} />
    </div>
  );
};

export default UserList;
