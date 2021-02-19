import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'umi';
import { Card, Divider, Descriptions, Table, Space, Button, Modal } from 'antd';
import pagination from '@/utils/pagination';
import {
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/personal/SelfRole';

const Role = ({ rolePriList, selfRoles, getSelfRoles, getPriFromRole }) => {
  const [priModalVisible, setPriModalVisible] = useState(false);
  const openPriDrawer = async ({ role }) => {
    await getPriFromRole(role.id);
    setPriModalVisible(true);
  };
  const columns = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: ['user', 'userName'],
        key: 'userName',
      },
      {
        title: '角色',
        dataIndex: ['role', 'name'],
        key: 'desc',
      },
      {
        title: '被谁创建',
        dataIndex: ['creator', 'userName'],
        key: 'createdBy',
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => {
          return (
            <Space>
              <Button type="primary" onClick={() => openPriDrawer(record)}>
                查看角色权限
              </Button>
            </Space>
          );
        },
      },
    ];
  }, []);
  useEffect(() => {
    getSelfRoles();
  }, []);
  return (
    <Card>
      <Table
        scroll={{ x: true }}
        rowKey={record => record.dataIndex}
        columns={columns}
        dataSource={selfRoles}
      ></Table>
      <Modal
        visible={priModalVisible}
        destroyOnClose
        footer={[]}
        onCancel={() => setPriModalVisible(false)}
      >
        {rolePriList.map((item, index) => {
          return (
            <div key={'role' + index}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <span>id: {item.id}</span>
                <span>creator: {item.creator.username}</span>
                <span>privilege: {item.privilege.name}</span>
                {/* <Button size="small" type="danger" 
                    onClick={() => deleteRole(item.role.id)}>删除当前权利</Button> */}
              </div>
              <Divider></Divider>
            </div>
          );
        })}
      </Modal>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Role);
