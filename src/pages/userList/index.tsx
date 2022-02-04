import React, { useEffect, useState, ReactElement } from 'react';
import { message, Table, Tag, Button, Pagination } from 'antd';
import { userListRequest } from '@/apis/user';
import dayjs from 'dayjs';
import PageHeader from '@/components/pageHeader';
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
    render: (text): ReactElement => <img className='avatar-img' src={text} />,
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
    render: (text: string): ReactElement => roleNameMap[text],
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    align: 'center',
    render: (text: string): string => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
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
    render: (): ReactElement => <Button type='primary'>编辑</Button>,
    align: 'center',
  },
];

const UserList: React.FC = (props) => {
  const [userList, setUserList] = useState<UserItem[]>([]);
  const [size, setSize] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [cur, setCur] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);

  async function getUserList(): Promise<void> {
    const config: RequestConfig<UserListParam> = {
      api: '/api/admin/user/getUserList',
      method: 'get',
      params: {
        current: cur,
        size,
      },
    };
    try {
      setLoading(true);
      const response: UserListResponse = await userListRequest(config);
      const { total: newTotal, userList } = response;
      setTotal(newTotal);
      setUserList(userList);
    } catch (e) {
      const err: RequestError = e as RequestError;
      message.error(err.message);
    }
    setLoading(false);
  }
  useEffect(() => {
    getUserList();
  }, [size, cur]);
  const changePage = (page: number, pageSize: number) => {
    setSize(pageSize);
    setCur(page);
  };
  return (
    <div className='user-list-content'>
      <PageHeader title='User List' />
      <Table<UserItem>
        columns={columns}
        dataSource={userList}
        pagination={false}
        rowKey={'userId'}
        loading={isLoading}
      />
      <Pagination
        className='table-pagination'
        showSizeChanger
        pageSizeOptions={['5', '10', '50']}
        defaultCurrent={1}
        defaultPageSize={5}
        current={cur}
        total={total}
        onChange={changePage}
      />
    </div>
  );
};

export default UserList;
