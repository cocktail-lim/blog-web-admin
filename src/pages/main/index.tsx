import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { getMenuList } from '@/apis/menu';
import type { MenuRequest } from '@/apis/menu';
import { Layout, Menu, Breadcrumb, message } from 'antd';
import { updateMenu } from '@/store/actions/menu';
import type { MenuStructure } from '@/store/actions/menu';
import type { RequestConfig } from '@/utils/commonTypes';
import type { RequestError } from '@/utils/request';
const { Sider } = Layout;
const { SubMenu } = Menu;

const MainPage: React.FC = (props) => {
  const menuList: MenuStructure[] = useAppSelector((state) => state.menuList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getList(): Promise<void> {
      const config: RequestConfig<MenuRequest> = {
        api: '/api/admin/menus',
        method: 'get',
        data: {
          roleName: 'admin',
        },
      };
      try {
        const response: MenuStructure[] = await getMenuList(config);
        dispatch(updateMenu(response));
      } catch (e) {
        const err: RequestError = e as RequestError;
        message.error(err.message);
      }
    }
    getList();
  }, []);

  return (
    <Layout>
      <Layout>
        <Sider>
          <Menu>
            {menuList.map((listItem, index) => (
              <SubMenu key={`sub${index + 1}`} title={listItem.title}>
                {listItem.children.map((childItem, childIndex) => (
                  <Menu.Item key={`child${childIndex}`}>{childItem.title}</Menu.Item>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default MainPage;
