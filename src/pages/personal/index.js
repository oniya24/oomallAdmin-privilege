import React from 'react';
import { connect } from 'umi';
import { Card, Tabs } from 'antd';
import BasicInfo from './basicInfo/index';
import Role from './selfRole/index';
import Pri from './selfPri/index';
import Proxy from './selfProxy/index';

const { TabPane } = Tabs;
const Personal = props => {
  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <Tabs defaultActiveKey="proxy">
        <TabPane tab="代理管理" key="proxy">
          <Proxy></Proxy>
        </TabPane>
        <TabPane tab="基本信息" key="basicInfo">
          <BasicInfo></BasicInfo>
        </TabPane>
        <TabPane tab="角色展示" key="role">
          <Role></Role>
        </TabPane>
        {/* <TabPane tab="权限展示" key="pri">
          <Pri></Pri>
        </TabPane> */}
      </Tabs>
    </Card>
  );
};

export default Personal;
