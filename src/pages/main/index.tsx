import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { Layout, Menu, Breadcrumb } from 'antd';
import { updateMenu } from '@/store/actions/menu';
import type { MenuStructure } from '@/store/actions/menu';
import { Dispatch } from 'redux';
const { Sider } = Layout;
const { SubMenu } = Menu;

const MainPage: React.FC = (props) => {
  const menuList = useAppSelector((state) => state.menuList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        updateMenu([
          {
            title: 'test',
            children: [],
          },
        ])
      );
    }, 3000);
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
