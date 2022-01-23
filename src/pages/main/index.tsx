import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { getMenuList } from '@/apis/menu';
import type { MenuRequest, MenuReponse } from '@/apis/menu';
import { Layout, Menu, Breadcrumb, message } from 'antd';
import { updateMenu } from '@/store/actions/menu';
import type { MenuItemStructure } from '@/store/actions/menu';
import type { RequestConfig } from '@/utils/commonTypes';
import type { RequestError } from '@/utils/request';
import './index.scss';

const { Sider } = Layout;
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
      </Layout>
    </Layout>
  );
};

export default MainPage;
