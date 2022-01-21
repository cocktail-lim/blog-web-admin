import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb } from 'antd';
import request from '@/utils/request';
import { updateMenu } from '@/store/actions/menu';
import type { MenuStructure } from '@/store/actions/menu';
import { Dispatch } from 'redux';
const { Sider } = Layout;
const { SubMenu } = Menu;

interface MenuProps {
  menuList: MenuStructure[];
  onUpdateMenu: any;
}

const mapStateToProps = (state: any) => {
  return {
    menuList: state.menuList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onUpdateMenu: (list: MenuStructure[]) => {
      dispatch(updateMenu(list));
    },
  };
};

const MainPage: React.FC<MenuProps> = (props: MenuProps) => {
  const { menuList = [], onUpdateMenu } = props;
  useEffect(() => {
    setTimeout(() => {
      onUpdateMenu([
        {
          title: 'test',
          hidden: false,
          children: [],
        },
      ]);
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
