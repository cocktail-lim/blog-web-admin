import React, { useEffect, ReactElement } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { getMenuList } from '@/apis/menu';
import type { MenuRequest, MenuReponse } from '@/apis/menu';
import { Layout, Menu, Breadcrumb, message } from 'antd';
import { updateMenu } from '@/store/actions/menu';
import type { MenuItemStructure } from '@/store/actions/menu';
import type { RequestConfig } from '@/utils/commonTypes';
import type { RequestError } from '@/utils/request';
import breadCrumbNameMap from '@/router/breadCrumbMap';
import { suspensFunc } from '@/router/main';

import './index.scss';

const { Sider, Header, Content } = Layout;
const { SubMenu } = Menu;

const MainPage: React.FC = (props) => {
  const menuList: MenuItemStructure[] = useAppSelector((state) => state.menuList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getList(): Promise<void> {
      const config: RequestConfig<MenuRequest> = {
        api: '/api/admin/menus',
        method: 'get',
        params: {
          roleName: 'admin',
        },
      };
      try {
        const response: MenuReponse = await getMenuList(config);
        dispatch(updateMenu(response.menuList));
      } catch (e) {
        const err: RequestError = e as RequestError;
        message.error(err.message);
      }
    }
    getList();
  }, []);

  const pathSnippets: string[] = location.pathname.split('/').filter((i) => i);
  const extraBreadcumbItems: ReactElement[] = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadCrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems: ReactElement[] = [
    <Breadcrumb.Item key='home'>
      <Link to='/'>首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcumbItems);

  return (
    <Layout className='main-content'>
      <Layout>
        <Sider>
          <Menu mode='inline' theme='dark'>
            {menuList.map((listItem) =>
              listItem.children.length > 0 ? (
                <SubMenu key={`sub${listItem.menuId}`} title={listItem.menuName}>
                  {listItem.children?.map((childItem) => (
                    <Menu.Item key={`child${childItem.menuId}`}>{childItem.menuName}</Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={`sub${listItem.menuId}`}>{listItem.menuName}</Menu.Item>
              )
            )}
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainPage;
