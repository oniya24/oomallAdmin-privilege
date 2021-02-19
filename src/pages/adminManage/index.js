import { Card, Tabs } from 'antd';
import Admin from './admin';
import NewAdmin from './newAdmin';
const { TabPane } = Tabs;
const adminManage = () => {
  return (
    <Card style={{ height: '100%', width: '100%' }}>
      <Tabs>
        <TabPane key="admin" tab="已有用户">
          <Admin></Admin>
        </TabPane>
        <TabPane key="newAdmin" tab="新用户">
          <NewAdmin></NewAdmin>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default adminManage;
